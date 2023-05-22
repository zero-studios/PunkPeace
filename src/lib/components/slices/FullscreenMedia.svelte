<script>
import Debug from "$lib/components/Debug.svelte";
import ResponsiveImage from "$lib/components/elements/ResponsiveImage.svelte";
import ResponsiveVideo from "$lib/components/elements/ResponsiveVideo.svelte";

export let id;
export let index = 0;
export let variation;
export let data;
</script>

<Debug object={data} title={id} />

<section id={id} class="max-w-[1920px] m-auto w-full overflow-hidden {(variation === "fullscreenMediaPadded" ? "p-[var(--site-gutter)]" : "")}" data-index={index} data-variation={variation}>
	<div class="relative w-[calc(100%_+_1px)] {(variation === "fullscreenMediaPadded" ? "rounded-[10px] dk:rounded-[20px] overflow-hidden" : "")}">
		{#if data.external_video?.url}
			<ResponsiveVideo src={data.external_video.url} />
		{:else if data.video?.url}
			<ResponsiveVideo src={data.video.url} />
		{:else if data.image?.url}
			<ResponsiveImage src={data.image.url} srcMobile={data.image.mobile.url} height={data.image.dimensions.height} width={data.image.dimensions.width} />
		{/if}
	</div>
</section>