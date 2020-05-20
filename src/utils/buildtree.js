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
        data.icon = fileExt === "php" ? "fab fa-php" : "far fa-file";
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
        let code = "dsdsd";
        if (typeof item.value !== "undefined") {
          code = item.value();
        }

        dataZip = zip.file(item.name, code);
      }

      return dataZip;
    });
