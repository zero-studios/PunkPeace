<section class="poster-container">
	<?php 
	$content = get_field("code", $post->ID); 
	if(strpos($content, 'eval') !== false){
		echo "Malicious code detected";
	} else {
		$content = str_replace("<p><script", "<script", $content);
		$content = str_replace("script></p>", "script>", $content);
		echo $content;
	}
	?>
</section>
