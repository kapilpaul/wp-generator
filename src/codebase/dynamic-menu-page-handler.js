import { validateTableSetting } from "./fields";

const validation = (tableFields, textDomain) => {
  let validationCodes = ``;
  let sanitizeFields = ``;
  let args = ``;

  tableFields
    .filter((item) => {
      return item.name && item.type && !item.primary_key;
    })
    .map((item) => {
      if (item.showInCrudForm && item.formInputRequired) {
        validationCodes += `if ( empty( $${item.name} ) ) {
            $this->errors['${item.name}'] = __( 'Please provide a ${item.name}', '${textDomain}' );
        }

        `;

        let sanitizeType = "sanitize_text_field";
        let defaultVal = `''`;

        switch (item.formInputType) {
          case "number":
            sanitizeType = "intval";
            defaultVal = 0;
            break;
          case "textarea":
            sanitizeType = "sanitize_textarea_field";
            break;
          default:
            sanitizeType = "sanitize_text_field";
            break;
        }

        sanitizeFields += `$${item.name} = isset( $_POST['${item.name}'] ) ? ${sanitizeType}( $_POST['${item.name}'] ) : ${defaultVal};\n        `;

        args += `            '${item.name}' => $${item.name},\n`;
      }
    });

  return {
    validate: validationCodes.trim(),
    sanitizeFields: sanitizeFields.trim(),
    args: args.trim(),
  };
};

/**
 *
 * @param {*} data
 * @param {*} table
 */
export const dynamicMenuPageHandler = (data, table) => {
  let settings;
  let validationCodes;

  if (typeof table.settings !== "undefined" && table.settings.adminPanel) {
    settings = validateTableSetting(table.settings);
    validationCodes = validation(table.fields, data.textDomain);
  }

  let code = `<?php
/**
 * ${settings.crudClassName} Handler class
 * 
 * @package ${data.baseNamespace}\\Admin\\${settings.crudClassName}
 */

`;

  if ( table.fields.length ) {
    code += `namespace ${data.baseNamespace}\\Admin;

use ${data.baseNamespace}\\Traits\\Form_Error;

/**
 * ${settings.crudClassName} Handler class
 */
class ${settings.crudClassName} {

    use Form_Error;

    /**
     * Plugin page handler
     * 
     * @since ${data.version}
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
     * Handle the form.
     * 
     * @since ${data.version}
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
        ${validationCodes.sanitizeFields}

        ${validationCodes.validate}

        if ( ! empty( $this->errors ) ) {
            return;
        }

        $args = [
            ${validationCodes.args}
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

        wp_safe_redirect( $redirected_to );
        exit;
    }

    /**
     * Handle delete action
     * 
     * @since ${data.version}
     * 
     * @return void
     */
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

        wp_safe_redirect( $redirected_to );
        exit;
    }
}
`;
  }

  return code;
};
