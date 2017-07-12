<?php 
get_header(); 

$root = getcwd();
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$path = str_replace($protocol . $_SERVER['HTTP_HOST'], "", get_template_directory_uri());

?>

<?php if(!isset($_GET["iframe"]) || $_GET["iframe"] == false){ ?>
<div id="barba-wrapper">
	<div class="barba-container" data-namespace="<?php echo sanitize_title($tokens[1]); ?>">

		<main id="main" class="<?php echo sanitize_title($tokens[1]); ?> group">
<?php } ?>

		<?php
		if($post->post_parent !== 0){
		  $file = "single-" . strtolower($tokens[1]) . "-child.php";
		} else {
		  $file = "single-" . strtolower($tokens[1]) . ".php";
		}

		if($tokens[1] === ""){
		  include(locate_template('templates/home.php'));
		} elseif(is_readable($root . $path . "/templates/" . $file)){
		  include(locate_template("templates/" . $file));
		} else {
		  include(locate_template('templates/single.php'));
		}
		?>

<?php if(!isset($_GET["iframe"]) || $_GET["iframe"] == false){ ?>
		</main>

	</div>
</div>
<?php } ?>

<?php get_footer(); ?>