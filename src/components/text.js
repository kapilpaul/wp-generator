export const textPhpCode = (pluginName) => {
  let data = `<?php
/*
Plugin Name: ${pluginName}
Plugin URI: https://kapilpaul.me/projects/wordpress/nagad-payment
Description: Nagad payment gateway for woocommerce.
Version: 1.0.0
Author: Kapil Paul
Author URI: https://kapilpaul.me/
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: dc-nagad
*/

/**
 * Copyright (c) 2020 Kapil Paul (email: kapilpaul007@gmail.com). All rights reserved.
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

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require_once __DIR__ . '/vendor/autoload.php';
}

//checking woocommerce is active or not
if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
    return;
}

/**
 * DCoders_Nagad class
 *
 * @class DCoders_Nagad The class that holds the entire DCoders_Nagad plugin
 */
final class DCoders_Nagad {
    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.0';

    /**
     * Holds various class instances
     *
     * @var array
     */
    private $container = [];

    /**
     * Constructor for the DCoders_Nagad class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );
    }

    /**
     * Initializes the DCoders_Nagad() class
     *
     * Checks for an existing DCoders_Nagad() instance
     * and if it doesn't find one, creates it.
     *
     * @return DCoders_Nagad|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new DCoders_Nagad();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
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
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'DC_NAGAD_VERSION', self::version );
        define( 'DC_NAGAD_FILE', __FILE__ );
        define( 'DC_NAGAD_PATH', dirname( DC_NAGAD_FILE ) );
        define( 'DC_NAGAD_INCLUDES', DC_NAGAD_PATH . '/includes' );
        define( 'DC_NAGAD_URL', plugins_url( '', DC_NAGAD_FILE ) );
        define( 'DC_NAGAD_ASSETS', DC_NAGAD_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
        $this->init_filters();
    }

    /**
     *
     *
     * @return void
     */
    public function activate() {
        $installer = new DCoders\\Nagad\\Installer();
        $installer->run();
        flush_rewrite_rules();
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {
        flush_rewrite_rules();
    }

    /**
     * init filters here
     *
     * @return void
     */
    public function init_filters() {
        add_filter( 'woocommerce_payment_gateways', [ $this, 'register_gateway' ] );
    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new DCoders\\Nagad\\Admin();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new DCoders\\Nagad\\Frontend();
        }
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'init', [ $this, 'init_classes' ] );

        // Localize our plugin
        add_action( 'init', [ $this, 'localization_setup' ] );

        add_action( 'init', [ $this, 'custom_add_rewrite_rule' ] );
    }

    /**
     * @return void
     */
    public function custom_add_rewrite_rule() {
        add_rewrite_rule( '^dc-nagad/payment/action/?', 'index.php?dc_nagad_action=dc-payment-action', 'top' );
        flush_rewrite_rules();
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes() {
        if ( $this->is_request( 'ajax' ) ) {
            $this->container['ajax'] = new DCoders\\Nagad\\Frontend\\Ajax();
        }

        $this->container['assets']         = new DCoders\\Nagad\\Assets();
        $this->container['dc_nagad_pages'] = new DCoders\\Nagad\\PageHandler();
    }

    /**
     * Register WooCommerce Payment Gateway
     *
     * @param array $gateways
     *
     * @return array
     */
    public function register_gateway( $gateways ) {
        $gateways[] = new DCoders\\Nagad\\Woocommerce\\Nagad_Gateway();

        return $gateways;
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'dc-nagad', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     *
     * @param string $type admin, ajax, cron or frontend.
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
} // DCoders_Nagad

/**
 * Initialize the main plugin
 *
 * @return \DCoders_Nagad|bool
 */
function dcoders_nagad() {
    return DCoders_Nagad::init();
}

/**
 *  kick-off the plugin
 */
dcoders_nagad();
`;

  return data;
};
