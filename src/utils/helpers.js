/**
 * make slug case from value
 *
 * @param {*} value
 * @param {*} separator
 *
 * @return string
 */
export const slug = (value, separator = "-") => {
  return value.toLowerCase().replace(/\s/g, separator);
};

/**
 * make titlecase from string
 * @param {*} value
 * @param {*} separator
 */
export const titleCase = (value, separator = "-") => {
  return value.replace(/(^|\s)\S/g, function(t) {
    return t.toUpperCase().replace(/\s/g, separator);
  });
};
