export const textPhpCode = (pluginName) => {
  let data = `
<?php

namespace ${pluginName}\\Test;

class Test {
    public function index() {
        return "ok";
    }
}
?>
`;

  return data;
};
