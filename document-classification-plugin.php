<?php
/**
 * Plugin Name: Document Classification Plugin
 * Plugin URI: https://example.com/document-classification-plugin
 * Description: AI-powered document classification system with JetFormBuilder integration for WordPress
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * Text Domain: document-classification-plugin
 * License: GPL-2.0+
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define plugin constants
define('DOCCLASS_VERSION', '1.0.0');
define('DOCCLASS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DOCCLASS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * The code that runs during plugin activation.
 */
function activate_document_classification_plugin() {
    // Create necessary database tables
    // Initialize plugin settings
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_document_classification_plugin() {
    // Clean up if necessary
}

register_activation_hook(__FILE__, 'activate_document_classification_plugin');
register_deactivation_hook(__FILE__, 'deactivate_document_classification_plugin');

/**
 * Enqueue scripts and styles.
 */
function docclass_enqueue_scripts() {
    wp_enqueue_style('docclass-style', DOCCLASS_PLUGIN_URL . 'dist/index.css', array(), DOCCLASS_VERSION);
    wp_enqueue_script('docclass-script', DOCCLASS_PLUGIN_URL . 'dist/index.js', array('jquery'), DOCCLASS_VERSION, true);
    
    // Localize script with necessary data
    wp_localize_script('docclass-script', 'docClassData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('docclass-nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'docclass_enqueue_scripts');

/**
 * Register admin menu.
 */
function docclass_admin_menu() {
    add_menu_page(
        'Document Classification', 
        'Doc Classification', 
        'manage_options', 
        'document-classification', 
        'docclass_admin_page', 
        'dashicons-media-document', 
        30
    );
    
    add_submenu_page(
        'document-classification',
        'Document Types',
        'Document Types',
        'manage_options',
        'document-classification-types',
        'docclass_document_types_page'
    );
    
    add_submenu_page(
        'document-classification',
        'Training Documents',
        'Training Documents',
        'manage_options',
        'document-classification-training',
        'docclass_training_documents_page'
    );
    
    add_submenu_page(
        'document-classification',
        'Classification Results',
        'Results',
        'manage_options',
        'document-classification-results',
        'docclass_results_page'
    );
}
add_action('admin_menu', 'docclass_admin_menu');

/**
 * Admin page callback functions
 */
function docclass_admin_page() {
    echo '<div class="wrap"><h1>Document Classification Plugin</h1>';
    echo '<div id="docclass-admin-dashboard"></div></div>';
}

function docclass_document_types_page() {
    echo '<div class="wrap"><h1>Document Types</h1>';
    echo '<div id="docclass-document-types"></div></div>';
}

function docclass_training_documents_page() {
    echo '<div class="wrap"><h1>Training Documents</h1>';
    echo '<div id="docclass-training-documents"></div></div>';
}

function docclass_results_page() {
    echo '<div class="wrap"><h1>Classification Results</h1>';
    echo '<div id="docclass-results"></div></div>';
}

/**
 * Register JetFormBuilder custom block
 */
function docclass_register_blocks() {
    if (function_exists('jet_form_builder')) {
        // Register custom block for JetFormBuilder
        // This would be implemented to connect with the React components
    }
}
add_action('init', 'docclass_register_blocks');

/**
 * AJAX handlers for the plugin
 */
function docclass_handle_document_upload() {
    // Check nonce for security
    check_ajax_referer('docclass-nonce', 'nonce');
    
    // Handle document upload logic
    // Process with AI classification
    
    wp_send_json_success(array('message' => 'Document processed successfully'));
}
add_action('wp_ajax_docclass_upload_document', 'docclass_handle_document_upload');
add_action('wp_ajax_nopriv_docclass_upload_document', 'docclass_handle_document_upload');

// Include additional files
require_once DOCCLASS_PLUGIN_DIR . 'includes/class-document-type-manager.php';
require_once DOCCLASS_PLUGIN_DIR . 'includes/class-training-document-manager.php';
require_once DOCCLASS_PLUGIN_DIR . 'includes/class-classification-engine.php';
