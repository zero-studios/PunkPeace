<script>
import { onMount } from "svelte";
import { storage } from "$lib/stores/storage.js";
import LazyLoad from "vanilla-lazyload";

export let cover = false;
export let src;
export let autoplay = true;
export let loop = "loop";
export let active = false;

let interval;
let videoEl;

onMount(() => {

	if(!$storage.lazyLoad){
		$storage.lazyLoad = new LazyLoad({
			threshold: 1600,
			callback_loaded: (el) => {
				el.style.opacity = "1";
			}
		});
	}

	$storage.lazyLoad.update();

	interval = setInterval(() => {

		if(videoEl && videoEl?.readyState === 4) {

			if(active) videoEl.play();

			clearInterval(interval);
		}

	}, 50);
});

</script>

{#if src}
	<video bind:this={videoEl} class="lazy {(!cover) ? "w-full" : "object-cover w-full h-full absolute object-center z-[1]"}" data-src={src} autoplay={autoplay} loop={loop} muted="muted" playsinline="playsinline" preload="metadata">
		<track kind="captions" />
	</video>
{/if}
