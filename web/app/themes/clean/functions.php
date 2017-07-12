<?php
$uri = explode("?", $_SERVER["REQUEST_URI"]);
$uri = $uri[0];
$tokens = explode("/", $uri);
/*==============================================================================
    SETUP FUNCTIONS
    -   Theme setup function.
================================================================================ */
function clean_setup(){
    // Switches default core markup for search form, comment form, and comments
    // to output valid HTML5.
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list'));
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'clean_setup');
/*==============================================================================
    ADD SVG SUPPORT TO MEDIA LIBRARY
================================================================================ */
function add_file_types_to_uploads($file_types){

    $new_filetypes = array();
    $new_filetypes['svg'] = 'image/svg+xml';
    $file_types = array_merge($file_types, $new_filetypes );

    return $file_types;
}
add_action('upload_mimes', 'add_file_types_to_uploads');
/*==============================================================================
    CLEAN TITLE
    -   This cleans up the wordpress title.
================================================================================ */
function clean_wp_title($title, $sep){
    global $paged, $page;
    if (is_feed())
        return $title;
    // Add the site name.
    $title .= get_bloginfo('name', 'display');
    $title = ucwords($title);
    // Add the site description for the home/front page.
    $site_description = get_bloginfo('description', 'display');
    if ($site_description && (is_home() || is_front_page()))
        $title = "$title $sep $site_description";
    // Add a page number if necessary.
    if ($paged >= 2 || $page >= 2)
        $title = "$title $sep " . sprintf(__('Page %s', 'clean'), max($paged, $page));
    return $title;
}
add_filter('wp_title', 'clean_wp_title', 10, 2);
/*==============================================================================
    REMOVE DASHBOARD WIDGETS
    -   Used to clean up the wordpress dashboard.
================================================================================ */
function remove_dashboard_widgets(){
    global $wp_meta_boxes;
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']); 
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
}
add_action('wp_dashboard_setup', 'remove_dashboard_widgets'); 
remove_action('welcome_panel', 'wp_welcome_panel');
/*==============================================================================
    REMOVE MENU ITEMS
    -   Used to hide WP menu items.
    -   Typically hiding larger access for production environments.
================================================================================ */
function remove_menu_items() {
    global $menu;
    //$restricted = array(__('Comments'), __('Appearance'), __('Plugins'), __('Tools'), __('Settings')); // Production
    $restricted = array(__('Comments'), __('Tools')); // Staging
    end ($menu);
    while (prev($menu)){
        $value = explode(' ',$menu[key($menu)][0]);
        if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){
            unset($menu[key($menu)]);
        }
    }
    // also remove original posts menu
    remove_menu_page('edit.php');
}
add_action('admin_menu', 'remove_menu_items');
// hide acf menu
//add_filter('acf/settings/show_admin', '__return_false');
/*==============================================================================
    CUSTOM REWRITES
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Very Important, if you create a custom post type (below), you MUST enter
    your new post type in the array below.
    
    This rewrites the base properly.
    
    Do not remove "post".
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
================================================================================ */
function fix_custom_rewrites($query){
    // Enter your post_types here
    $array = array(
        'post'
    );
    if (!$query->is_main_query())
        return;
    // 'name' will be set if post permalinks are just post_name, otherwise the page rule will match
    if (!empty($query->query['name']) || !empty($query->query['attachment'])){
        $query->set('post_type', $array);
    }
}
add_action('pre_get_posts', 'fix_custom_rewrites');
/*==============================================================================
    Setup post type
================================================================================ */
function add_register_post_types(){
    // Post Overwrite
    register_post_type(
        'post', // Name of post type
        array(
            'labels' => array( // Menu labels for post type
                'name'               => 'Posters',
                'singular_name'      => 'Poster',
                'name_admin_bar'     => 'Posters',
                'add_new_item'       => 'Add New Poster',
                'new_item'           => 'New Poster',
                'edit_item'          => 'Edit Poster',
                'view_item'          => 'View Poster',
                'all_items'          => 'All Posters',
                'search_items'       => 'Search Posters',
                'parent_item_colon'  => 'Parent Poster:',
                'not_found'          => 'No posters found',
                'not_found_in_trash' => 'No posters found in Trash',
            ),
            'public' => true,
            'exclude_from_search' => false,
            'menu_position' => 5,
            'rewrite' => array( // This is the slug for the post types, Ex: /example/example-post/
                'slug' => 'poster',
                'with_front' => true
            ),
            'supports' => array(
                'title',
                'author',
                'editor',
                'thumbnail'
            )
        )
    );
}
add_action('init', 'add_register_post_types');
/*==============================================================================
    REGISTER CUSTOM TAXONOMY
================================================================================ */
function create_my_taxonomies(){
    // Example Tag 
    /*
    register_taxonomy(
        'tag_name',
        array(
            'property'
        ),
        array(
            'labels' => array(
                'name' => 'Tag',
                'singular_name' => 'Tag',
                'add_new_item' => 'Add New Tag',
                'new_item_name' => 'New Tag'
            ),
            'show_ui' => true,
            'show_tagcloud' => true,
            'hierarchical' => true
        )
    ); */
}
add_action('init', 'create_my_taxonomies', 0);
/*==============================================================================
    SETUP GLOBAL OPTIONS PAGES
    -   For managing global settins
================================================================================ */
if(function_exists('acf_add_options_page')){

    acf_add_options_page(array(
        'page_title'    => 'Global Settings',
        'menu_title'    => 'Global Settings',
        'menu_slug'     => 'global-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
    
    /* acf_add_options_sub_page(array(
        'page_title'    => 'Sub Global Settings',
        'menu_title'    => 'Sub Settings',
        'parent_slug'   => 'global-settings',
    )); */
}
/*==============================================================================
	STYLES & SCRIPT ENQUEUE
	-	Setup your scripts and styles here if you're running a minify plugin.
================================================================================ */
function add_defer_attribute($tag, $handle) {
    if ( 'main' !== $handle )
        return $tag;
    return str_replace( ' src', ' defer="defer" src', $tag );
}
add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
function clean_enqueue(){
    // Register
    wp_register_script('main', get_template_directory_uri() . '/assets/js/main.js', array(), false, true);
    // Enqueue
    wp_enqueue_script('main');
}
add_action('wp_enqueue_scripts', 'clean_enqueue');
/*==============================================================================
	Disable WordPress bloat scripts in the Head
================================================================================ */
function disable_bloat_scripts(){
    remove_action( 'rest_api_init', 'wp_oembed_register_route' );
    remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );
    remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links' ); // Remove oembed discovery links
    remove_action( 'wp_head', 'wp_oembed_add_host_js' ); // Remove oEmbed-specific JavaScript from the front-end and back-end.
    remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
    remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
    remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
    remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
    remove_action( 'wp_head', 'index_rel_link' ); // index link
    remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
    remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
    remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post.
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 ); // Display relational links for the posts adjacent to the current post.
    remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action('init', 'disable_bloat_scripts', 9999);
?>