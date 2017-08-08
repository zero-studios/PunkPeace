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
	'after'						=> '  <p style="transform: rotate(90deg); padding-bottom: 10px; font-weight: bold">  ?</p>',
	'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
);
?>
<?php
// get main nav from WordPress
$secondary = array(
	'theme_location'  => '',
	'menu'            => 'Secondary Menu',
	'container'       => 'nav',
	'container_class' => 'group',
	'container_id'    => 'main-navigation',
	'menu_class'      => '',
	'menu_id'         => '',
	'after'						=> '  <p style="padding-left: 10px; font-weight: bold">  +</p>',
	'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
);
?>



<div id="primary-nav" class="group">
	<div id="nav-one">
		<?php wp_nav_menu($primary); ?>
	</div>
	<div id="logo"><a href="/"><small>home</small></a><a href="/"><img src='/app/uploads/2017/07/logo_full.svg' /></a><a href="index.php/submit/"><small>submit</small></a></div>
	<div id="nav-two">
		<?php wp_nav_menu($secondary); ?>
	</div>
</div>
