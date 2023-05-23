<script>
import AddToCart from "$lib/components/shop/AddToCart.svelte";
import PriceDisplay from "$lib/components/shop/PriceDisplay.svelte";
import Grid from "$lib/components/slots/Grid.svelte";

export let product;
export let variant = null;

let colorDesc = (typeof product?.metafields[0] === "object") ? product?.metafields?.find((m) => m?.key === "color_description") : null;
let firstSelectedOrAvailable = product.variants.edges.find((v) => { return v.node.availableForSale === true; });
let soldOut = false;

if(!firstSelectedOrAvailable) {
	firstSelectedOrAvailable = product.variants.edges[0];
	soldOut = true;
}
</script>

<div class="p-[var(--site-gutter)]">
	<Grid max={2} min={1}>
		<div>

		</div>
		<div>
			<div class="pt-[20px] flex">
				<div class="flex-grow">
					<h1 class="h6 !mb-0 pr-[20px]"><a href="/products/{product.handle}/">{product.title}</a></h1>
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
			<div class="border-t border-dotted">
				<AddToCart product={product} selectedVariant={variant} />
			</div>
		</div>
	</Grid>
</div>