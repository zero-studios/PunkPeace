<div class="grid-wrapper group <?php if($post->post_name == "punk"){ echo "alt"; } ?>">

	<?php
	$args = array(
	    "post_type" => "post",
	    "posts_per_page" => -1,
	    "orderby" => "post_date",
	    "order" => "DESC"
	);

	if($post->post_name == "punk"){
		$args["category_name"] = "punk";
	}

	if($post->post_name == "peace"){
		$args["category_name"] = "peace";
	}

	$posters = get_posts($args);
	/*===============*
	echo "<pre>";
	print_r($posters);
	echo "</pre><br>";
	/*===============*/
	foreach($posters as $key => $poster){
		$collaborators = get_field("collaborators", $poster->ID);
		$link = get_permalink($poster->ID);
	?>

	<!-- Poster HTML -->
	<article class="poster-frame group" data-url="<?php echo $link; ?>?iframe=true" data-title="<?php echo $poster->post_title; ?>" data-contributors="serialized_json">
		<div class="iframe group">
			<iframe rel="iframe_written_here"></iframe>
		</div>
		<div class="info-frame group">
			<h1><?php echo $poster->post_title; ?></h1>
			<h2>
			<?php if(isset($collaborators[0])){ foreach($collaborators as $index => $arr){ if($index !== 0){ ?>, <?php } if($arr["link"] != ""){ ?><a href="<?php echo $arr["link"]; ?>" target="_blank"><?php echo $arr["name"]; ?></a><?php } else { echo $arr["name"]; } } } ?>
			</h2>
			<div class="expand"></div>
		</div>
	</article>

	<article class="non-frame group">
		<?php echo $key; if($key == 0){ ?>

			<div class="content"><?php echo $post->post_content; ?></div>

		<?php } ?>
	</article>

	<?php } ?>

</div>