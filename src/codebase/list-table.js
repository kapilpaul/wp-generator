import { validateTableSetting } from "./fields";

// plugin version.
var version = '';

/**
 * filter column by table fields
 * @param {*} tableFields
 * @param {*} textDomain
 */
const filterColumn = (tableFields, textDomain) => {
  let columns = ``;
  let linkActions = ``;
  let sortableColumns = `[`;
  let indent = `            `;

  tableFields
    .filter((item) => {
      return (
        item.name && item.type && item.showInListTable && !item.primary_key
      );
    })
    .map((item) => {
      columns += `'${item.name}'       => __( '${item.listTableColumnName}', '${textDomain}' ),\n${indent}`;

      if (item.sortableInListTable) {
        sortableColumns += `\n${indent}'${item.name}'       => [ '${item.name}', true ],`;
      }

      if (item.linkActionInListTable) {
        linkActions += linkActionCode(item.name);
      }
    });

  //sortable array for blank
  sortableColumns += sortableColumns !== "[" ? `\n        ]` : `]`;

  return {
    columns: columns.trim(),
    sortableColumns: sortableColumns.trim(),
    linkActions: linkActions.trim(),
  };
};

const linkActionCode = (name) => {
  let code = `/**
     * Render the "${name}" column
     *
     * @param  object $item
     * 
     * @since ${version}
     *
     * @return string
     */
    public function column_${name}( $item ) {
        return $this->get_column_actions($item, '${name}');
    }
    
    `;

  return code;
};

/**
 * list table code generator
 * @param {*} fileClassName
 * @param {*} data
 * @param {*} table
 */
export const listTableCode = (fileClassName, data, table) => {
  let settings;
  let filterColumnData;
  version = data.version;

  if (typeof table.settings !== "undefined" && table.settings.adminPanel) {
    settings = validateTableSetting(table.settings);
    filterColumnData = filterColumn(table.fields, data.textDomain);
  }

  let code = `<?php
/**
 * List Table Class
 * 
 * @package ${data.baseNamespace}\\Admin\\${fileClassName}
 */

namespace ${data.baseNamespace}\\Admin;

if ( ! class_exists( 'WP_List_Table' ) ) {
    require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

/**
 * List Table Class
 */
class ${fileClassName} extends \\WP_List_Table {

    /**
     * ${fileClassName} constructor
     * 
     * @since ${data.version}
     * 
     * @return void
     */
    public function __construct() {
        parent::__construct( [
            'singular' => '${settings.singularName}',
            'plural'   => '${settings.pluralName}',
            'ajax'     => false
        ] );
    }

    /**
     * Message to show if no designation found
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function no_items() {
        _e( '${settings.noItemFoundText}', '${data.textDomain}' );
    }

    /**
     * Get the column names
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_columns() {
        return [
            'cb'         => '<input type="checkbox" />',
            ${filterColumnData.columns}
        ];
    }

    /**
     * Get sortable columns
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_sortable_columns() {
        $sortable_columns = ${filterColumnData.sortableColumns};

        return $sortable_columns;
    }

    /**
     * Set the bulk actions
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_bulk_actions() {
        $actions = array(
            'trash'  => __( 'Move to Trash', '${data.textDomain}' ),
        );

        return $actions;
    }

    /**
     * Default column values
     *
     * @param  object $item
     * @param  string $column_name
     * 
     * @since ${data.version}
     *
     * @return string
     */
    protected function column_default( $item, $column_name ) {

        switch ( $column_name ) {
            default:
                return isset( $item->$column_name ) ? $item->$column_name : '';
        }
    }

    ${filterColumnData.linkActions}

    /**
     * get column actions 
     * 
     * @param object $item
     * 
     * @since ${data.version}
     * 
     * @return string 
     */
    public function get_column_actions( $item, $column_name ) {
        $actions = [];

        $actions['edit']   = sprintf( '<a href="%s" title="%s">%s</a>', admin_url( 'admin.php?page=${settings.pageSlug}&action=edit&id=' . $item->id ), $item->id, __( 'Edit', '${data.textDomain}' ), __( 'Edit', '${data.textDomain}' ) );
        $actions['delete'] = sprintf( '<a href="#" class="submitdelete" data-id="%s">%s</a>', $item->id, __( 'Delete', '${data.textDomain}' ) );

        return sprintf(
            '<a href="%1$s"><strong>%2$s</strong></a> %3$s', admin_url( 'admin.php?page=${data.textDomain}&action=view&id' . $item->id ), $item->$column_name, $this->row_actions( $actions )
        );
    }

    /**
     * Render the "cb" column
     *
     * @param  object $item
     * 
     * @since ${data.version}
     *
     * @return string
     */
    protected function column_cb( $item ) {
        return sprintf(
            '<input type="checkbox" name="${settings.singularName}_id[]" value="%d" />', $item->id
        );
    }

    /**
     * Prepare the ${settings.singularName} items
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function prepare_items() {
        $column   = $this->get_columns();
        $hidden   = [];
        $sortable = $this->get_sortable_columns();

        $this->_column_headers = [ $column, $hidden, $sortable ];

        $per_page     = ${settings.perPage};
        $current_page = $this->get_pagenum();
        $offset       = ( $current_page - 1 ) * $per_page;

        $args = [
            'number' => $per_page,
            'offset' => $offset,
        ];

        if ( isset( $_REQUEST['orderby'] ) && isset( $_REQUEST['order'] ) ) {
            $args['orderby'] = $_REQUEST['orderby'];
            $args['order']   = $_REQUEST['order'] ;
        }

        $this->items = ${data.functionPrefix}_get_${settings.pluralName}( $args );

        $this->set_pagination_args( [
            'total_items' => ${data.functionPrefix}_${settings.singularName}_count(),
            'per_page'    => $per_page
        ] );
    }
}`;

  return code;
};
