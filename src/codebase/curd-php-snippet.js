import { validateTableSetting } from "./fields";
var plugin_name = "";
var textDomain = "";
var functionPrefix = "";
var singularName = "";
var pluralName = "";

/**
 * make crud data from tables
 * @param {*} tablesData
 */
const makeCrudFromTables = (tablesData) => {
  let code = ``;
  tablesData
    .filter((item) => {
      return item.name && item.fields.length > 0;
    })
    .map((item) => {
      if (typeof item.settings !== "undefined" && item.settings.adminPanel) {
        let settings = validateTableSetting(item.settings);

        singularName = settings.singularName;
        pluralName = settings.pluralName;
      }

      code += crudSnippets(item.name, item.fields);
    });

  return code;
};

/**
 * crud snippets generator
 * blank spacing are for indenting
 * @param {*} tableName
 * @param {*} tableFields
 */
const crudSnippets = (tableName, tableFields) => {
  let defaults = ``;
  let defaultValidation = ``;

  tableFields
    .filter((item) => {
      return item.name && item.type && !item.primary_key;
    })
    .map((item) => {
      defaults += `'${item.name}' => '',\n        `;

      switch (item.type) {
        case "INT":
          defaultValidation += `'%d',\n                `;
          break;
        case "FLOAT":
          defaultValidation += `'%f',\n                `;
          break;
        case "DOUBLE":
          defaultValidation += `'%g',\n                `;
          break;
        default:
          defaultValidation += `'%s',\n                `;
          break;
      }
    });

  let code = ``;
  code += insertOrUpdateCode(tableName, defaults, defaultValidation);
  code += fetchData(tableName);
  code += countData(tableName);
  code += singleData(tableName);
  code += deleteData(tableName);
  code += purgeCacheData(tableName);

  return code;
};

/**
 * insert code snippet for wp
 * @param {*} tableName
 * @param {*} defaults
 * @param {*} defaultValidation
 */
const insertOrUpdateCode = (tableName, defaults, defaultValidation) => {
  let code = `/**
 * Insert a new ${singularName}
 *
 * @param  array  $args
 *
 * @return int|WP_Error
 */
function ${functionPrefix}_insert_${singularName}( $args = [] ) {
    global $wpdb;

    $defaults = [
        ${defaults.trim()}
    ];

    $data = wp_parse_args( $args, $defaults );

    if ( isset( $data['id'] ) ) {

        $id = $data['id'];
        unset( $data['id'] );

        $updated = $wpdb->update(
            $wpdb->prefix . '${tableName}',
            $data,
            [ 'id' => $id ],
            [
                ${defaultValidation.trim()}
            ],
            [ '%d' ]
        );

        ${functionPrefix}_${singularName}_purge_cache( $id );

        return $updated;

    } else {

        $inserted = $wpdb->insert(
            $wpdb->prefix . '${tableName}',
            $data,
            [
                ${defaultValidation.trim()}
            ]
        );

        if ( ! $inserted ) {
            return new \\WP_Error( 'failed-to-insert', __( 'Failed to insert data', '${textDomain}' ) );
        }

        ${functionPrefix}_${singularName}_purge_cache();

        return $wpdb->insert_id;
    }
}

`;

  return code;
};

/**
 * fetch code snippet for wp
 * @param {*} tableName
 */
const fetchData = (tableName) => {
  let code = `/**
 * Fetch ${pluralName}
 *
 * @param  array  $args
 *
 * @return array
 */
function ${functionPrefix}_get_${pluralName}( $args = [] ) {
    global $wpdb;

    $defaults = [
        'number'  => 20,
        'offset'  => 0,
        'orderby' => 'id',
        'order'   => 'ASC'
    ];

    $args = wp_parse_args( $args, $defaults );

    $last_changed = wp_cache_get_last_changed( '${singularName}' );
    $key          = md5( serialize( array_diff_assoc( $args, $defaults ) ) );
    $cache_key    = "all:$key:$last_changed";

    $sql = $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}${tableName}
            ORDER BY {$args['orderby']} {$args['order']}
            LIMIT %d, %d",
            $args['offset'], $args['number']
    );

    $items = wp_cache_get( $cache_key, '${tableName}' );

    if ( false === $items ) {
        $items = $wpdb->get_results( $sql );

        wp_cache_set( $cache_key, $items, '${tableName}' );
    }

    return $items;
}

`;

  return code;
};

/**
 * count sinnpet for wp
 * @param {*} tableName
 */
const countData = (tableName) => {
  let code = `/**
 * Get the count of total ${pluralName}
 *
 * @return int
 */
function ${functionPrefix}_${singularName}_count() {
    global $wpdb;

    $count = wp_cache_get( 'count', '${tableName}' );

    if ( false === $count ) {
        $count = (int) $wpdb->get_var( "SELECT count(id) FROM {$wpdb->prefix}${tableName}" );

        wp_cache_set( 'count', $count, '${tableName}' );
    }

    return $count;
}

`;

  return code;
};

/**
 * fetch single data snippet
 * @param {*} tableName
 */
const singleData = (tableName) => {
  let code = `/**
 * Fetch a single ${singularName} from the DB
 *
 * @param  int $id
 *
 * @return object
 */
function ${functionPrefix}_get_${singularName}( $id ) {
    global $wpdb;

    $item = wp_cache_get( '${singularName}-item-' . $id, '${tableName}' );

    if ( false === $item ) {
        $item = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}${tableName} WHERE id = %d", $id )
        );

        wp_cache_set( '${singularName}-item-' . $id, $item, '${tableName}' );
    }

    return $item;
}

`;

  return code;
};

/**
 * delete item sinppet
 * @param {*} tableName
 */
const deleteData = (tableName) => {
  let code = `/**
 * Delete an ${singularName}
 *
 * @param  int $id
 *
 * @return int|boolean
 */
function ${functionPrefix}_delete_${singularName}( $id ) {
    global $wpdb;

    ${functionPrefix}_${singularName}_purge_cache( $id );

    return $wpdb->delete(
        $wpdb->prefix . '${tableName}',
        [ 'id' => $id ],
        [ '%d' ]
    );
}

`;

  return code;
};

/**
 * purge cache sinppet
 * @param {*} tableName
 */
const purgeCacheData = (tableName) => {
  let code = `/**
 * Purge the cache for ${tableName} items
 *
 * @param  int $item_id
 *
 * @return void
 */
function ${functionPrefix}_${singularName}_purge_cache( $item_id = null ) {
    $group = '${tableName}';

    if ( $item_id ) {
        wp_cache_delete( '${singularName}-item-' . $item_id, $group );
    }

    wp_cache_delete( 'count', $group );
    wp_cache_set( 'last_changed', microtime(), $group );
}

`;

  return code;
};

/**
 * wp crud functions
 * @param {*} data
 * @param {*} tables
 */
export const wpCrudFunctions = (data, tables) => {
  plugin_name = data.pluginName.replace(/-/g, "_");
  textDomain = data.textDomain;
  functionPrefix = data.functionPrefix;

  let code = `<?php\n`;
  let cruds;

  if ((cruds = makeCrudFromTables(tables))) {
    code += cruds;
  }
  return code;
};
