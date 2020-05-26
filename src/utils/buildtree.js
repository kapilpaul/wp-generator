/**
 * build tree data for vue js tree
 *
 * @param {*} items
 * @param {*} id
 * @param {*} link
 *
 * @return object
 */
export const buildTreeData = (items, id = null, link = "parent_id") =>
  items
    .filter((item) => item[link] === id)
    .map((item) => {
      let data = {
        text: item.name,
        type: item.type,
      };

      if (typeof item.directory !== "undefined" && item.directory) {
        data.opened = item.directory;
        data.children = buildTreeData(items, item.id);
      }

      if (typeof item.file !== "undefined" && item.file) {
        var fileExt = item.name.split(".").pop();

        switch (fileExt) {
          case "php":
            data.icon = "fab fa-php";
            break;
          case "css":
            data.icon = "fab fa-css3";
            break;
          case "js":
            data.icon = "fab fa-js-square";
            break;
          default:
            data.icon = "far fa-file";
            break;
        }

        data.file = item.file;

        if (typeof item.value !== "undefined") {
          data.value = item.value();
        }
      }

      return data;
    });

/**
 * build tree data for zip
 *
 * @param {*} items
 * @param {*} id
 * @param {*} link
 *
 * @return object
 */
export const buildZipTree = (items, zip, id = null, link = "parent_id") =>
  items
    .filter((item) => item[link] === id)
    .map((item) => {
      var dataZip;

      if (typeof item.directory !== "undefined" && item.directory) {
        dataZip = zip.folder(item.name);
        buildZipTree(items, dataZip, item.id);
      }

      if (typeof item.file !== "undefined" && item.file) {
        let code = "";
        if (typeof item.value !== "undefined") {
          code = item.value();
        }

        dataZip = zip.file(item.name, code);
      }

      return dataZip;
    });
