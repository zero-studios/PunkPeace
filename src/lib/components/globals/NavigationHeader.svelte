<script>
import { fly, scale, slide } from "svelte/transition";
import { user } from "$lib/stores/user";
import CartTrigger from "$lib/components/shop/CartTrigger.svelte";

let setHeight;
</script>

<header style="--setHeight: {setHeight}px;" class="h-[var(--setHeight,_180px)] pointer-events-none">
	<div bind:clientHeight={setHeight} class="fixed left-0 top-0 w-full px-[var(--site-gutter)] py-[30px] dk:py-[var(--site-gutter)] flex justify-between z-50">
		<a href="/" class="h2 pointer-events-auto !m-0 {($user.site.darkMode === true) ? "rotate-180" : ""}" on:click={() => { $user.site.darkMode = true; }}>PUNK</a>
		{#if $user.shop.cart?.obj?.lines?.edges?.length > 0}
			<div class="h-full w-[60px] relative" transition:slide="{{ axis: "x", duration: 600 }}">
				<CartTrigger />
			</div>
		{/if}
		<a href="/" class="h2 pointer-events-auto !m-0 {($user.site.darkMode === true) ? "" : "rotate-180"}" on:click={() => { $user.site.darkMode = false; }}>PEACE</a>
	</div>
</header>