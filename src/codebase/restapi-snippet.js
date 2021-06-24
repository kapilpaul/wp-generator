const permissionCheck = (permissionType) => {
  let code = ``;

  if (
    typeof permissionType === "undefined" ||
    permissionType === "undefined" ||
    permissionType === ""
  ) {
    code = `return true;`;
  } else {
    code = `if ( current_user_can( '${permissionType}' ) ) {
            return true;
        }

        return false;`;
  }

  return code;
};

/**
 * edit permission snippets
 * @param {*} permissionType
 */
const editPermission = (permissionType, singularName) => {
  let code = ``;

  if (typeof permissionType !== "undefined" && permissionType !== "") {
    code = `if ( ! current_user_can( '${permissionType}' ) ) {
            return false;
        }
        
        `;
  }

  code += `$${singularName} = $this->get_${singularName}( $request['id'] );

        if ( is_wp_error( $${singularName} ) ) {
            return $${singularName};
        }

        return true;`;

  return code;
};

/**
 * prepare item for database snippet
 * @param {*} tableFields
 */
const prepare_item_for_database = (schemaFields) => {
  let prepareFields = ``;

  schemaFields
    .filter((item) => {
      return item.propertyKey && item.type && !item.readonly;
    })
    .map((item) => {
      prepareFields += `
        if (isset($request["${item.propertyKey}"])) {
            $prepared["${item.propertyKey}"] = $request["${item.propertyKey}"];
        }\n`;
    });

  return prepareFields;
};

/**
 * prepare item for response
 * @param {*} schemaFields
 */
const prepare_item_schema_and_response = (schemaFields) => {
  let item_schema = ``;
  let prepare_response = ``;

  schemaFields
    .filter((item) => {
      return item.propertyKey && item.type;
    })
    .map((item) => {
      let type = item.type === "integer" ? "(int) " : "";

      prepare_response += `
        if ( in_array( '${item.propertyKey}', $fields, true ) ) {
            $data['${item.propertyKey}'] = ${type}$item->${item.propertyKey};
        }\n`;

      item_schema += singleItemSchema(item);
    });

  return { response: prepare_response, schema: item_schema.trim() };
};

/**
 * single item schema generate
 * @param {*} item
 */
const singleItemSchema = (item) => {
  let item_schema = ``;
  let readonly = ``;
  let required = ``;
  let sanitize = ``;
  let format = ``;
  let indent = `                    `;

  let context =
    " " +
    `'${item.context
      .split(",")
      .map((i) => i.trim())
      .join("', '")}'` +
    " ";

  if (item.readonly) {
    readonly = `${indent}'readonly'    => true,\n`;
  }

  if (item.required) {
    required = `${indent}'required'    => true,\n`;
  }

  if (item.sanitize) {
    sanitize = `${indent}'arg_options' => [
                        'sanitize_callback' => 'sanitize_text_field',
                    ],`;
  }

  if (item.format !== "") {
    format = `${indent}'format'     => '${item.format}',\n`;
  }

  item_schema = `                '${item.propertyKey}' => [
                    'description' => __( '${item.description}' ),
                    'type'        => '${item.type}',
                    'context'     => [ ${context} ],
${format}${readonly}${required}${sanitize}
                ],\n`;

  return item_schema;
};

/**
 *
 * @param {*} data
 * @param {*} restApiData
 * @param {*} settings
 */
export const restapiSnippet = (data, restApiData, settings, singleRestApi) => {
  let createPermissionCheck;
  let updatePermissionCheck;
  let deletePermissionCheck;

  let readPermissionCheck = permissionCheck(restApiData.readPermission);

  createPermissionCheck =
    restApiData.readPermission === restApiData.createPermission
      ? `return $this->get_items_permissions_check( $request );`
      : permissionCheck(restApiData.createPermission);

  let editPermissionCheck = editPermission(
    restApiData.readPermission,
    settings.singularName
  );

  updatePermissionCheck =
    restApiData.readPermission === restApiData.updatePermission
      ? `return $this->get_item_permissions_check( $request );`
      : (updatePermissionCheck = permissionCheck(restApiData.updatePermission));

  deletePermissionCheck =
    restApiData.readPermission === restApiData.deletePermission
      ? `return $this->get_item_permissions_check( $request );`
      : permissionCheck(restApiData.deletePermission);

  let prepareItems = prepare_item_schema_and_response(restApiData.schemaFields);
  let namespace = singleRestApi
    ? data.baseNamespace
    : `${data.baseNamespace}\\API`;

  let code = `<?php
/**
 * ${restApiData.className} Class
 * 
 * @package ${namespace}\\${restApiData.className}
 */

namespace ${namespace};

use WP_REST_Controller;
use WP_REST_Server;
use WP_Error;

/**
 * ${restApiData.className} Class
 */
class ${restApiData.className} extends WP_REST_Controller {

    /**
     * Initialize the class
     * 
     * @since ${data.version}
     */
    public function __construct() {
        $this->namespace = '${restApiData.namespace}';
        $this->rest_base = '${restApiData.restbase}';
    }

    /**
     * Registers the routes for the objects of the controller.
     * 
     * @since ${data.version}
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'get_items_permissions_check' ],
                    'args'                => $this->get_collection_params(),
                ],
                [
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'create_item_permissions_check' ],
                    'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
                ],
                'schema' => [ $this, 'get_item_schema' ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\\d]+)',
            [
                'args'   => [
                    'id' => [
                        'description' => __( 'Unique identifier for the object.' ),
                        'type'        => 'integer',
                    ],
                ],
                [
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'get_item_permissions_check' ],
                    'args'                => [
                        'context' => $this->get_context_param( [ 'default' => 'view' ] ),
                    ],
                ],
                [
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'update_item_permissions_check' ],
                    'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
                ],
                [
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_item' ],
                    'permission_callback' => [ $this, 'delete_item_permissions_check' ],
                ],
                'schema' => [ $this, 'get_item_schema' ],
            ]
        );
    }

    /**
     * Checks if a given request has access to read ${settings.pluralName}.
     *
     * @param  \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return boolean
     */
    public function get_items_permissions_check( $request ) {
        ${readPermissionCheck}
    }

    /**
     * Retrieves a list of ${settings.singularName} items.
     *
     * @param  \\WP_Rest_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Rest_Response|WP_Error
     */
    public function get_items( $request ) {
        $args = [];
        $params = $this->get_collection_params();

        foreach ( $params as $key => $value ) {
            if ( isset( $request[ $key ] ) ) {
                $args[ $key ] = $request[ $key ];
            }
        }

        // change 'per_page' to 'number'
        $args['number'] = $args['per_page'];
        $args['offset'] = $args['number'] * ( $args['page'] - 1 );

        // unset others
        unset( $args['per_page'] );
        unset( $args['page'] );

        $data     = [];
        $${settings.pluralName} = ${data.functionPrefix}_get_${
    settings.pluralName
  }( $args );

        foreach ( $${settings.pluralName} as $${settings.singularName} ) {
            $response = $this->prepare_item_for_response( $${
              settings.singularName
            }, $request );
            $data[]   = $this->prepare_response_for_collection( $response );
        }

        $total     = ${data.functionPrefix}_${settings.singularName}_count();
        $max_pages = ceil( $total / (int) $args['number'] );

        $response = rest_ensure_response( $data );

        $response->header( 'X-WP-Total', (int) $total );
        $response->header( 'X-WP-TotalPages', (int) $max_pages );

        return $response;
    }

    /**
     * Get the ${settings.singularName}, if the ID is valid.
     *
     * @param int $id Supplied ID.
     * 
     * @since ${data.version}
     *
     * @return Object|\\WP_Error
     */
    protected function get_${settings.singularName}( $id ) {
        $${settings.singularName} = ${data.functionPrefix}_get_${
    settings.singularName
  }( $id );

        if ( ! $${settings.singularName} ) {
            return new WP_Error(
                'rest_${settings.singularName}_invalid_id',
                __( 'Invalid ${settings.singularName} ID.' ),
                [ 'status' => 404 ]
            );
        }

        return $${settings.singularName};
    }

    /**
     * Checks if a given request has access to get a specific item.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|bool
     */
    public function get_item_permissions_check( $request ) {
        ${editPermissionCheck}
    }

    /**
     * Retrieves one item from the collection.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|\\WP_REST_Response
     */
    public function get_item( $request ) {
        $${settings.singularName} = $this->get_${
    settings.singularName
  }( $request['id'] );

        $response = $this->prepare_item_for_response( $${
          settings.singularName
        }, $request );
        $response = rest_ensure_response( $response );

        return $response;
    }

    /**
     * Checks if a given request has access to create items.
     *
     * @param WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return WP_Error|bool
     */
    public function create_item_permissions_check( $request ) {
        ${createPermissionCheck}
    }

    /**
     * Creates one item from the collection.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|WP_REST_Response
     */
    public function create_item( $request ) {
        $${
          settings.singularName
        } = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $${settings.singularName} ) ) {
            return $${settings.singularName};
        }

        $${settings.singularName}_id = ${data.functionPrefix}_insert_${
    settings.singularName
  }( $${settings.singularName} );

        if ( is_wp_error( $${settings.singularName}_id ) ) {
            $${settings.singularName}_id->add_data( [ 'status' => 400 ] );

            return $${settings.singularName}_id;
        }

        $${settings.singularName} = $this->get_${settings.singularName}( $${
    settings.singularName
  }_id );
        $response = $this->prepare_item_for_response( $${
          settings.singularName
        }, $request );

        $response->set_status( 201 );
        $response->header( 'Location', rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->rest_base, $${
          settings.singularName
        }_id ) ) );

        return rest_ensure_response( $response );
    }

    /**
     * Checks if a given request has access to update a specific item.
     *
     * @param \\WP_REST_Request $request Full data about the request.
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|bool
     */
    public function update_item_permissions_check( $request ) {
        ${updatePermissionCheck}
    }

    /**
     * Updates one item from the collection.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|\\WP_REST_Response
     */
    public function update_item( $request ) {
        $${settings.singularName}  = $this->get_${
    settings.singularName
  }( $request['id'] );
        $prepared = $this->prepare_item_for_database( $request );

        $prepared = array_merge( (array) $${settings.singularName}, $prepared );

        $updated = ${data.functionPrefix}_insert_${
    settings.singularName
  }( $prepared );

        if ( ! $updated ) {
            return new WP_Error(
                'rest_not_updated',
                __( 'Sorry, the ${
                  settings.singularName
                } could not be updated.' ),
                [ 'status' => 400 ]
            );
        }

        $${settings.singularName}  = $this->get_${
    settings.singularName
  }( $request['id'] );
        $response = $this->prepare_item_for_response( $${
          settings.singularName
        }, $request );

        return rest_ensure_response( $response );
    }

    /**
     * Checks if a given request has access to delete a specific item.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|bool
     */
    public function delete_item_permissions_check( $request ) {
        ${deletePermissionCheck}
    }

    /**
     * Deletes one item from the collection.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|WP_REST_Response
     */
    public function delete_item( $request ) {
        $${settings.singularName}  = $this->get_${
    settings.singularName
  }( $request['id'] );
        $previous = $this->prepare_item_for_response( $${
          settings.singularName
        }, $request );

        $deleted = ${data.functionPrefix}_delete_${
    settings.singularName
  }( $request['id'] );

        if ( ! $deleted ) {
            return new WP_Error(
                'rest_not_deleted',
                __( 'Sorry, the ${
                  settings.singularName
                } could not be deleted.' ),
                [ 'status' => 400 ]
            );
        }

        $data = [
            'deleted'  => true,
            'previous' => $previous->get_data(),
        ];

        $response = rest_ensure_response( $data );

        return $data;
    }

    /**
     * Prepares one item for create or update operation.
     *
     * @param \\WP_REST_Request $request
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|object
     */
    protected function prepare_item_for_database( $request ) {
        $prepared = [];
        ${prepare_item_for_database(restApiData.schemaFields)}
        return $prepared;
    }

    /**
     * Prepares the item for the REST response.
     *
     * @param mixed           $item    WordPress representation of the item.
     * @param \\WP_REST_Request $request Request object.
     * 
     * @since ${data.version}
     *
     * @return \\WP_Error|WP_REST_Response
     */
    public function prepare_item_for_response( $item, $request ) {
        $data   = [];
        $fields = $this->get_fields_for_response( $request );
        ${prepareItems.response}
        $context = ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data    = $this->filter_response_by_context( $data, $context );

        $response = rest_ensure_response( $data );
        $response->add_links( $this->prepare_links( $item ) );

        return $response;
    }

    /**
     * Prepares links for the request.
     *
     * @param \\WP_Post $post Post object.
     * 
     * @since ${data.version}
     *
     * @return array Links for the given post.
     */
    protected function prepare_links( $item ) {
        $base = sprintf( '%s/%s', $this->namespace, $this->rest_base );

        $links = [
            'self' => [
                'href' => rest_url( trailingslashit( $base ) . $item->id ),
            ],
            'collection' => [
                'href' => rest_url( $base ),
            ],
        ];

        return $links;
    }

    /**
     * Retrieves the ${settings.singularName} schema, conforming to JSON Schema.
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }

        $schema = [
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => '${settings.singularName}',
            'type'       => 'object',
            'properties' => [
                ${prepareItems.schema}
            ]
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }

    /**
     * Retrieves the query params for collections.
     * 
     * @since ${data.version}
     *
     * @return array
     */
    public function get_collection_params() {
        $params = parent::get_collection_params();

        unset( $params['search'] );

        return $params;
    }
}
`;

  return code;
};
