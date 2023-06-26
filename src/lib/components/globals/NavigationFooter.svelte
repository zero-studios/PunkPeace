<script>
import Grid from "$lib/components/slots/Grid.svelte";
import { page } from "$app/stores";
import { user } from "$lib/stores/user";
import { helpers, site } from "$lib/stores/content";
import { asText } from "@prismicio/client";

let date = new Date();
let year = date.getFullYear();
</script>

<footer class="p-[var(--site-gutter)] max-w-[1920px] m-auto">
	<Grid max={2} min={1}>
		<a class="block btn text-center" href="#SOMELINK" target="_blank">@punkpeace</a>
		<a class="block btn text-center" href="mailto:some1@punkpeace.world" target="_blank">some1@punkpeace.world</a>
	</Grid>
	<div class="py-[var(--site-gutter)]"></div>
	<div class="pt-[var(--site-gutter)]">
		<ul class="uppercase dk:flex">
			{#if $site?.copyright}
				<li class="mb-[var(--site-gutter)] dk:mr-[var(--site-gutter)] dk:mb-0">{asText($site?.copyright)} {year}</li>
			{/if}
			{#if $site?.footer_note}
				<li class="mb-[var(--site-gutter)] dk:mr-[var(--site-gutter)] dk:mb-0">{asText($site?.footer_note)}</li>
			{/if}
			{#if $site?.footer_navigation && $site?.footer_navigation.length > 0}
				{#each $site.footer_navigation as link}
					<li class="mb-[var(--site-gutter)] dk:mr-[var(--site-gutter)] dk:mb-0"><a href="{$helpers.linkResolver(link.link)}">{asText(link.link_text)}</a></li>
				{/each}
			{/if}
			<li class="mb-[var(--site-gutter)] dk:mb-0">
				<a href="https://zero.nyc/" target="_blank" rel="noopener" class="zero-site-by">Site by <span>Zero</span></a>
				<style type="text/css">.zero-site-by span{position:relative}.zero-site-by span:after,.zero-site-by span:before{content:"";position:absolute;top:50%;left:0;width:100%;height:1px;background-color:currentColor}.zero-site-by span:before{transition:transform .5s cubic-bezier(.645,.045,.355,1);transition-delay:0s;transform-origin:0 50%;transform:scaleX(0) translateZ(0)}.zero-site-by span:after{transition:transform .5s cubic-bezier(.645,.045,.355,1);transition-delay:.2s;transform-origin:100% 50%;transform:scaleX(1) translateZ(0)}.zero-site-by:hover span:before{transform:scaleX(1) translateZ(0);transition-delay:.2s}.zero-site-by:hover span:after{transform:scaleX(0) translateZ(0);transition-delay:0s}</style>
			</li>
		</ul>
	</div>
</footer>
<div class="pointer-events-none w-full overflow-hidden">
	<div class="flex -mb-[0.5vw] items-center w-full">
		<div class="w-[calc(100%_*_0.444444)] text-[length:4.302444vw] flex items-center whitespace-nowrap {($user.site.darkMode === true) ? "justify-end -indent-[1.5vw]" : "-indent-[1.4vw] justify-start"}">
			<a href="/" class="text-[3.75em] font-bold block pointer-events-auto !leading-[0.8] !m-0 {($user.site.darkMode === true) ? "rotate-180" : ""}" on:click={(e) => {
				$user.site.darkMode = true;
				if($page.url.pathname === "/") e.preventDefault();
			}}>PUNK</a>
		</div>
		<div class="w-[calc(100%_*_0.555555)] text-[length:4.302444vw] flex items-center whitespace-nowrap {($user.site.darkMode === true) ? "justify-start indent-[1.0vw]" : "-indent-[1.4vw] justify-end"}">
			<a href="/" class="text-[3.75em] font-bold block transform pointer-events-auto !leading-[0.8] !m-0 {($user.site.darkMode === true) ? "" : "rotate-180"}" on:click={(e) => {
				$user.site.darkMode = false;
				if($page.url.pathname === "/") e.preventDefault();
			}}>PEACE</a>
		</div>
	</div>
</div>