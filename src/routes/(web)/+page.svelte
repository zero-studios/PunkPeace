<script>
import { storage } from "$lib/stores/storage";
import Debug from "$lib/components/Debug.svelte";
import ModuleSwitch from "$lib/components/slots/ModuleSwitch.svelte";


export let data;

let { page } = data || null;
</script>

{#if page}
	{#each page.slices as group}
		<ModuleSwitch group={group} />
	{/each}
{/if}

<Debug object={page} title={"PAGE"} />