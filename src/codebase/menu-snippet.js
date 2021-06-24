/**
 * make menu data and methods
 * @param {*} tables
 * @param {*} textDomain
 */
const makeMenuData = (tables, textDomain) => {
  let menu_data = ``;
  let indent = `        `;
  let plugin_page_methods = ``;

  tables
    .filter((item) => {
      return (
        item.settings.adminPanel &&
        item.settings.pageSlug &&
        item.settings.crudClassName &&
        item.settings.capability
      );
    })
    .map((item) => {
      let settings = item.settings;
      let method_name = settings.pageSlug.replace(/-/g, "_") + "_page";

      menu_data += `${indent}add_submenu_page( $parent_slug, __( '${settings.pageTitle}', '${textDomain}' ), __( '${settings.menuTitle}', '${textDomain}' ), '${settings.capability}', '${settings.pageSlug}', [ $this, '${method_name}' ] );\n`;

      let curdclassnameInLowerCase = settings.crudClassName.toLowerCase();

      plugin_page_methods += `    /**
     * Handles the ${settings.menuTitle} page
     *
     * @return void
     */
    public function ${method_name}() {
        $${curdclassnameInLowerCase} = new ${settings.crudClassName}();
        $${curdclassnameInLowerCase}->plugin_page();
    }\n\n`;
    });

  return {
    menu_data: menu_data.trim(),
    plugin_page_methods: plugin_page_methods.trim(),
  };
};

export const menuSnippet = (data, tables, mainMenu) => {
  let add_menu_data = makeMenuData(tables, data.textDomain);
  let menus = ``;

  if (
    mainMenu.pageTitle &&
    mainMenu.menuTitle &&
    mainMenu.capability &&
    mainMenu.pageSlug
  ) {
    menus = `$parent_slug = '${mainMenu.pageSlug}';
        $capability = '${mainMenu.capability}';

        $hook = add_menu_page( __( '${mainMenu.pageTitle}', '${data.textDomain}' ), __( '${mainMenu.menuTitle}', '${data.textDomain}' ), $capability, $parent_slug, [ $this, 'plugin_page' ], 'dashicons-admin-tools' );
        ${add_menu_data.menu_data}

        add_action( 'load-' . $hook, [ $this, 'init_hooks' ] );`;
  }

  let code = `<?php
/**
 * Admin Pages Handler
 * Class Menu
 * 
 * @package ${data.baseNamespace}\\Admin
 */
namespace ${data.baseNamespace}\\Admin;

/**
 * Class Menu
 */
class Menu {
    /**
     * Menu constructor.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    /**
     * Register our menu page
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function admin_menu() {
        ${menus}
    }

    /**
     * Initialize our hooks for the admin page
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Load scripts and styles for the app
     * 
     * @since ${data.version}
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
     * @since ${data.version}
     *
     * @return void
     */
    public function plugin_page() {
        echo '<div class="wrap">WP Generator is a plugin generator tool for developers.</div>';
    }

    ${add_menu_data.plugin_page_methods}
}
`;

  return code;
};
