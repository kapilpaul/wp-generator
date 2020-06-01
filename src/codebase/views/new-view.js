const tableInputFields = (
  fields,
  textDomain,
  singularName = "",
  edit = false
) => {
  let inputs = ``;
  let indent = `                `;
  fields
    .filter((item) => {
      return item.name && item.type && item.showInCrudForm && !item.primary_key;
    })
    .map((item) => {
      inputs += `<tr class="row<?php echo $this->has_error( '${
        item.name
      }' ) ? ' form-invalid' : '' ;?>">
                    <th scope="row">
                        <label for="${item.name}"><?php _e( '${
        item.formInputLabel
      }', '${textDomain}' ); ?></label>
                    </th>
                    <td>
                        ${getInputCodeByType(
                          item,
                          textDomain,
                          singularName,
                          edit
                        ).trim()}

                        <?php if ( $this->has_error( '${item.name}' ) ) { ?>
                            <p class="description error"><?php echo $this->get_error( '${
                              item.name
                            }' ); ?></p>
                        <?php } ?>
                    </td>
                </tr>\n${indent}`;
    });

  return inputs.trim();
};

/**
 * get input code by type
 * @param {*} item
 * @param {*} textDomain
 */
const getInputCodeByType = (
  item,
  textDomain,
  singularName = "",
  edit = false
) => {
  let inputCode = ``;

  var value = edit
    ? `<?php echo esc_attr( $${singularName}->${item.name} ); ?>`
    : "";

  switch (item.formInputType) {
    case "text":
    case "number":
      inputCode = `<input type="${item.formInputType}" name="${
        item.name
      }" id="${
        item.name
      }" class="regular-text" placeholder="<?php echo esc_attr( '${
        item.formInputPlaceholder ? item.formInputPlaceholder : ""
      }', '${textDomain}' ); ?>" value="${value}" ${
        item.formInputRequired ? 'required="required"' : ""
      } />\n`;

      break;

    case "textarea":
      inputCode = `<textarea name="${item.name}" id="${
        item.name
      }" placeholder="<?php echo esc_attr( '${
        item.formInputPlaceholder ? item.formInputPlaceholder : ""
      }', '${textDomain}' ); ?>" rows="5" cols="30" ${
        item.formInputRequired ? 'required="required"' : ""
      }>${value}</textarea>`;
      break;

    case "checkbox":
      inputCode = `<label for="${item.name}"><input type="checkbox" name="${
        item.name
      }" id="${item.name}" <?php checked( ${singularName}->${
        item.name
      }, 'on' ); ?> ${
        item.formInputRequired ? 'required="required"' : ""
      } /> <?php _e( '', '${textDomain}' ); ?></label>`;
      break;

    case "dropdown":
      let options = ``;
      let indent = `                            `;

      if (item.formInputValues !== "") {
        item.formInputValues.split(",").map((i) => {
          let pair = i.split(":");

          value = edit
            ? `<?php selected( $${singularName}->${
                item.name
              }, '${pair[0].trim()}' ); ?>`
            : "";

          options += `<option value="${pair[0].trim()}" ${value}><?php echo __( '${pair[1].trim()}', '${textDomain}' ); ?></option>\n${indent}`;
        });
      }

      inputCode = `<select name="${item.name}" id="${item.name}" ${
        item.formInputRequired ? 'required="required"' : ""
      }>
                            ${options.trim()}
                        </select>`;

      return inputCode;
      break;
  }

  return inputCode;
};

/**
 * table input fields helper
 * @param {*} fields
 * @param {*} textDomain
 * @param {*} edit
 */
export const tableInputFieldsHelper = (
  fields,
  textDomain,
  singularName,
  edit
) => {
  return tableInputFields(fields, textDomain, singularName, edit);
};

/**
 *
 * @param {*} data
 * @param {*} settings
 * @param {*} table
 */
export const newViewCode = (data, settings, table) => {
  let code = `<div class="wrap">
    <h1><?php _e( 'New ${settings.singularName}', '${
    data.textDomain
  }' ); ?></h1>

    <form action="" method="post">
        <table class="form-table">
            <tbody>
                ${tableInputFields(table.fields, data.textDomain)}
            </tbody>
        </table>

        <?php wp_nonce_field( '${settings.nonceKey}' ); ?>
        <?php submit_button( __( '${settings.submitButtonText}', '${
    data.textDomain
  }' ), 'primary', '${settings.submitName}' ); ?>
    </form>
</div>`;

  return code;
};
