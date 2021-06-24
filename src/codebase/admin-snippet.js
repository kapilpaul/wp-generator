import { validateTableSetting } from "./fields";

const makeDispatchActions = (data, tables) => {
  let dispatchData = ``;

  tables
    .filter((item) => {
      return item.settings.adminPanel && item.settings.crudClassName;
    })
    .map((item) => {
      let settings;
      if (typeof item.settings !== "undefined") {
        settings = validateTableSetting(item.settings);
      }

      let variableName = settings.crudClassName.toLowerCase();
      dispatchData += `        $${variableName} = new Admin\\${settings.crudClassName}();
        add_action( 'admin_init', [ $${variableName}, 'form_handler' ] );
        add_action( 'admin_post_${data.actionPrefix}-delete-${settings.singularName}', [ $${variableName}, 'delete_${settings.singularName}' ] );\n\n`;
    });

  return dispatchData.trim();
};

export const adminCode = (data, tables) => {
  let code = `<?php
/**
 * The admin class
 * 
 * @package ${data.baseNamespace}\\Admin
 */

namespace ${data.baseNamespace};

/**
 * The admin class
 */
class Admin {

    /**
     * Initialize the class.
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function __construct() {
        $this->dispatch_actions();
        new Admin\\Menu();
    }

    /**
     * Dispatch and bind actions.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function dispatch_actions() {
        ${makeDispatchActions(data, tables)}
    }

}
`;

  return code;
};
