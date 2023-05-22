<script>
import Debug from "$lib/components/Debug.svelte";
import ProductCard from "$lib/components/shop/ProductCard.svelte";
import { JsonLd } from "svelte-meta-tags";

export let data;

let scroll;

/**
 * Collection schema
 */
$: collectionSchema = {
	"@context" : "http://schema.org",
	"@type": "CollectionPage",
	"name": `${data?.collection?.title}`,
	"url": `https://store.dropout.tv/collections/${data?.collection?.handle}/`,
	"description": `${data?.collection?.description}`,
	"image": data?.collection?.image?.url || null,
	"mainEntity" : {
		"@type":"ItemList",
		"itemListElement": (data?.collection?.products) ? data.collection.products.edges.map((p, i) => ({ "@type": "ListItem", "position": ((i + 1) + (data.pagination.perPage * (data.pagination.page - 1))), "url": `https://store.dropout.tv/products/${p.node.handle}/` })) : ""
	}
};
</script>

<svelte:window bind:scrollY={scroll}></svelte:window>

<Debug object={data?.collection} title={data?.collection?.title || "Collection"} />

<div class="w-full flex flex-col justify-center pt-[120px] pb-[60px] cx">
	{#if data?.collection}
		{#key data.pagination.key}
			<div class="max-w-4xl">
				<h1>{data.collection.title}</h1>
				<div>{@html data.collection.descriptionHtml}</div>
			</div>

			<!-- <Debug object={data.collection} /> -->

			<div class="grid gap-[20px] dk:gap-[40px] xs:grid-cols-2 dk:grid-cols-3 xl:grid-cols-4">
				{#each data.collection.products.edges as product}
					<ProductCard product={product.node} />
				{/each}
			</div>
			{#if data.collection.products?.pageInfo?.hasPreviousPage}
				<a href="?before={data.collection.products.pageInfo.startCursor}&page={data.pagination.page - 1}" class="btn btn-primary">Previous Page</a>
			{/if}
			{#if data.collection.products?.pageInfo?.hasNextPage}
				<a href="?after={data.collection.products.pageInfo.endCursor}&page={data.pagination.page + 1}" class="btn btn-primary">Next Page</a>
			{/if}

			<JsonLd schema={collectionSchema} output={"body"} />
		{/key}
	{/if}
</div>