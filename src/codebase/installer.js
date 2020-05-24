export const installerCode = (data) => {
  let plugin_name = data.pluginName.replace(/-/g, "_");

  let code = `<?php

namespace ${data.baseNamespace};

/**
 * Class Installer
 * @package ${data.baseNamespace}
 */
class Installer {
    /**
     * Run the installer
     *
     * @return void
     */
    public function run() {
        $this->add_version();
        $this->create_tables();
    }

    /**
     * Add time and version on DB
     */
    public function add_version() {
        $installed = get_option( '${plugin_name}_installed' );

        if ( ! $installed ) {
            update_option( '${plugin_name}_installed', time() );
        }

        update_option( '${plugin_name}_version', ${data.constantPrefix}_VERSION );

    }

    /**
     * Create necessary database tables
     *
     * @return void
     */
    public function create_tables() {
        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        $this->create_transaction_table();
    }

    /**
     * Create transactions table
     *
     * @return void
     */
    public function create_transaction_table() {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_name      = $wpdb->prefix . 'dc_nagad_transactions';

        $schema = "CREATE TABLE IF NOT EXISTS {$table_name} (
                      \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
                      \`customer_id varchar(255) DEFAULT NULL,
                      \`payment_ref_id varchar(255) DEFAULT NULL,
                      \`issuer_payment_ref varchar(255) DEFAULT NULL,
                      \`invoice_number varchar(255) DEFAULT NULL,
                      \`order_number varchar(15) DEFAULT NULL,
                      \`amount float NOT NULL DEFAULT '0',
                      \`transaction_status varchar(255) DEFAULT NULL,
                      \`created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                      \`updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                      PRIMARY KEY (\`id)
                    ) $charset_collate";

        dbDelta($schema);
    }
}
`;

  return code;
};
