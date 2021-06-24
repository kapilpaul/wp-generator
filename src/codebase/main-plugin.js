export const mainPluginCode = (data) => {
  let code = `<?php
/**
 * Plugin Name: ${data.pluginName}
 * Plugin URI: ${data.pluginURI}
 * Description: ${data.description}
 * Version: ${data.version}
 * Author: ${data.author}
 * Author URI: ${data.authorURI}
 * License: ${data.license}
 * License URI: ${data.licenseURI}
 * Text Domain: ${data.textDomain}
 * Domain Path: ${data.domainPath}
 * 
 * @package ${data.pluginName}
 */

/**
 * Copyright (c) ${new Date().getFullYear()} ${data.author} (email: ${
    data.authorEmail
  }). All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * ${data.mainClassName} class
 *
 * @class ${data.mainClassName} The class that holds the entire ${
    data.mainClassName
  } plugin
 */
final class ${data.mainClassName} {
    /**
     * Plugin version
     *
     * @var string
     * 
     * @since ${data.version}
     */
    const VERSION = '${data.version}';

    /**
     * Holds various class instances.
     *
     * @var array
     * 
     * @since ${data.version}
     */
    private $container = [];

    /**
     * Constructor for the ${data.mainClassName} class.
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     * 
     * @since ${data.version}
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes the ${data.mainClassName}() class.
     *
     * Checks for an existing ${data.mainClassName}() instance
     * and if it doesn't find one, creates it.
     * 
     * @since ${data.version}
     *
     * @return ${data.mainClassName}|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new ${data.mainClassName}();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     * 
     * @since ${data.version}
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     * 
     * @since ${data.version}
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function define_constants() {
        define( '${data.constantPrefix}_VERSION', self::VERSION );
        define( '${data.constantPrefix}_FILE', __FILE__ );
        define( '${data.constantPrefix}_PATH', dirname( ${
    data.constantPrefix
  }_FILE ) );
        define( '${data.constantPrefix}_INCLUDES', ${
    data.constantPrefix
  }_PATH . '/includes' );
        define( '${data.constantPrefix}_URL', plugins_url( '', ${
    data.constantPrefix
  }_FILE ) );
        define( '${data.constantPrefix}_ASSETS', ${
    data.constantPrefix
  }_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function.
     *
     * Nothing being called here yet.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function activate() {
        $installer = new ${data.baseNamespace}\\Installer();
        $installer->run();
    }

    /**
     * Placeholder for deactivation function.
     *
     * Nothing being called here yet.
     * 
     * @since ${data.version}
     */
    public function deactivate() {

    }

    /**
     * Include the required files.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function includes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new ${data.baseNamespace}\\Admin();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new ${
              data.baseNamespace
            }\\Frontend();
        }

        if ( $this->is_request( 'ajax' ) ) {
            // require_once ${data.constantPrefix}_INCLUDES . '/class-ajax.php';
        }
    }

    /**
     * Initialize the hooks.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'init', [ $this, 'init_classes' ] );

        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );
    }

    /**
     * Instantiate the required classes.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function init_classes() {
        if ( $this->is_request( 'ajax' ) ) {
            // $this->container['ajax'] =  new ${data.baseNamespace}\\Ajax();
        }

        $this->container['api']    = new ${data.baseNamespace}\\Api();
        $this->container['assets'] = new ${data.baseNamespace}\\Assets();
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function localization_setup() {
        load_plugin_textdomain( '${
          data.textDomain
        }', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     *
     * @param string $type admin, ajax, cron or frontend.
     * 
     * @since ${data.version}
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();

            case 'ajax' :
                return defined( 'DOING_AJAX' );

            case 'rest' :
                return defined( 'REST_REQUEST' );

            case 'cron' :
                return defined( 'DOING_CRON' );

            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

} // ${data.mainClassName}

/**
 * Initialize the main plugin.
 * 
 * @since ${data.version}
 *
 * @return \\${data.mainClassName}|bool
 */
function ${data.mainClassName.toLowerCase()}() {
    return ${data.mainClassName}::init();
}

/**
 * Kick-off the plugin.
 * 
 * @since ${data.version}
 */
${data.mainClassName.toLowerCase()}();
`;

  return code;
};
