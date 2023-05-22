<script>
import { user } from "$lib/stores/user";

export let title = "Debug";
export let object = {};
export let open = false;
</script>

{#if $user.site.debug === true}
	<details class="p-[15px] text-sm font-mono font-bold bg-[color:var(--bg-inverse)] text-[color:var(--text-inverse)] cursor-pointer" open={open}>
		<summary>{title}</summary>
		<pre class="whitespace-pre-wrap break-words font-normal cursor-text">{JSON.stringify(object, null, 4)}</pre>
	</details>
{/if}