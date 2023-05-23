<script>
/**
 * Layout~Base
 */
import { dev } from "$app/environment";
import { afterNavigate } from "$app/navigation";
import { onMount } from "svelte";
import { storage } from "$lib/stores/storage";
import { user } from "$lib/stores/user";
import NavigationHeader from "$lib/components/globals/NavigationHeader.svelte";
import NavigationFooter from "$lib/components/globals/NavigationFooter.svelte";
import Container from "$lib/components/slots/Container.svelte";
import GlobalMask from "$lib/components/globals/GlobalMask.svelte";

export let data;

let footerHeight;
let mainMinHeight = 0;

$: cssVars = {
	"--bg-color": ($user.site.darkMode === true) ? "#000000" : "#FFFFFF",
	"--bg-inverse": ($user.site.darkMode === true) ? "#FFFFFF" : "#000000",
	"--text-color": ($user.site.darkMode === true) ? "#FFFFFF" : "#000000",
	"--text-inverse": ($user.site.darkMode === true) ? "#000000" : "#FFFFFF"
};

afterNavigate(() => {
	$storage.navOpen = false;
	// tabControl.setTabs();
	// $storage.tabs = tabControl;
});

onMount(() => {

	/** --- async Check cart --- */
	if(data.cart) {

		$user.shop.cart.id = data.cart;

		fetch("/api/v1/shop/cart", {
			method: "POST",
			body: JSON.stringify({
				id: data.cart
			})
		}).then(text => text.json()).then(json => {

			console.log(json.cart);

			$user.shop.cart.obj = json.cart;

		}).catch((error) => {
			console.log("check cart errors", error);
		});
	}
});
</script>

<svelte:head>
	{#if dev}
		<script src="https://cdn.tailwindcss.com/"></script>
		<script>
			tailwind.config = {
				content: [
					"./src/**/*.svelte",
					"./prismic/slices/**/*.svelte"
				],
				theme: {
					screens: {
						"xxs": "360px",
						"xs": "480px",
						"sm": "640px",
						"md": "768px",
						"dk": "769px",
						"lg": "1024px",
						"xl": "1280px",
						"2xl": "1440px",
						"3xl": "1680px",
						"4xl": "1920px"
					},
					letterSpacing: {
						"tighter": "-2px",
						"tight": "-1px",
						"normal": "0",
						"wide": "1px",
						"wider": "2px"
					},
					extend: {
						colors: {
							"primary-color": "var(--theme-primary-background)",
							"primary-text": "var(--theme-primary-text)",
							"primary-accent": "var(--theme-primary-accent)",
							"secondary-color": "var(--theme-secondary-background)",
							"secondary-text": "var(--theme-secondary-text)",
							"secondary-accent": "var(--theme-secondary-accent)"
						},
						fontFamily: {
							"body": [
								"Helvetica",
								"Helvetica Neue",
								"Arial",
								"sans-serif"
							],
							"display": [
								"Helvetica",
								"Helvetica Neue",
								"Arial",
								"sans-serif"
							]
						},
						fontSize: {
							x50: "50%",
							x60: "60%",
							x70: "70%",
							x80: "80%",
							x90: "90%",
							x100: "100%",
							x110: "110%",
							x120: "120%",
							x130: "130%",
							x140: "140%",
							x150: "150%"
						},
						lineHeight: {
							x50: "50%",
							x60: "60%",
							x70: "70%",
							x80: "80%",
							x90: "90%",
							x100: "100%",
							x110: "110%",
							x120: "120%",
							x130: "130%",
							x140: "140%",
							x150: "150%"
						},
						spacing: {
							"xxs": "0.8rem",
							"xs": "1rem",
							"sm": "2rem",
							"md": "2rem",
							"dk": "4rem",
							"lg": "4rem",
							"xl": "4rem",
							"2xl": "4rem",
							"3xl": "8rem",
							"4xl": "8rem"
						},
						width: {
							x10: "10%",
							x20: "20%",
							x30: "30%",
							x40: "40%",
							x50: "50%",
							x60: "60%",
							x70: "70%",
							x80: "80%",
							x90: "90%",
							x100: "100%"
						},
					},
				}
			};
		</script>
	{/if}
</svelte:head>

<style lang="scss" global>
@import "./src/lib/css/tailwind.scss";
@import "./src/lib/css/main.scss";
</style>

<Container id="container" classes="wrapper" cssVars={cssVars}>
	<GlobalMask />
	<a class="sr-only" href="#main-content">Skip to content</a>
	<NavigationHeader />
	<div class="{($storage.scrollLock === true) ? "" : ""}">
		<main id="main-content" tabindex="-1" style="min-height:{mainMinHeight}px;">
			<slot />
		</main>
		<NavigationFooter bind:footerHeight={footerHeight} />
	</div>
</Container>
