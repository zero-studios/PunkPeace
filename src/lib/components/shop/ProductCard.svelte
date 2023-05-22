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
import { user } from "$lib/stores/user";

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
</script>

<article on:mouseenter={() => { visible = true; }} on:mouseleave={() => { visible = false; }}>
	<div class="relative">
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
			<h1 class="h5 pr-[50px]"><a href="/products/{product.handle}/">{product.title}</a></h1>
		</div>
	</div>
	<AddToCart product={product} bind:image={imageUrl} defaultImage={product.featuredImage.url} />
</article>