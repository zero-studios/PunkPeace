import { json } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { shopifyStorefrontQuery } from "$lib/integrations/shopify/client";

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {

	let data = await request.json();
	let returnObj = {
		data: data,
		errors: []
	};

	if(!data.id) {

		returnObj.errors.push({
			message: "Cart ID is required to get cart"
		});

		return json(returnObj);
	}

	// TODO: do I need metafields?
	let query = `{
		cart(id: "gid://shopify/Cart/${data.id}") {
			attributes {
				key
				value
			}
			checkoutUrl
			cost {
				subtotalAmount {
					amount
				}
				totalAmount {
					amount
				}
			}
			createdAt
			discountAllocations {
				discountedAmount {
					amount
				}
			}
			discountCodes {
				applicable
				code
			}
			id
			note
			totalQuantity
			updatedAt
			lines(first: 20) {
				edges {
					node {
						attributes {
							key
							value
						}
						cost {
							amountPerQuantity {
								amount
							}
							compareAtAmountPerQuantity {
								amount
							}
							subtotalAmount {
								amount
							}
							totalAmount {
								amount
							}
						}
						discountAllocations {
							discountedAmount {
								amount
							}
						}
						id
						merchandise {
							... on ProductVariant {
								availableForSale
								currentlyNotInStock
								id
								image {
									altText
									height
									url
									width
								}
								product {
									handle
									id
									productType
									title
								}
								quantityAvailable
								requiresShipping
								sku
								title
							}
						}
						quantity
						sellingPlanAllocation {
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
			}
		}
	}`;

	let variables = {};
	let shopRequest = await shopifyStorefrontQuery(fetch, query, variables);

	if(shopRequest?.data?.errors) returnObj.errors = shopRequest.data.errors;
	if(shopRequest?.data?.cart) {

		returnObj.cart = shopRequest.data.cart;
	}

	/**
	 * Write stuff above this
	 */

	return json(returnObj);
};
