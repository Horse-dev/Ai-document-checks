<?php
/**
 * Document Type Manager Class
 *
 * @package DocumentClassificationPlugin
 */

if (!defined('WPINC')) {
    die;
}

class Document_Type_Manager {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_ajax_docclass_create_document_type', array($this, 'create_document_type'));
        add_action('wp_ajax_docclass_update_document_type', array($this, 'update_document_type'));
        add_action('wp_ajax_docclass_delete_document_type', array($this, 'delete_document_type'));
        add_action('wp_ajax_docclass_get_document_types', array($this, 'get_document_types'));
    }
    
    /**
     * Create a new document type
     */
    public function create_document_type() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }
        
        $name = sanitize_text_field($_POST['name']);
        $description = sanitize_textarea_field($_POST['description']);
        $keywords = array_map('sanitize_text_field', $_POST['keywords']);
        
        // Save to database
        // This is a placeholder for actual database operations
        
        wp_send_json_success(array(
            'message' => 'Document type created successfully',
            'document_type' => array(
                'id' => 1, // This would be the actual ID from the database
                'name' => $name,
                'description' => $description,
                'keywords' => $keywords,
                'created_at' => current_time('mysql'),
                'document_count' => 0
            )
        ));
    }
    
    /**
     * Update an existing document type
     */
    public function update_document_type() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }
        
        $id = intval($_POST['id']);
        $name = sanitize_text_field($_POST['name']);
        $description = sanitize_textarea_field($_POST['description']);
        $keywords = array_map('sanitize_text_field', $_POST['keywords']);
        
        // Update in database
        // This is a placeholder for actual database operations
        
        wp_send_json_success(array(
            'message' => 'Document type updated successfully',
            'document_type' => array(
                'id' => $id,
                'name' => $name,
                'description' => $description,
                'keywords' => $keywords,
                'created_at' => current_time('mysql'),
                'document_count' => 0 // This would be the actual count from the database
            )
        ));
    }
    
    /**
     * Delete a document type
     */
    public function delete_document_type() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }
        
        $id = intval($_POST['id']);
        
        // Delete from database
        // This is a placeholder for actual database operations
        
        wp_send_json_success(array('message' => 'Document type deleted successfully'));
    }
    
    /**
     * Get all document types
     */
    public function get_document_types() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        // Get from database
        // This is a placeholder for actual database operations
        
        $document_types = array(
            array(
                'id' => '1',
                'name' => 'Birth Certificate',
                'description' => 'Official document certifying the details of a person\'s birth',
                'keywords' => array('birth', 'certificate', 'date of birth', 'name', 'parents'),
                'created_at' => '2023-06-15',
                'document_count' => 42,
            ),
            array(
                'id' => '2',
                'name' => 'Driver\'s License',
                'description' => 'Official document permitting a person to drive a motor vehicle',
                'keywords' => array('license', 'driver', 'ID', 'expiration', 'state'),
                'created_at' => '2023-07-22',
                'document_count' => 78,
            ),
            array(
                'id' => '3',
                'name' => 'Passport',
                'description' => 'Official document issued by a government, certifying the holder\'s identity and citizenship',
                'keywords' => array('passport', 'travel', 'citizenship', 'expiration', 'photo'),
                'created_at' => '2023-08-05',
                'document_count' => 36,
            ),
        );
        
        wp_send_json_success(array('document_types' => $document_types));
    }
}

// Initialize the class
new Document_Type_Manager();
