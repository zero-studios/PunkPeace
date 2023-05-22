import { error, json, redirect } from "@sveltejs/kit";
import { shopifyStorefrontQuery } from "$lib/integrations/shopify/client";

/** @type {import('./$types').RequestHandler} */
export async function POST({ fetch, params, parent, request, url }) {

	const handle = params.handle;
	const searchParams = url.searchParams;

	// TODO: Filter/sorting
	// console.log(url, params, searchParams, data);

	let page = searchParams.get("page") || 1;
	let perPage = 48;
	let after = searchParams.get("after") || null;
	let before = searchParams.get("before") || null;
	let direction = (before) ? "last" : "first";

	let filterString = `${direction}: ${perPage}`;

	if(after) filterString += `, after: "${after}"`;
	if(before) filterString += `, before: "${before}"`;

	let sort = searchParams.get("sort") || "COLLECTION_DEFAULT";

	// console.log(filterString);

	let collectionRequest = await shopifyStorefrontQuery(fetch, `
		{
			collection(handle: "${handle}") {
				description
				descriptionHtml
				handle
				id
				image {
					altText
					url
				}
				products(${filterString}, sortKey: ${sort}) {
					edges {
						node {
							availableForSale
							description
							featuredImage {
								altText
								height
								url
								width
							}
							handle
							id
							options(first: 5) {
								id
								name
								values
							}
							productType
							tags
							title
							totalInventory
							variants(first: 99) {
								edges {
									node {
										availableForSale
										compareAtPrice {
											amount
										}
										currentlyNotInStock
										id
										image {
											altText
											height
											url
											width
										}
										price {
											amount
										}
										quantityAvailable
										requiresShipping
										sellingPlanAllocations(first: 10) {
											edges {
												node {
													checkoutChargeAmount {
														amount
													}
													priceAdjustments {
														compareAtPrice {
															amount
														}
														price {
															amount
														}
													}
													remainingBalanceChargeAmount {
														amount
													}
													sellingPlan {
														description
														id
														name
														options {
															name
															value
														}
													}
												}
											}
										}
										sku
										title
									}
								}
							}
							vendor
						}
					}
					pageInfo {
						endCursor
						hasNextPage
						hasPreviousPage
						startCursor
					}
				}
				title
			}
		}
	`);

	if(collectionRequest?.data?.collection === null) throw new error(404, { message: "Page Not Found" });

	let responseData = {
		collection: collectionRequest?.data?.collection,
		pagination: {
			page: parseInt(page),
			perPage: perPage,
			key: collectionRequest?.data?.collection?.products?.pageInfo?.startCursor || collectionRequest?.data?.collection?.handle // always the "first" cursor
		}
	};

	return json(responseData);
}