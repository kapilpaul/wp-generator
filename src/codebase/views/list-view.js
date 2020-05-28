/**
 * list view code snippet generator
 * @param {*} data
 * @param {*} table
 */
export const listViewCode = (data, settings) => {
  let code = `<div class="wrap">
    <h1 class="wp-heading-inline"><?php _e( '${settings.menuTitle}', '${data.textDomain}' ); ?></h1>

    <a href="<?php echo admin_url( 'admin.php?page=${settings.pageSlug}&action=new' ); ?>" class="page-title-action"><?php _e( 'Add New', '${data.textDomain}' ); ?></a>

    <?php if ( isset( $_GET['inserted'] ) ) { ?>
        <div class="notice notice-success">
            <p><?php _e( '${settings.singularName} has been added successfully!', '${data.textDomain}' ); ?></p>
        </div>
    <?php } ?>

    <?php if ( isset( $_GET['${settings.singularName}-deleted'] ) && $_GET['${settings.singularName}-deleted'] == 'true' ) { ?>
        <div class="notice notice-success">
            <p><?php _e( '${settings.singularName} has been deleted successfully!', '${data.textDomain}' ); ?></p>
        </div>
    <?php } ?>

    <form action="" method="post">
        <?php
        $table = new ${data.baseNamespace}\\Admin\\${settings.crudClassName}_List();
        $table->prepare_items();
        $table->search_box( 'search', 'search_id' );
        $table->display();
        ?>
    </form>
</div>`;

  return code;
};
