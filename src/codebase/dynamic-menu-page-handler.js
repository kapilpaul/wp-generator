import { validateTableSetting } from "./fields";

/**
 *
 * @param {*} data
 * @param {*} table
 */
export const dynamicMenuPageHandler = (data, table) => {
  let settings;

  if (typeof table.settings !== "undefined" && table.settings.adminPanel) {
    settings = validateTableSetting(table.settings);
  }

  let code = `<?php

`;

  if (table.fields.length) {
    code += `namespace ${data.baseNamespace}\\Admin;

use ${data.baseNamespace}\\Traits\\Form_Error;

/**
 * ${settings.crudClassName} Handler class
 */
class ${settings.crudClassName} {

    use Form_Error;

    /**
     * Initialize the class
     */
    public function __construct() {
        add_action( 'admin_init', [ $this, 'form_handler' ] );
        add_action( 'admin_post_${data.actionPrefix}-delete-${settings.singularName}', [ $this, 'delete_${settings.singularName}' ] );
    }

    /**
     * Plugin page handler
     *
     * @return void
     */
    public function plugin_page() {
        $action = isset( $_GET['action'] ) ? $_GET['action'] : 'list';
        $id     = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : 0;

        switch ( $action ) {
            case 'new':
                $template = __DIR__ . '/views/${settings.fileNamePrefix}-new.php';
                break;

            case 'edit':
                $${settings.singularName}  = ${data.functionPrefix}_get_${settings.singularName}( $id );
                $template = __DIR__ . '/views/${settings.fileNamePrefix}-edit.php';
                break;

            case 'view':
                $template = __DIR__ . '/views/${settings.fileNamePrefix}-view.php';
                break;

            default:
                $template = __DIR__ . '/views/${settings.fileNamePrefix}-list.php';
                break;
        }

        if ( file_exists( $template ) ) {
            include $template;
        }
    }

    /**
     * Handle the form
     *
     * @return void
     */
    public function form_handler() {
        if ( ! isset( $_POST['${settings.submitName}'] ) ) {
            return;
        }

        if ( ! wp_verify_nonce( $_POST['_wpnonce'], '${settings.nonceKey}' ) ) {
            wp_die( 'Are you cheating?' );
        }

        if ( ! current_user_can( '${settings.capability}' ) ) {
            wp_die( 'Are you cheating?' );
        }

        $id      = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
        $name    = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
        $address = isset( $_POST['address'] ) ? sanitize_textarea_field( $_POST['address'] ) : '';
        $phone   = isset( $_POST['phone'] ) ? sanitize_text_field( $_POST['phone'] ) : '';

        if ( empty( $name ) ) {
            $this->errors['name'] = __( 'Please provide a name', '${data.textDomain}' );
        }

        if ( empty( $phone ) ) {
            $this->errors['phone'] = __( 'Please provide a phone number.', '${data.textDomain}' );
        }

        if ( ! empty( $this->errors ) ) {
            return;
        }

        $args = [
            'name'    => $name,
            'address' => $address,
            'phone'   => $phone
        ];

        if ( $id ) {
            $args['id'] = $id;
        }

        $insert_id = ${data.functionPrefix}_insert_${settings.singularName}( $args );

        if ( is_wp_error( $insert_id ) ) {
            wp_die( $insert_id->get_error_message() );
        }

        if ( $id ) {
            $redirected_to = admin_url( 'admin.php?page=${settings.pageSlug}&action=edit&${settings.singularName}-updated=true&id=' . $id );
        } else {
            $redirected_to = admin_url( 'admin.php?page=${settings.pageSlug}&inserted=true' );
        }

        wp_redirect( $redirected_to );
        exit;
    }

    public function delete_${settings.singularName}() {
        if ( ! wp_verify_nonce( $_REQUEST['_wpnonce'], '${data.actionPrefix}-delete-${settings.singularName}' ) ) {
            wp_die( 'Are you cheating?' );
        }

        if ( ! current_user_can( '${settings.capability}' ) ) {
            wp_die( 'Are you cheating?' );
        }

        $id = isset( $_REQUEST['id'] ) ? intval( $_REQUEST['id'] ) : 0;

        if ( ${data.functionPrefix}_delete_${settings.singularName}( $id ) ) {
            $redirected_to = admin_url( 'admin.php?page=${settings.pageSlug}&${settings.singularName}-deleted=true' );
        } else {
            $redirected_to = admin_url( 'admin.php?page=${settings.pageSlug}&${settings.singularName}-deleted=false' );
        }

        wp_redirect( $redirected_to );
        exit;
    }
}
`;
  }

  return code;
};
