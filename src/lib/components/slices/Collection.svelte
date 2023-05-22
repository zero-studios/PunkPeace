<script>
import Debug from "$lib/components/Debug.svelte";
	import ProductCard from "../shop/ProductCard.svelte";
	import Container from "../slots/Container.svelte";
	import Grid from "../slots/Grid.svelte";

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
let limit = data?.limit_products || 99999;
</script>

<Debug object={data} title={id} />

{#if collectionHandle}
	<section id={id} class="max-w-[1920px] m-auto w-full p-[var(--site-gutter)]" data-index={index} data-variation={variation}>
		{#await promise}

		{:then response}
			<Grid max={3}>
				{#each response.collection.products.edges as product, i}
					{@const index = i + 1}
					{#if index < limit}
						<ProductCard product={product.node} />
						<ProductCard product={product.node} />
						<ProductCard product={product.node} />
						<ProductCard product={product.node} />
					{/if}
				{/each}
			</Grid>
		{/await}
	</section>
{/if}