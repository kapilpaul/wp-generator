export const shortcodeSnippet = (data) => {
  let code = `<?php

namespace ${data.baseNamespace}\\Frontend;

/**
 * Class Shortcode
 * @package ${data.baseNamespace}\\Frontend
 */
class Shortcode {

    public function __construct() {
        add_shortcode( '${data.pluginName}', [ $this, 'render_frontend' ] );
    }

    /**
     * Render frontend app
     *
     * @param array $atts
     * @param string $content
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
