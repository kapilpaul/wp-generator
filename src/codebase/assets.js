/**
 * dependency maker from comma separated
 * @param {*} dependency
 */
const dependencyMaker = (dependency) => {
  let deps = "";

  if (dependency !== "") {
    deps =
      " " +
      `'${dependency
        .split(",")
        .map((i) => i.trim())
        .join("', '")}'` +
      " ";
  }

  return deps;
};

/**
 * build JS scripts array for PHP
 * @param {*} constantPrefix
 * @param {*} jsFiles
 */
const buildJsScripts = (constantPrefix, jsFiles) => {
  var scripts = "";

  jsFiles
    .filter((item) => {
      return item.handle !== "" && item.script !== "";
    })
    .map((item) => {
      let deps = dependencyMaker(item.dependency);

      scripts += `
            '${item.handle}' => [
                'src'       => $plugin_js_assets_path . '${item.script}',
                'version'   => filemtime( ${constantPrefix}_PATH . '/assets/js/${item.script}' ),
                 'deps'      => [${deps}],
                'in_footer' => ${item.in_footer},
            ],`;
    });

  return scripts.trim();
};

/**
 * build CSS styles array for PHP
 * @param {*} constantPrefix
 * @param {*} cssFiles
 */
const buildCssScripts = (constantPrefix, cssFiles) => {
  var styles = "";

  cssFiles
    .filter((item) => {
      return item.handle !== "" && item.style !== "";
    })
    .map((item) => {
      let deps = dependencyMaker(item.dependency);

      styles += `
            '${item.handle}' => [
                'src'       => $plugin_css_assets_path . '${item.style}',
                'deps'      => [${deps}],
                'version'   => filemtime( ${constantPrefix}_PATH . '/assets/css/${item.style}' ),
            ],`;
    });

  return styles.trim();
};

/**
 * assets code for assets.php file
 * @param {*} data
 * @param {*} assets
 */
export const assetsCode = (data, assets) => {
  let registerStyles = buildCssScripts(data.constantPrefix, assets.css);
  let registerScripts = buildJsScripts(data.constantPrefix, assets.js);

  let code = `<?php
/**
 * Scripts and Styles Class.
 * 
 * @package ${data.baseNamespace}\\Assets
 */

namespace ${data.baseNamespace};

/**
 * Scripts and Styles Class
 */
class Assets {

    /**
     * Assets constructor.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function __construct() {
        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    }

    /**
     * Register our app scripts and styles
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function register() {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
    }

    /**
     * Register scripts
     *
     * @param array $scripts
     * 
     * @since ${data.version}
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : ${data.constantPrefix}_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param array $styles
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, ${data.constantPrefix}_VERSION );
        }
    }

    /**
     * Get all registered scripts
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_scripts() {
        $plugin_js_assets_path = ${data.constantPrefix}_ASSETS . '/js/';

        $scripts = [
            ${registerScripts}
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_styles() {
        $plugin_css_assets_path = ${data.constantPrefix}_ASSETS . '/css/';

        $styles = [
            ${registerStyles}
        ];

        return $styles;
    }
}
`;

  return code;
};
