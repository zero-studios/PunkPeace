<script>
import Debug from "$lib/components/Debug.svelte";
import { asHTML, asText } from "@prismicio/client";

export let id;
export let index = 0;
export let variation;
export let data;
</script>

<Debug object={data} title={id} />

<section id={id} class="px-[var(--site-gutter)] py-[30px] dk:py-[var(--site-gutter)] {(data.content_alignment) ? `text-${data.content_alignment.toLowerCase()}` : "text-left"}" data-index={index} data-variation={variation}>
	{#if data?.eyebrow[0]?.text}
		<p class="mb-[var(--gutter)]">{asText(data.eyebrow)}</p>
	{/if}
	<div class="richtext">
		{@html asHTML(data.content)}
	</div>
</section>