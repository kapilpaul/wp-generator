import { slug } from "../utils/helpers";
export const shortcodeSnippet = (data) => {
  let pluginName = slug(data.pluginName, "_");

  let code = `<?php
/**
 * Class Shortcode
 * 
 * @package ${data.baseNamespace}\\Frontend\\Shortcode
 */

namespace ${data.baseNamespace}\\Frontend;

/**
 * Class Shortcode
 */
class Shortcode {

    /**
     * Constructor class
     * 
     * @since ${data.version}
     * 
     * @return void
     * /
    public function __construct() {
        add_shortcode( '${pluginName}', [ $this, 'render_frontend' ] );
    }

    /**
     * Render frontend app
     *
     * @param array $atts
     * @param string $content
     * 
     * @since ${data.version}
     *
     * @return string
     */
    public function render_frontend( $atts, $content = '' ) {
        // wp_enqueue_style( 'frontend' );
        // wp_enqueue_script( 'frontend' );

        $content .= 'Hello World!';

        return $content;
    }
}
`;

  return code;
};
