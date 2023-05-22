<script>
import Debug from "$lib/components/Debug.svelte";
import SliceSwitch from "$lib/components/slots/SliceSwitch.svelte";
import { asText } from "@prismicio/client";

export let group;
</script>

{#if group?.primary?.group?.uid}
	<Debug object={group} title={`${asText(group?.primary?.group?.data?.title)}`} />
	<div data-variation={group.variation}>
		{#if group?.primary?.group?.data?.slices}
			{#each group.primary.group.data?.slices as slice, index}
				<SliceSwitch slice={slice} index={index} />
			{/each}
		{/if}
	</div>
{/if}