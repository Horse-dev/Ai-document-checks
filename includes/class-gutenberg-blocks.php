<?php
/**
 * Gutenberg Blocks Registration
 *
 * @package DocumentClassificationPlugin
 */

if (!defined('WPINC')) {
    die;
}

class Gutenberg_Blocks {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'register_blocks'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }
    
    /**
     * Register custom blocks
     */
    public function register_blocks() {
        // Check if Gutenberg is active
        if (!function_exists('register_block_type')) {
            return;
        }
        
        // Register the document upload block
        register_block_type('document-classification/document-upload', array(
            'editor_script' => 'docclass-blocks',
            'editor_style' => 'docclass-blocks-editor',
            'style' => 'docclass-blocks-style',
            'render_callback' => array($this, 'render_document_upload_block'),
            'attributes' => array(
                'blockId' => array(
                    'type' => 'string',
                    'default' => '',
                ),
                'acceptedFileTypes' => array(
                    'type' => 'array',
                    'default' => array('.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'),
                ),
                'maxFileSize' => array(
                    'type' => 'number',
                    'default' => 10,
                ),
            ),
        ));
    }
    
    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets() {
        // Enqueue the built JS for the block editor
        wp_enqueue_script(
            'docclass-blocks',
            DOCCLASS_PLUGIN_URL . 'dist/blocks.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
            DOCCLASS_VERSION,
            true
        );
        
        // Enqueue editor styles
        wp_enqueue_style(
            'docclass-blocks-editor',
            DOCCLASS_PLUGIN_URL . 'dist/blocks-editor.css',
            array('wp-edit-blocks'),
            DOCCLASS_VERSION
        );
        
        // Pass data to the block editor
        wp_localize_script('docclass-blocks', 'docClassData', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('docclass-nonce'),
            'document_types' => $this->get_document_types(),
        ));
    }
    
    /**
     * Render the document upload block on the frontend
     */
    public function render_document_upload_block($attributes) {
        // Enqueue frontend styles and scripts
        wp_enqueue_style('docclass-style');
        wp_enqueue_script('docclass-script');
        
        // Generate a unique ID for this block instance
        $block_id = !empty($attributes['blockId']) ? $attributes['blockId'] : 'docclass-upload-' . uniqid();
        
        // Start output buffering
        ob_start();
        
        // Output the container for the React component
        echo '<div id="' . esc_attr($block_id) . '" class="docclass-document-upload" data-accepted-types="' . esc_attr(json_encode($attributes['acceptedFileTypes'])) . '" data-max-size="' . esc_attr($attributes['maxFileSize']) . '"></div>';
        
        // Return the buffered content
        return ob_get_clean();
    }
    
    /**
     * Get document types for the block editor
     */
    private function get_document_types() {
        // This would normally fetch from the database
        // For now, return some sample types
        return array(
            'Birth Certificate',
            'Driver\'s License',
            'Passport',
            'Tax Return',
            'Medical Record',
        );
    }
}

// Initialize the class
new Gutenberg_Blocks();
