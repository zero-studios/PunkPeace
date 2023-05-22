<script>
import Collection from "$slices/Collection.svelte";
import FullscreenMedia from "$slices/FullscreenMedia.svelte";
import OneColumnRichtext from "$slices/OneColumnRichtext.svelte";
import Debug from "$lib/components/Debug.svelte";

export let index = 0;
export let slice;

const COMPONENT_LIST = [
	{ id: "collection", component: Collection },
	{ id: "one_column_richtext", component: OneColumnRichtext },
	{ id: "fullscreen_media", component: FullscreenMedia }
];

/** --- Filter our component list --- */
const SELECTED_COMPONENT = COMPONENT_LIST.filter((item) => item.id === slice.slice_type)[0];
const ITEMS = slice.items || [{}];
let PROPS = {
	id: slice.id || undefined,
	index: index,
	variation: slice.variation || undefined,
	data: slice.primary || undefined
};

/** --- Items can be empty, this silences the compile warnings --- */
if(Object.keys(ITEMS[0]).length > 0) {
	PROPS.items = ITEMS;
}
</script>

{#if SELECTED_COMPONENT && SELECTED_COMPONENT.component && slice?.id && slice?.primary}
	<svelte:component this={SELECTED_COMPONENT.component} {...PROPS} />
{:else}
	<Debug object={PROPS}  />
{/if}