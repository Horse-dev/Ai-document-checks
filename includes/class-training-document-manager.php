<?php
/**
 * Training Document Manager Class
 *
 * @package DocumentClassificationPlugin
 */

if (!defined('WPINC')) {
    die;
}

class Training_Document_Manager {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_ajax_docclass_upload_training_document', array($this, 'upload_training_document'));
        add_action('wp_ajax_docclass_delete_training_document', array($this, 'delete_training_document'));
        add_action('wp_ajax_docclass_get_training_documents', array($this, 'get_training_documents'));
    }
    
    /**
     * Upload a training document
     */
    public function upload_training_document() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }
        
        if (!isset($_FILES['document'])) {
            wp_send_json_error(array('message' => 'No file uploaded'));
        }
        
        $document_type = sanitize_text_field($_POST['document_type']);
        $keywords = array_map('sanitize_text_field', $_POST['keywords']);
        
        // Handle file upload
        $upload_dir = wp_upload_dir();
        $target_dir = $upload_dir['basedir'] . '/document-classification/training/';
        
        // Create directory if it doesn't exist
        if (!file_exists($target_dir)) {
            wp_mkdir_p($target_dir);
        }
        
        $file_name = sanitize_file_name($_FILES['document']['name']);
        $target_file = $target_dir . $file_name;
        
        // Move uploaded file
        if (move_uploaded_file($_FILES['document']['tmp_name'], $target_file)) {
            // Save to database
            // This is a placeholder for actual database operations
            
            wp_send_json_success(array(
                'message' => 'Training document uploaded successfully',
                'document' => array(
                    'id' => uniqid(),
                    'name' => $file_name,
                    'type' => $document_type,
                    'keywords' => $keywords,
                    'status' => 'complete',
                    'progress' => 100
                )
            ));
        } else {
            wp_send_json_error(array('message' => 'Failed to upload file'));
        }
    }
    
    /**
     * Delete a training document
     */
    public function delete_training_document() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied'));
        }
        
        $id = sanitize_text_field($_POST['id']);
        
        // Delete from database and file system
        // This is a placeholder for actual operations
        
        wp_send_json_success(array('message' => 'Training document deleted successfully'));
    }
    
    /**
     * Get all training documents
     */
    public function get_training_documents() {
        check_ajax_referer('docclass-nonce', 'nonce');
        
        // Get from database
        // This is a placeholder for actual database operations
        
        $documents = array(
            array(
                'id' => '1',
                'name' => 'birth-certificate-sample.pdf',
                'type' => 'Birth Certificate',
                'keywords' => array('birth', 'certificate', 'date of birth', 'name'),
                'status' => 'complete',
                'progress' => 100,
            ),
            array(
                'id' => '2',
                'name' => 'drivers-license-example.pdf',
                'type' => 'Driver License',
                'keywords' => array('license', 'driver', 'expiration', 'id number'),
                'status' => 'complete',
                'progress' => 100,
            ),
            array(
                'id' => '3',
                'name' => 'passport-sample.pdf',
                'type' => 'Passport',
                'keywords' => array('passport', 'nationality', 'expiration', 'number'),
                'status' => 'processing',
                'progress' => 65,
            ),
        );
        
        wp_send_json_success(array('documents' => $documents));
    }
}

// Initialize the class
new Training_Document_Manager();
