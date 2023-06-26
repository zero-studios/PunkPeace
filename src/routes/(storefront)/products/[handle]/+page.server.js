import { error, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { helpers } from "$lib/integrations/prismic/client";
import { shopifyStorefrontQuery } from "$lib/integrations/shopify/client";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, params, parent, request, url }) {

	const data = await parent();
	const handle = params.handle;
	const searchParams = url.searchParams;

	let productRequest = await shopifyStorefrontQuery(fetch, `
		{
			product(handle: "${handle}") {
				availableForSale
				collections(first: 1) {
					edges {
						node {
							id
							title
						}
					}
				}
				description
				descriptionHtml
				handle
				id
				images(first: 10) {
					edges {
						node {
							altText
							height
							url
							width
						}
					}
				}
				isGiftCard
				metafields(identifiers: [{ namespace: "custom", key: "color_description" }]) {
					key
					value
				}
				options(first: 5) {
					id
					name
					values
				}
				productType
				seo {
					description
					title
				}
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
	`);

	/** --- Now, see if there is a prismic linked page --- */
	const prismic = get(helpers);

	let graphQuery = `{
		products {
			...productsFields
		}
	}`;

	let template = {};

	try {

		/** @type {import('@prismicio/client').Client} */
		const response = await prismic.client({ request, fetch }).getByUID("products", handle, {
			graphQuery: graphQuery
		}).catch(err => {
			throw error(400, err.message);
		});



		console.log("Prismic response", response?.data);

	} catch(error) {

		template = data?.product_template;

		/** Backup */
		console.log("data", data);

		console.log("ERROR", error);
	}

	return {
		product: productRequest?.data?.product,
		template: template,
		variant: searchParams.variant || null
	};
}