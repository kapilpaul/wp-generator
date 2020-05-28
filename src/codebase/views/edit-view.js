import { tableInputFieldsHelper } from "./new-view";
/**
 *
 * @param {*} data
 * @param {*} settings
 * @param {*} table
 */
export const editViewCode = (data, settings, table) => {
  let code = `<div class="wrap">
    <h1><?php _e( 'Edit ${settings.singularName}', '${
    data.textDomain
  }' ); ?></h1>

    <?php if ( isset( $_GET['${settings.singularName}-updated'] ) ) { ?>
        <div class="notice notice-success">
            <p><?php _e( '${
              settings.singularName
            } has been updated successfully!', '${data.textDomain}' ); ?></p>
        </div>
    <?php } ?>

    <form action="" method="post">
        <table class="form-table">
            <tbody>
                ${tableInputFieldsHelper(
                  table.fields,
                  data.textDomain,
                  settings.singularName,
                  true
                )}
            </tbody>
        </table>

        <input type="hidden" name="id" value="<?php echo esc_attr( $${
          settings.singularName
        }->id ); ?>">

        <?php wp_nonce_field( '${settings.nonceKey}' ); ?>
        <?php submit_button( __( '${settings.updateButtonText}', '${
    data.textDomain
  }' ), 'primary', '${settings.submitName}' ); ?>
    </form>
</div>`;

  return code;
};
