import { validateTableSetting } from "./fields";
var plugin_name = '';
var textDomain = '';
var functionPrefix = '';
var singularName = '';
var pluralName = '';
var version = '';

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
  let defaultFormat = ``;
  let validation = ``;

  tableFields
    .filter((item) => {
      return item.name && item.type && !item.primary_key;
    })
    .map((item) => {
      defaults += `'${item.name}' => '',\n        `;

      if (item.showInCrudForm && item.formInputRequired) {
        validation += `if ( empty( $args['${item.name}'] ) ) {
        return new \\WP_Error( 'no-${item.name}', __( 'You must provide a ${item.name}.', '${textDomain}' ) );
    }
    
    `;
      }

      switch (item.type) {
        case "INT":
          defaultFormat += `'%d',\n                `;
          break;
        case "FLOAT":
          defaultFormat += `'%f',\n                `;
          break;
        case "DOUBLE":
          defaultFormat += `'%g',\n                `;
          break;
        default:
          defaultFormat += `'%s',\n                `;
          break;
      }
    });

  let code = ``;
  code += insertOrUpdateCode(
    tableName,
    defaults,
    defaultFormat,
    validation.trim()
  );
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
const insertOrUpdateCode = (tableName, defaults, defaultFormat, validation) => {
  let code = `/**
 * Insert a new ${singularName}
 *
 * @param  array  $args
 * 
 * @since ${version}
 *
 * @return int|WP_Error
 */
function ${functionPrefix}_insert_${singularName}( $args = [] ) {
    global $wpdb;

    ${validation}
    
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
                ${defaultFormat.trim()}
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
                ${defaultFormat.trim()}
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
 * @since ${version}
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
 * @since ${version}
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
 * @since ${version}
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
 * @since ${version}
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
 * @since ${version}
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
  version = data.version;

  let code = `<?php
/**
 * All our plugins custom functions.
 * 
 * @since ${data.version}
 */  

/**
 * Get template part implementation.
 *
 * Looks at the theme directory first.
 *
 * @param string $slug Slug of template.
 * @param string $name Name of template.
 * @param array  $args Arguments to passed.
 *
 * @since ${data.version}
 *
 * @return void
 */
function ${functionPrefix}_get_template_part( $slug, $name = '', $args = [] ) {
  $defaults = [ 'pro' => false ];

  $args = wp_parse_args( $args, $defaults );

  if ( $args && is_array( $args ) ) {
    extract( $args ); //phpcs:ignore
  }

  $template = '';

  // Look in yourtheme/${data.pluginFileName}/slug-name.php and yourtheme/${data.pluginFileName}/slug.php.
  $template = locate_template(
    [
      ${data.constantPrefix}_TEMPLATE_PATH . "{$slug}-{$name}.php",
      ${data.constantPrefix}_TEMPLATE_PATH . "{$slug}.php",
    ]
  );

  /**
  * Change template directory path filter.
  *
  * @since ${data.version}
  */
  $template_path = apply_filters( '${functionPrefix}_set_template_path', ${data.constantPrefix}_TEMPLATE_PATH, $template, $args );

  // Get default slug-name.php.
  if ( ! $template && $name && file_exists( $template_path . "/{$slug}-{$name}.php" ) ) {
    $template = $template_path . "/{$slug}-{$name}.php";
  }

  if ( ! $template && ! $name && file_exists( $template_path . "/{$slug}.php" ) ) {
    $template = $template_path . "/{$slug}.php";
  }

  // Allow 3rd party plugin filter template file from their plugin.
  $template = apply_filters( '${functionPrefix}_get_template_part', $template, $slug, $name );

  if ( $template ) {
    include $template;
  }
}

/**
* Get other templates (e.g. product attributes) passing attributes and including the file.
*
* @param mixed  $template_name Template Name.
* @param array  $args          (default: array()) arguments.
* @param string $template_path (default: '').
* @param string $default_path  (default: '').
*
* @since ${data.version}
*
* @return void
*/
function ${functionPrefix}_get_template( $template_name, $args = [], $template_path = '', $default_path = '' ) {
  if ( $args && is_array( $args ) ) {
    extract( $args ); //phpcs:ignore
  }

  $extension = ${functionPrefix}_get_extension( $template_name ) ? '' : '.php';

  $located = ${functionPrefix}_locate_template( $template_name . $extension, $template_path, $default_path );

  if ( ! file_exists( $located ) ) {
    _doing_it_wrong( __FUNCTION__, sprintf( '<code>%s</code> does not exist.', esc_html( $located ) ), '2.1' );

    return;
  }

  do_action( '${functionPrefix}_before_template_part', $template_name, $template_path, $located, $args );

  include $located;

  do_action( '${functionPrefix}_after_template_part', $template_name, $template_path, $located, $args );
}

/**
* Locate a template and return the path for inclusion.
*
* This is the load order:
*
*      yourtheme       /   $template_path  /   $template_name
*      yourtheme       /   $template_name
*      $default_path   /   $template_name
*
* @param mixed  $template_name Template name.
* @param string $template_path (default: '').
* @param string $default_path  (default: '').
*
* @since ${data.version}
*
* @return string
*/
function ${functionPrefix}_locate_template( $template_name, $template_path = '', $default_path = '' ) {
  if ( ! $template_path ) {
    $template_path = ${data.constantPrefix}_TEMPLATE_PATH;
  }

  if ( ! $default_path ) {
    $default_path = ${data.constantPrefix}_TEMPLATE_PATH;
  }

  // Look within passed path within the theme - this is priority.
  $template = locate_template(
    [
      trailingslashit( $template_path ) . $template_name,
    ]
  );

  // Get default template.
  if ( ! $template ) {
    $template = $default_path . $template_name;
  }

  // Return what we found.
  return apply_filters( '${functionPrefix}_locate_template', $template, $template_name, $template_path );
}

/**
* Get filename extension.
*
* @param string $file_name File name.
*
* @since ${data.version}
*
* @return false|string
*/
function ${functionPrefix}_get_extension( $file_name ) {
  $n = strrpos( $file_name, '.' );

  return ( false === $n ) ? '' : substr( $file_name, $n + 1 );
}
\n
`;
  let cruds;

  if ((cruds = makeCrudFromTables(tables))) {
    code += cruds;
  }
  return code;
};
