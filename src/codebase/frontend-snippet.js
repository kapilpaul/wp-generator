export const frontendSnippet = (data) => {
  let code = `<?php

namespace ${data.baseNamespace};

/**
 * Frontend handler class
 */
class Frontend {
    /**
     * Frontend constructor.
     */
    public function __construct() {
        new Frontend\\Shortcode();
    }
}`;

  return code;
};
