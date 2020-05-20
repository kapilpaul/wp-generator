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
