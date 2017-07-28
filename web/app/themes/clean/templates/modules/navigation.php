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
<?php
// get main nav from WordPress
$secondary = array(
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



<div id="primary-nav" class="group">
	<div id="nav-one">
		<?php wp_nav_menu($primary); ?>
	</div>
	<div id="logo"><h1><a href="/"><img src='/assets/images/logo_full.png' /></a></h1></div>
	<div id="nav-two">
		<?php wp_nav_menu($secondary); ?>
	</div>
</div>
