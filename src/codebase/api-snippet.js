const register_api = (tables) => {
  let codeData = ``;
  tables
    .filter((item) => {
      return item.restapi.enabled && item.restapi.className !== "";
    })
    .map((item) => {
      let className = item.restapi.className.toLowerCase();
      codeData += `        $${className} = new API\\${item.restapi.className}();
        $${className}->register_routes();\n\n`;
    });

  return codeData.trim();
};

export const apiSnippetCode = (data, tables) => {
  let register_api_data = register_api(tables);

  let code = `<?php

namespace ${data.baseNamespace};

/**
 * API Class
 */
class API {

    /**
     * Initialize the class
     */
    function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_api' ] );
    }

    /**
     * Register the API
     *
     * @return void
     */
    public function register_api() {
        ${register_api_data}
    }
}`;

  return code;
};
