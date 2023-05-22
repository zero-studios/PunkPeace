<script>
import { user } from "$lib/stores/user";

let setHeight;
</script>

<header style="--setHeight: {setHeight}px;" class="h-[var(--setHeight,_180px)] pointer-events-none">
	<div bind:clientHeight={setHeight} class="fixed left-0 top-0 w-full px-[var(--site-gutter)] py-[30px] dk:py-[var(--site-gutter)] flex justify-between z-50">
		<a href="/" class="h2 pointer-events-auto !m-0 {($user.site.darkMode === true) ? "rotate-180" : ""}" on:click={() => { $user.site.darkMode = true; }}>PUNK</a>
		<a href="/" class="h2 pointer-events-auto !m-0 {($user.site.darkMode === true) ? "" : "rotate-180"}" on:click={() => { $user.site.darkMode = false; }}>PEACE</a>
	</div>
</header>