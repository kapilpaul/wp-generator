const makeTables = (tablesData) => {
  let create_tables = "";
  let create_table_sql = "";

  tablesData
    .filter((item) => {
      return item.name && item.fields.length > 0;
    })
    .map((item) => {
      create_tables += `$this->create_${item.name}_table();\n        `; //blank space is for indenting
      create_table_sql += makeTableQuery(item.name, item.fields);
    });

  return {
    create_tables: create_tables.trim(),
    create_table_sql_functions: create_table_sql.trim(),
  };
};

/**
 * make table query
 * NB: blank spaces are for indenting
 * @param {*} name
 * @param {*} fields
 */
const makeTableQuery = (name, fields) => {
  let schema = `/**
     * Create ${name} table
     *
     * @return void
     */
    public function create_${name}_table() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_name      = $wpdb->prefix . '${name}';

        $schema = "CREATE TABLE IF NOT EXISTS \`{$table_name}\` (\n                      `;

  let innerField = ``;
  let primary_key = "";

  fields
    .filter((item) => {
      return item.name && item.type;
    })
    .map((item) => {
      innerField += `                      \`${item.name}\` ${item.type}`;
      innerField += item.length !== "" ? `(${item.length})` : "";
      innerField += item.nullable ? "" : ` NOT NULL`;
      innerField += !item.nullable
        ? item.default !== ""
          ? ` DEFAULT ${item.default}`
          : ""
        : "";

      if (item.primary_key) {
        primary_key = item.name;
        innerField += ` AUTO_INCREMENT`;
      }

      innerField += `,\n`;
    });

  if (primary_key !== "") {
    innerField += `                      PRIMARY KEY (\`${primary_key}\`)`;
  }

  schema += `${innerField.trim()}\n                    ) $charset_collate";

        dbDelta($schema);
    }`;

  return schema;
};

/**
 * generate installer codes
 * @param {*} data
 * @param {*} tables
 */
export const installerCode = (data, tables) => {
  let plugin_name = data.pluginName.replace(/\s|-/g, "_").toLowerCase();

  let processed_tables = makeTables(tables);

  let code = `<?php
/**
 * The Installer class.
 * Install all dependency from here while activating the plugin.
 *
 * @package ${data.baseNamespace}\\Installer
 */

namespace ${data.baseNamespace};

/**
 * Class Installer
 * @package ${data.baseNamespace}
 */
class Installer {

    /**
     * Run the installer.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function run() {
        $this->add_version();
        $this->create_tables();
    }

    /**
     * Add time and version on DB.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function add_version() {
        $installed = get_option( '${plugin_name}_installed' );

        if ( ! $installed ) {
            update_option( '${plugin_name}_installed', time() );
        }

        update_option( '${plugin_name}_version', ${data.constantPrefix}_VERSION );
    }

    /**
     * Create necessary database tables.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function create_tables() {
        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        ${processed_tables.create_tables}
    }

    ${processed_tables.create_table_sql_functions}
}
`;

  return code;
};
