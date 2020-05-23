const buildJsScripts = (constantPrefix, jsFiles) => {
  var scripts = "";

  jsFiles
    .filter((item) => {
      return item.handle !== "" && item.script !== "";
    })
    .map((item) => {
      let deps = "";

      if (item.dependency !== "") {
        deps =
          " " +
          `'${item.dependency
            .split(",")
            .map((i) => i.trim())
            .join("', '")}'` +
          " ";
      }

      scripts += `
            '${item.handle}' => [
                'src'       => $pluginJSAssetsPath . '${item.script}',
                'deps'      => [${deps}],
                'version'   => filemtime( ${constantPrefix}_PATH . '/assets/js/${item.script}' ),
                'in_footer' => ${item.in_footer},
            ],`;
    });

  return scripts.trim();
};

export const assetsCode = (data, assets) => {
  let registerScripts = buildJsScripts(data.constantPrefix, assets.js);

  let code = `<?php

namespace ${data.baseNamespace};

/**
 * Scripts and Styles Class
 */
class Assets {
    /**
     * Assets constructor.
     */
    function __construct() {
        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    }

    /**
     * Register our app scripts and styles
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
     * @return array
     */
    public function get_scripts() {
        $pluginJSAssetsPath = ${data.constantPrefix}_ASSETS . '/js/';

        $scripts = [
            ${registerScripts}
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {
        $pluginJSAssetsPath = ${data.constantPrefix}_ASSETS . '/css/';

        $styles = [
            'dc-nagad-frontend' => [
                'src' => $pluginJSAssetsPath . '/frontend.css',
            ],
            'dc-nagad-admin'    => [
                'src' => $pluginJSAssetsPath . '/admin.css',
            ],
        ];

        return $styles;
    }

}
`;

  return code;
};
