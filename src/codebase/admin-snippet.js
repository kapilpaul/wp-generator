export const adminCode = (data) => {
  let code = `<?php

namespace ${data.baseNamespace};

/**
 * The admin class
 */
class Admin {

    /**
     * Initialize the class
     */
    public function __construct() {
        new Admin\\Menu();
    }

}
`;

  return code;
};
