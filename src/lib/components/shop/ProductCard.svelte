<script>
/**
 * @fileOverview test this desc
 * @module
 * @typedef {Object} ShopComponents~ProductCard
 * @requires ResponsiveImage
 */
import ResponsiveImage from "$lib/components/elements/ResponsiveImage.svelte";
import Debug from "$lib/components/Debug.svelte";
import AddToCart from "$lib/components/shop/AddToCart.svelte";
import PriceDisplay from "$lib/components/shop/PriceDisplay.svelte";
import { user } from "$lib/stores/user";
import { page } from "$app/stores";

/** inline variable description */
export let product;
export let image = product.featuredImage?.url; // or here

let imageUrl = null;

/** refresh image */
$: if(imageUrl && imageUrl !== image) {
	image = imageUrl;
}

let visible = false;
let productChecked = false;
let firstSelectedOrAvailable = product.variants.edges.find((v) => { return v.node.availableForSale === true; });
let colorDesc = (typeof product?.metafields[0] === "object") ? product?.metafields?.find((m) => m?.key === "color_description") : null;
let soldOut = false;

if(!firstSelectedOrAvailable) {
	firstSelectedOrAvailable = product.variants.edges[0];
	soldOut = true;
}
</script>

{#if $page.params.handle !== product.handle}
	<article on:mouseenter={() => { visible = true; }} on:mouseleave={() => { visible = false; }}>
		<div class="relative rounded-[10px] overflow-hidden">
			<a class="block relative w-full h-0 aspect-square pb-[100%]" href="/products/{product.handle}/" aria-label="{product.title}">
				{#key image}
					{#if image}
						<ResponsiveImage src={image} sizes={"(max-width: 479px) 100vw, (max-width: 768px) 50vw, (max-width: 1279px) 33vw, 25vw"} shopify={true} cover={true} />
					{/if}
				{/key}
			</a>
		</div>
		<div class="pt-[20px] flex">
			<div class="flex-grow">
				<h1 class="h6 !mb-0 pr-[20px] {(soldOut === true) ? "line-through" : ""}"><a href="/products/{product.handle}/">{product.title}</a></h1>
			</div>
			<p class="inline-block font-bold text-xs !mb-0">
				{#if soldOut}
					Sold Out
				{:else}
					<PriceDisplay price={firstSelectedOrAvailable.node.price.amount} comparePrice={firstSelectedOrAvailable.node.comparePrice?.amount} />
				{/if}
			</p>
		</div>
		{#if colorDesc}
			<p class="text-[length:10px] pt-[5px] !mb-0">{colorDesc.value}</p>
		{/if}
		<!-- <AddToCart product={product} hideVariants={true} bind:image={imageUrl} defaultImage={product.featuredImage.url} /> -->
	</article>
{/if}