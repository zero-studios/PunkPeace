<?php
// get main nav from WordPress
$primary = array(
	'theme_location'  => '',
	'menu'            => 'Header Menu',
	'container'       => 'nav',
	'container_class' => 'group',
	'container_id'    => 'main-navigation',
	'menu_class'      => '',
	'menu_id'         => '',
	'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
);
?>

<?php wp_nav_menu($primary); ?>