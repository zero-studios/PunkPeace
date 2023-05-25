<script>
import { fly, scale, slide } from "svelte/transition";
import { page } from "$app/stores";
import { user } from "$lib/stores/user";
import CartTrigger from "$lib/components/shop/CartTrigger.svelte";
import CartDisplay from "$lib/components/shop/CartDisplay.svelte";

let setHeight;
</script>

<header style="--setHeight: {setHeight}px;" class="h-[var(--setHeight,_180px)] pointer-events-none">
	<div bind:clientHeight={setHeight} class="fixed left-0 top-0 w-full px-[var(--site-gutter)] py-[30px] dk:py-[var(--site-gutter)] flex justify-between z-50">
		<div class="w-[calc(50%_-_10px)]">
			<a href="/" class="h2 pointer-events-auto !leading-[0.8] !m-0 {($user.site.darkMode === true) ? "rotate-180" : ""}" on:click={(e) => {
				$user.site.darkMode = true;
				if($page.url.pathname === "/") e.preventDefault();
			}}>PUNK</a>
		</div>
		{#if $user.shop.cart?.obj?.lines?.edges?.length > 0}
			<div class="h-full w-auto relative" transition:slide="{{ axis: "x", duration: 600 }}">
				<CartTrigger />
				<CartDisplay />
			</div>
		{/if}
		<div class="w-[calc(50%_-_10px)] text-right">
			<a href="/" class="h2 pointer-events-auto !leading-[0.8] !m-0 {($user.site.darkMode === true) ? "" : "rotate-180"}" on:click={(e) => {
				$user.site.darkMode = false;
				if($page.url.pathname === "/") e.preventDefault();
			}}>PEACE</a>
		</div>
	</div>
</header>