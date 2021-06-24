export const frontendSnippet = (data) => {
  let code = `<?php
/**
 * Frontend handler class
 * 
 * @package ${data.baseNamespace}\\Frontend
 */

namespace ${data.baseNamespace};

/**
 * Frontend handler class
 */
class Frontend {
  
    /**
     * Frontend constructor.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function __construct() {
        new Frontend\\Shortcode();
    }
}`;

  return code;
};
