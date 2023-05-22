import { error, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { helpers } from "$lib/stores/content";
import { shopifyStorefrontQuery } from "$lib/integrations/shopify/client";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch, params, parent, url }) {

	const data = await parent();
	const uid = params.uid;
	const searchParams = url.searchParams;

	let productRequest = await shopifyStorefrontQuery(fetch, `
		{
			product(handle: "${uid}") {
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

	return {
		product: productRequest.data.product,
		variant: searchParams.variant || null
	};
}