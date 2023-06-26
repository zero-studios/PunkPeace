<script>
import { onMount } from "svelte";
import { register } from "swiper/element/bundle";
import AddToCart from "$lib/components/shop/AddToCart.svelte";
import PriceDisplay from "$lib/components/shop/PriceDisplay.svelte";
import Grid from "$lib/components/slots/Grid.svelte";
import Debug from "$lib/components/Debug.svelte";
import ResponsiveImage from "$lib/components/elements/ResponsiveImage.svelte";
import { ChevronRightIcon, ChevronLeftIcon } from "svelte-feather-icons";

export let product;
export let variant = null;

let colorDesc = (typeof product?.metafields[0] === "object") ? product?.metafields?.find((m) => m?.key === "color_description") : null;
let firstSelectedOrAvailable = product.variants.edges.find((v) => { return v.node.availableForSale === true; });
let soldOut = false;

if(!firstSelectedOrAvailable) {
	firstSelectedOrAvailable = product.variants.edges[0];
	soldOut = true;
}

let swiper;

$: index = 1;

const onRealIndexChange = (e) => {

	const [swiper] = e.detail;

	console.log("indexChange", swiper, swiper.realIndex);

	index = swiper.realIndex + 1; // ... lol
};

/** @type {import('swiper/element/bundle').register} */
register();

onMount(() => {

	if(swiper) swiper.swiper.update();
});
</script>

<div class="p-[var(--site-gutter)]">
	<Grid max={2} min={1}>
		<div class="relative w-full h-0 pb-[100%]">
			{#if product.images?.edges?.length > 0}
				<swiper-container bind:this={swiper} class="w-full h-[calc(100%_+_34px)] absolute top-0 left-0" slides-per-view={1} loop={true} on:realindexchange={onRealIndexChange}>
					<div slot="container-end">
						{#if product.images?.edges?.length > 1}
							<div class="text-[var(--text-color)] flex items-center absolute bottom-0 right-0 z-10">
								<button class="cursor-pointer" aria-label="Previous Slide" on:click={() => { swiper.swiper.slidePrev(); }}><ChevronLeftIcon strokeWidth={1} /></button>
								<span class="font-bold mx-[10px]">
									{index}
									/
									{product.images?.edges?.length}
								</span>
								<button class="cursor-pointer" aria-label="Next Slide" on:click={() => { swiper.swiper.slideNext(); }}><ChevronRightIcon strokeWidth={1} /></button>
							</div>
						{/if}
					</div>
					{#each product.images.edges as image}
						<swiper-slide class="w-full h-[calc(100%_-_34px)] relative rounded-[10px] overflow-hidden pointer-events-auto">
							<ResponsiveImage src={image.node.url} alt={image.node.altText} width={image.node.width} height={image.node.height} cover={true} shopify={true} rounded={true} />
						</swiper-slide>
					{/each}
				</swiper-container>
			{/if}
		</div>
		<div class="flex items-center mt-[var(--site-gutter)] dk:mt-0">
			<div class="max-w-[400px] dk:max-w-[350px] m-auto w-full">
				<div class="pt-[20px] flex">
					<div class="flex-grow">
						<h1 class="h6 !mb-0 pr-[20px] {(soldOut === true) ? "line-through" : ""}">{product.title}</h1>
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
				{#if product.description}
					<div class="richtext border-t border-dotted border-[var(--text-color)] mt-[26px] pt-[26px]">
						<p class="text-[length:10px] leading-[16px]">{product.description}</p>
					</div>
				{/if}
				<div class="border-t border-dotted border-[var(--text-color)] mt-[26px] pt-[26px]">
					<AddToCart product={product} selectedVariant={variant} />
				</div>
			</div>
		</div>
	</Grid>
</div>