<script>
import { user } from "$lib/stores/user";
import { slugify } from "$js/helpers/slugify";
import Debug from "$lib/components/Debug.svelte";
import PriceDisplay from "$lib/components/shop/PriceDisplay.svelte";
import { formatCartLines } from "$js/helpers/cart";

export let product;
export let image = null;
export let defaultImage = null;
export let selectedVariant;

let defaultSize = $user.shop.size || "M";

const changeImage = (variant) => {

	if(!variant.variant || !variant?.variant?.node?.image?.url) return;

	image = variant.variant.node.image.url;
}

/**
 * ProductForm
 */
let form, variantForm;
let productId = product.id.replace(/[^0-9]/g, "");
let variantIndexes = null;
let variants = product.variants.edges || [];
let optionArray = product.options.map((o) => o?.name);
let firstSelectedOrAvailable = variants.find((v) => v.node.availableForSale === true);

let processing = false;
let selected = {
	options: {},
	variant: {}
};

/**
 * ProductForm~onSubmit
 */
const onSubmit = async (event) => {

	if(processing === true) return;

	processing = true;

	let form = new FormData(event.srcElement);
	let payload = {};

	form.forEach((value, key) => payload[key] = value);

	let response = await fetch(event.srcElement.action, {
		method: event.srcElement.method,
		body: JSON.stringify(payload)
	});

	let data = await response.json();

	if(data?.cartId) {
		$user.shop.cart.obj = data.cart;
		$user.shop.cart.id = data.cartId;
	}

	processing = false;
};

/**
 * ProductForm~setSelectedVariant
 */
const setSelectedVariant = () => {

	if(!selected.options) return;

	let variantArray = optionArray.map((o, i, []) => selected.options[slugify(o)]);
	let variantString = variantArray.join(" / ");

	selected.variant = variants.find((v) => v.node.title == variantString);
	selected = selected;

	changeImage(selected);
};

/**
 * ProductForm~setSelectedOptions
 */
const setSelectedOptions = (event) => {

	let input = event.target;
	let type = input.name;

	selected.options[type] = input.value;

	/** --- now set variant --- */
	setSelectedVariant();
};

/**
 * ProductForm~getSelectedOptions
 */
const getSelectedOptions = () => {

	if(!selected.variant) return;

	let variantTitle = selected.variant?.node?.title;
	let variantSplit = variantTitle.split("/");
	let options = {};

	options[slugify(optionArray[0])] = variantSplit[0].trim();

	if(optionArray[1] && variantSplit[1]) options[slugify(optionArray[1])] = variantSplit[1].trim();
	if(optionArray[2] && variantSplit[2]) options[slugify(optionArray[2])] = variantSplit[2].trim();

	selected.options = options;
	selected = selected;
};

if(firstSelectedOrAvailable) {

	selected.variant = firstSelectedOrAvailable;

	getSelectedOptions();
}

/** Reactives */
$: price = selected.variant?.node?.price?.amount || null;
$: comparePrice = selected.variant?.node?.comparePrice?.amount || null;
$: variantId = selected.variant?.node?.id || null;
</script>

<!-- <Debug object={selected.options} open={true} /> -->

<div class="theme-primary">
	{#if product.variants.edges.length > 1}
		<form bind:this={variantForm} on:submit|preventDefault on:change={setSelectedOptions}>
			{#each product.options as option}
				{@const text = slugify(option.name)}
				<div>
					<legend>{option.name}</legend>
					<div class="flex flex-wrap">
						{#each option.values as value}
							{@const valueText = slugify(value)}
							<div class="">
								<input class="hidden" id={`product_${productId}_${text}_${valueText}`} type="radio" name={`${text}`} value={value} checked={(selected.options[text] === value ? "checked" : false)} />
								<label class="btn btn-alt block" for={`product_${productId}_${text}_${valueText}`}>{value}</label>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</form>
	{/if}
	<form class="w-full" method="POST" action="/api/{$user.service.shop}/shop/cart/add" bind:this={form} on:submit|preventDefault={onSubmit}>
		{#if selected.variant?.node}
			<input type="hidden" name="variant" bind:value={variantId} />
			<input type="hidden" name="product" bind:value={product.id} />
			<input type="hidden" name="quantity" value="1" />
			{#if $user?.shop?.cart?.id}
				<input type="hidden" name="cart" value={$user.shop.cart.id} />
				<input type="hidden" name="lines" value={JSON.stringify(formatCartLines($user.shop.cart.obj))} />
			{/if}
		{/if}
		{#if selected.variant?.node?.availableForSale === true}
			<button class="btn btn-primary w-full" type="submit">Add To Cart &ndash; <PriceDisplay price={price} comparePrice={comparePrice} /></button>
		{:else}
			<button class="btn w-full" type="submit" disabled>Sold Out</button>
		{/if}
	</form>
</div>