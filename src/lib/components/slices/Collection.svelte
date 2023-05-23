<script>
import Debug from "$lib/components/Debug.svelte";
import ProductCard from "$lib/components/shop/ProductCard.svelte";
import Grid from "$lib/components/slots/Grid.svelte";

export let id;
export let index = 0;
export let variation;
export let data;

let collectionHandle = data.collection_handle || null;

/** Split URL for collection handle */
if(data?.collection_link?.url) {

	let splitLink = data.collection_url.url.split("collections/");

	collectionHandle = splitLink[1].replace("/", "").trim();
}

const collectionData = async () => {

	let data = await fetch(`/collections/${collectionHandle}/`, {
		method: "POST",
		headers: {
			"Accept": "application/json"
		}
	}).catch(err => {
		console.log("ERROR -- collection GET", err.message);
	});

	let response = await data.json();

	if(data.ok) {
		return response;
	} else {
		throw new Error("");
	}
};

let promise = collectionData();
let limit = data?.limit_products || false;
let limitCount = data?.visible_products || 99999;
</script>

<Debug object={data} title={id} />

{#if collectionHandle}
	<section id={id} class="max-w-[1920px] m-auto w-full p-[var(--site-gutter)]" data-index={index} data-variation={variation}>
		{#await promise}
			Loading...
		{:then response}
			{@const dropNumber = (typeof response.collection?.metafields[0] === "object") ? response.collection?.metafields?.find((m) => m?.key === "drop_number") : null}
			<h2 class="h6 !mb-[40px] uppercase">
				{response.collection.title}
				{#if data?.hide_count !== true}
					<span>(</span>{response.collection.products.edges.length}<span>)</span>
				{/if}
			</h2>
			<h2 class="h2m uppercase max-w-[360px] !mb-[40px]">
				{#if dropNumber}
					<sup class="align-super top-0 text-sm"><span>(</span>{dropNumber.value}<span>)</span></sup>
				{/if}
				{response.collection.description}
			</h2>
			<Grid max={3} min={2}>
				{#each response.collection.products.edges as product, i}
					{@const index = i + 1}
					{#if limit === false || index < limitCount}
						<ProductCard product={product.node} />
					{/if}
				{/each}
			</Grid>
		{:catch error}
			{error}
		{/await}
	</section>
{/if}