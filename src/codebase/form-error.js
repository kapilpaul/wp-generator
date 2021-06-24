export const formErrorSnippet = (data) => {
  let codes = `<?php
/**
 * Error handler trait
 * 
 * @package ${data.baseNamespace}\\Traits\\Form_Error
 */

namespace ${data.baseNamespace}\\Traits;

/**
 * Error handler trait
 */
trait Form_Error {

    /**
     * Holds the errors
     *
     * @var array
     * 
     * @since ${data.version}
     */
    public $errors = [];

    /**
     * Check if the form has error
     *
     * @param  string  $key
     * 
     * @since ${data.version}
     *
     * @return boolean
     */
    public function has_error( $key ) {
        return isset( $this->errors[ $key ] ) ? true : false;
    }

    /**
     * Get the error by key
     *
     * @param  key $key
     * 
     * @since ${data.version}
     *
     * @return string | false
     */
    public function get_error( $key ) {
        if ( isset( $this->errors[ $key ] ) ) {
            return $this->errors[ $key ];
        }

        return false;
    }
}
`;

  return codes;
};
