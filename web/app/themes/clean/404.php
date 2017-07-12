<?php 
get_header();
$fof_image = get_field('fof_background_image', 'option'); 
?>

<div id="barba-wrapper">
	<div class="barba-container" data-namespace="not-found">
		<main id="main" class="not-found">

			<div class="image group" data-img-lg="<?php echo $fof_image["sizes"]["large"]; ?>" data-img-md="<?php echo $fof_image["sizes"]["medium"]; ?>" data-img-sm="<?php echo $fof_image["sizes"]["thumbnail"]; ?>">
				<div class="vert-center">
					<h1>Page Not Found</h1>
					<p><a href="/">Click here</a> to find your way.</p>
				</div>
			</div>

		</main>
	</div>
</div>

<?php get_footer(); ?>