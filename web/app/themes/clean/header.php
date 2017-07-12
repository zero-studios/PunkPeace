<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
<meta http-equiv="cleartype" content="on" />
<?php define("WPTITLE", wp_title('|', false, 'right')); ?>
<title><?php echo WPTITLE; ?></title>
<meta name="description" content="" />
<link rel="icon" href="<?php echo "https://$_SERVER[HTTP_HOST]/"; ?>app/themes/clean/assets/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="<?php echo "https://$_SERVER[HTTP_HOST]/"; ?>app/themes/clean/assets/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" href="<?php echo "https://$_SERVER[HTTP_HOST]/"; ?>app/themes/clean/assets/apple-touch-icon-precomposed.png" />
<link rel="stylesheet" href="/app/themes/clean/assets/css/_init.css" type="text/css" media="all" />
<?php wp_head(); ?>
<?php
// default image
$fb_img = "";
$tw_img = "";
// grab Featured Image from page
$feat_image_id = get_post_thumbnail_id($post->ID);
$feat_image_large = wp_get_attachment_image_src($feat_image_id, 'large');
if($feat_image_large[0] && $feat_image_large[0] !== ""){
	$fb_img = $feat_image_large[0];
	$tw_img = $feat_image_large[0];
}
?>
<!-- Facebook Meta -->
<meta property="og:description" content="" /> 
<meta property="og:image" content="<?php echo "https://$_SERVER[HTTP_HOST]" . $fb_img; ?>" />
<meta property="og:site_name" content="" />
<meta property="og:title" content="<?php echo WPTITLE; ?>" />
<meta property="og:type" content="website" />
<meta property="og:url" content="<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" />
<meta property="fb:app_id" content="" />
<!-- Twitter Meta -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="" />
<meta name="twitter:description" content="" />
<meta name="twitter:image" content="<?php echo "https://$_SERVER[HTTP_HOST]" . $tw_img; ?>" />
<meta name="twitter:site" content="<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" />
<meta name="twitter:title" content="<?php echo WPTITLE; ?>" />
</head>
<body>
<div id="container" class="group">
	<header id="header" class="group">
		<?php include(locate_template('templates/modules/navigation.php')); ?>
	</header>