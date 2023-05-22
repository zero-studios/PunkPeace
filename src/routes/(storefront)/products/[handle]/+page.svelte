<script>
import Debug from "$lib/components/Debug.svelte";
import AddToCart from "$lib/components/shop/AddToCart.svelte";
import { JsonLd } from "svelte-meta-tags";

export let data;

/**
 * getStatus
 * @param {boolean} available availableForSale
 * @param {boolean} stocked currentlyNotInStock
 */
let getStatus = (available, stocked) => {

	let status = "https://schema.org/InStock";

	if(available === true && stocked === false) status = "https://schema.org/InStock";
	if(available === false && stocked === true) status = "https://schema.org/OutOfStock";
	if(available === false && stocked === false) status = "https://schema.org/PreOrder";

	return status;
};

let productSchema = {
	"@context" : "http://schema.org",
	"@type": "Product",
	"name": `${data.product.seo.title || data.product.title}`,
	"url": encodeURIComponent(`https://store.dropout.tv/collections/${data.product.handle}/`),
	"description": `${data.product.seo.description || data.product.description}`,
	"image": (data.product?.image?.url ? encodeURIComponent(data.product?.image?.url) : null),
	"brand": {
		"@type": "Thing",
		"name": data.product.vendor
	},
	"offers": data.product.variants.edges.map((v, i) => ({
		"@type": "Offer",
		"price": parseFloat(v.node.price.amount),
		"priceCurrency": "USD",
		"url": encodeURIComponent(`https://store.dropout.tv/products/${data.product.handle}/?variant=${v.node.id.replace("gid://shopify/ProductVariant/", "")}`),
		"name": v.node.title,
		"sku": v.node.sku,
		"inventoryLevel": v.node.quantityAvailable,
		"image": (v.node.image?.url ? encodeURIComponent(v.node.image?.url) : null),
		"availability": getStatus(v.node.availableForSale, v.node.currentlyNotInStock)
	}))
};
</script>

<br />
<br />
<br />
<br />
<Debug object={data.product} />

{#key data.product.id}
	{data.product.title}
	<AddToCart product={data.product} selectedVariant={data.variant} />
	<JsonLd schema={productSchema} output={"body"} />
{/key}