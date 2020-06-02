const makeMenuData = (tables, textDomain) => {
  let menu_data = ``;
  let indent = `        `;
  let plugin_page_methods = ``;

  tables
    .filter((item) => {
      return (
        item.settings.adminPanel &&
        item.settings.pageSlug &&
        item.settings.crudClassName
      );
    })
    .map((item) => {
      let settings = item.settings;
      let method_name = settings.pageSlug.replace(/-/g, "_") + "_page";

      menu_data += `${indent}add_submenu_page( $parent_slug, __( '${settings.pageTitle}', '${textDomain}' ), __( '${settings.menuTitle}', '${textDomain}' ), '${settings.capability}', '${settings.pageSlug}', [ $this, '${method_name}' ] );\n`;

      plugin_page_methods += `    /**
     * Handles the ${settings.menuTitle} page
     *
     * @return void
     */
    public function ${method_name}() {
        $${settings.crudClassName} = new ${settings.crudClassName}();
        $${settings.crudClassName}->plugin_page();
    }\n\n`;
    });

  return {
    menu_data: menu_data.trim(),
    plugin_page_methods: plugin_page_methods.trim(),
  };
};

export const menuSnippet = (data, tables) => {
  let add_menu_data = makeMenuData(tables, data.textDomain);

  let code = `<?php

namespace ${data.baseNamespace}\\Admin;

/**
 * Admin Pages Handler
 *
 * Class Menu
 * @package ${data.baseNamespace}\\Admin
 */
class Menu {
    /**
     * Menu constructor.
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu() {
        $parent_slug = '${data.pluginName}';
        $capability = 'manage_options';

        $hook = add_menu_page( __( 'WP Generator', '${data.textDomain}' ), __( '${data.pluginName}', '${data.textDomain}' ), $capability, $parent_slug, [ $this, 'plugin_page' ], 'dashicons-admin-tools' );

        ${add_menu_data.menu_data}

        add_action( 'load-' . $hook, [ $this, 'init_hooks' ] );
    }

    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts() {
        // wp_enqueue_style( 'admin' );
        // wp_enqueue_script( 'admin' );
    }

    /**
     * Handles the main page
     *
     * @return void
     */
    public function plugin_page() {
        echo 'WP Generator is a plugin generator tool for developers.';
    }

    ${add_menu_data.plugin_page_methods}
}
`;

  return code;
};
