<?php 
get_header(); 

$root = getcwd();
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$path = str_replace($protocol . $_SERVER['HTTP_HOST'], "", get_template_directory_uri());

?>

<div id="barba-wrapper">
	<div class="barba-container" data-namespace="<?php echo sanitize_title($post->post_title); ?>">

		<main id="main" class="<?php echo sanitize_title($post->post_title); ?> group">

		<?php
		if($post->post_parent !== 0){
		  $file = "content-" . strtolower($tokens[1]) . "-child.php";
		} else {
		  $file = "content-" . strtolower($tokens[1]) . ".php";
		}

		if($tokens[1] === ""){
		  include(locate_template('templates/home.php'));
		} elseif(is_readable($root . $path . "/templates/" . $file)){
		  include(locate_template("templates/" . $file));
		} else {
		  include(locate_template('templates/content.php'));
		}
		?>

		</main>

	</div>
</div>

<?php get_footer(); ?>