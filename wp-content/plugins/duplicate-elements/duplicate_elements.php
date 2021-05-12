<?php
/********************************************
 * Plugin Name:  Duplicate Wordpress Elements
 * Plugin URI:   https://ziscom.today/2015/03/10/duplicate-wordpress-elements-plugin-available-to-download/
 * Description:  Duplicate wordpress elements such as Page, Post, Template, Woocommerce product pages, Page builder elements (many famous builders supported), etc. Wherever there is 'Duplicate' option, you can duplicate it along with the saved content. 
 * Version:      1.1
 * Author:       Ziscom
 * Author URI:   https://ziscom.today
 * License:      GPL2 or later
 ********************************************/

function dwe_element_duplicate(){
	global $wpdb;	
	if (! ( isset( $_GET['post']) || isset( $_POST['post'])  || ( isset($_REQUEST['action']) && 'element_duplicate' == $_REQUEST['action'] ) ) ) {
		wp_die('No post to duplicate has been supplied!');
	}
	
	/*
	 * Nonce verification
	 */
	if ( !isset( $_GET['clone_nonce'] ) || !wp_verify_nonce( $_GET['clone_nonce'], basename( __FILE__ ) ) )
		return;
 
	/*
	 * Original element id
	 */
	$post_id = (isset($_GET['post']) ? absint( $_GET['post'] ) : absint( $_POST['post'] ) );
	/*
	 * Original element content
	 */
	$post = get_post( $post_id );
 
	/*
	 * The author of the new element is the current user
	 */
	$current_user = wp_get_current_user();
	$new_post_author = $current_user->ID;
 
	/*
	 * If the element contains content, it also duplicates
	 */
	if (isset( $post ) && $post != null) {
 
		$args = array(
			'comment_status' => $post->comment_status,
			'ping_status'    => $post->ping_status,
			'post_author'    => $new_post_author,
			'post_content'   => $post->post_content,
			'post_excerpt'   => $post->post_excerpt,
			'post_name'      => $post->post_name,
			'post_parent'    => $post->post_parent,
			'post_password'  => $post->post_password,
			'post_status'    => 'draft',
			'post_title'     => $post->post_title,
			'post_type'      => $post->post_type,
			'to_ping'        => $post->to_ping,
			'menu_order'     => $post->menu_order
		);
 
		/*
		 * Inserts the new element using via wp_insert_post()
		 */
		$new_post_id = wp_insert_post( $args );
 
		/*
		 * Also leads to duplicate element taxonomies
		 */
		$taxonomies = get_object_taxonomies($post->post_type); // Returns an array of taxonomies
		foreach ($taxonomies as $taxonomy) {
			$post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
			wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
		}
 
		/*
		 * Structured Query Language
		 */
		$post_meta_infos = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=$post_id");
		if (count($post_meta_infos)!=0) {
			$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
			foreach ($post_meta_infos as $meta_info) {
				$meta_key = $meta_info->meta_key;
				$meta_value = addslashes($meta_info->meta_value);
				$sql_query_sel[]= "SELECT $new_post_id, '$meta_key', '$meta_value'";
			}
			$sql_query.= implode(" UNION ALL ", $sql_query_sel);
			$wpdb->query($sql_query);
		}
 
 
		/*
		 * Redirect to the element editor
		 */
		wp_redirect( admin_url( 'post.php?action=edit&post=' . $new_post_id ) );
		exit;
	} else {
		wp_die('The element could not be found: ' . $post_id);
	}
}

add_action( 'admin_action_element_duplicate', 'dwe_element_duplicate' );
 
/*
 * Add the button "duplicate" in the element listing
 */

function dwe_element_duplicate_link( $actions, $post ) {
	if (current_user_can('edit_posts')) {			
		$actions['duplicate'] = '<a href="' . wp_nonce_url('admin.php?action=element_duplicate&post=' . $post->ID, basename(__FILE__), 'clone_nonce' ) . '" title="Duplicate!" rel="permalink">Duplicate</a>';
	}
	return $actions;
}
 
add_filter( 'post_row_actions', 'dwe_element_duplicate_link', 10, 2 ); // For posts
add_filter( 'page_row_actions', 'dwe_element_duplicate_link', 10, 2 ); // For pages

?>