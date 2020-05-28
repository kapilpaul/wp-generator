import { validateTableSetting } from "../fields";

import { listViewCode } from "./list-view";
import { newViewCode } from "./new-view";
import { editViewCode } from "./edit-view";

export const viewSnippet = (viewType, data, table) => {
  let settings;
  if (typeof table.settings !== "undefined" && table.settings.adminPanel) {
    settings = validateTableSetting(table.settings);
  } else if (!table.settings.adminPanel) {
    return;
  }

  switch (viewType) {
    case "new":
      return newViewCode(data, settings, table);
      break;
    case "edit":
      return editViewCode(data, settings, table);
      break;
    case "view":
    case "list":
      return listViewCode(data, settings);
      break;
  }
};
