<script>
/**
 * @fileOverview A component to manage responsive image tags
 * @module elements/ResponsiveImage
 * @property {string}	[alt]
 * @property {integer}	[breakpoint=768]
 * @property {boolean}	[cover=false]
 * @property {boolean}	[contain=false]
 * @property {integer}	[height]
 * @property {string}	[src]
 * @property {string}	[srcMobile=src]
 * @property {string}	[type="responsive"]
 * @property {integer}	[width=2048]
 * @property {boolean}	[placeholder=false]
 * @property {string}	[sizes]
 */

import { dev } from "$app/environment";
import { onMount } from "svelte";
import { storage } from "$lib/stores/storage";
import LazyLoad from "vanilla-lazyload";

export let alt = "";
export let breakpoint = 768;
export let cover = false;
export let contain = false;
export let rounded = false;
export let height = null;
export let src;
export let srcMobile = src;
export let width = 2048;
export let type = "responsive";
export let placeholder = false;
export let sizes = null;
export let shopify = false;

let minWidth = 240;
let widths = [minWidth, 360, 480, 640, 800, 1040, 1280, 1540, 1880];
let quality = 90;

/** Clean url */
let urlString = new URL(src);

urlString.searchParams.delete("w");

src = urlString.href;

/** Filter our widths by our max size */
widths = widths.filter(v => v <= width);

/** Process images from Prismic */
const imageOutput = (source, mobileSource, size) => ((size > breakpoint) ? `${source}&w=${size} ${size}w` : `${mobileSource}&w=${size} ${size}w`);
const shopifyProcessImage = (src, width) => {

	let srcArray = src.split(".");
	let lastIndex = srcArray.pop();

	src = srcArray.join(".");

	return `${src}_${width}x.${lastIndex}`;
};
const shopifyImageOutput = (source, mobileSource, size) => ((size > breakpoint) ? `${shopifyProcessImage(source, size)} ${size}w` : `${shopifyProcessImage(mobileSource, size)} ${size}w`);
const vercelImageOutput = (source, mobileSource, size) => ((size > breakpoint) ? `/_vercel/image?url=${encodeURIComponent(source + `&w=${size}`)}&w=${size}&q=${quality} ${size}w` : `/_vercel/image?url=${encodeURIComponent(mobileSource + `&w=${size}`)}&w=${size}&q=${quality} ${size}w`);

let placeholderSrc = `${src}&w=20`;
let srcSet = widths.map(size => imageOutput(src, srcMobile, size));

if(shopify === true) {
	placeholderSrc = shopifyProcessImage(src, 20);
	srcSet = widths.map(size => shopifyImageOutput(src, srcMobile, size));
}

let closestSize = minWidth;

if(widths.length > 0) {
	closestSize = widths.reduce((prev, cur) => (Math.abs(cur - width) < Math.abs(prev - width) ? cur : prev));
}

/** Get closest original src */
if(!shopify && src.indexOf(".svg") <= -1) src = `${src}&w=${(closestSize < minWidth ? minWidth : closestSize)}`;
if(shopify && src.indexOf(".svg") <= -1) src = `${shopifyProcessImage(src, (closestSize < minWidth ? minWidth : closestSize))}`;

/** Vercel image cache */
if(!dev && src.indexOf(".svg") <= -1 && !shopify) {

	placeholderSrc = `/_vercel/image?url=${encodeURIComponent(`${src}`)}&w=20&q=${quality}`;
	srcSet = widths.map(size => vercelImageOutput(src, srcMobile, size));

	/** Base load overwrite, important that it's after the srcSet output */
	src = `/_vercel/image?url=${encodeURIComponent(`${src}`)}&w=${(closestSize < minWidth ? minWidth : closestSize)}&q=${quality}`;
}

onMount(() => {

	if(!$storage.lazyLoad){
		$storage.lazyLoad = new LazyLoad({
			threshold: 1600,
			callback_loaded: (el) => {
				el.style.opacity = "1";
			}
		});
	}

	$storage.lazyLoad.update();
});
</script>

{#if src}
	{#if src.indexOf(".svg") > -1 || type !== "responsive" || srcSet.length <= 0}
		<div class="{(!cover) ? "max-w-full" : "object-cover w-full h-full absolute object-center z-0"} {(!contain) ? "" : "object-contain w-full h-full absolute object-center z-0"}">
			<img alt={alt} class="lazy {(!cover) ? "" : "object-cover w-full h-full absolute object-center"} {(!contain) ? "" : "object-contain w-full h-full absolute object-center"} transition-opacity opacity-0" width={width} height={height} data-src={src} />
		</div>
	{:else}
		<picture class="{(!cover) ? "max-w-full" : "object-cover w-full h-full absolute object-center z-0"} {(!rounded) ? "" : "rounded-[10px] overflow-hidden"} {(!contain) ? "" : "object-contain w-full h-full absolute object-center z-0"}">
			<source data-srcset={srcSet} sizes={sizes} />
			<img alt={alt} class="lazy {(!cover) ? "max-w-full" : "object-cover w-full h-full absolute object-center"} transition-opacity opacity-0" src={(placeholder === true) ? placeholderSrc : null} width={width} height={height} data-src={src} />
		</picture>
	{/if}
{/if}