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

	/** --- Setup line object --- */
	let variables;
	let callType = "cartLinesUpdate";
	let lines = (data.lines) ? data.lines : [];

	if(!data.cart) {

		returnObj.errors.push("Cart ID is required to update");

		return json(returnObj);
	}

	if(data.cart) {

		let lineObject = lines.map((i) => {
			return {
				attributes: i.node.attributes,
				id: i.node.id,
				merchandiseId: i.node.merchandise.id,
				quantity: i.node.quantity
			};
		});

		variables = {
			cartId: `gid://shopify/Cart/${data.cart}`,
			lines: lineObject
		}
	}

	let query = `mutation ${callType}($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		${callType}(cartId: $cartId, lines: $lines) {
			cart {
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
										metafields(identifiers: [{ namespace: "custom", key: "color_description" }]) {
											key
											value
										}
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
						}
					}
				}
			}
			userErrors {
				field
				message
			}
		}
	}`;

	let shopRequest = await shopifyStorefrontQuery(fetch, query, variables);

	if(shopRequest?.data?.errors) returnObj.errors = shopRequest.data.errors;
	if(shopRequest?.data[callType]?.cart) {

		returnObj.cart = shopRequest.data[callType]?.cart;

		let domain = "punkpeace.world";

		if(dev) domain = "127.0.0.1";

		let cartId = shopRequest.data[callType].cart.id.replace("gid://shopify/Cart/", "");
		let date = new Date();

		returnObj.cartId = cartId;

		date.setDate(date.getDate() + 30);

		cookies.set("cart", cartId, { path: "/", domain: domain, expires: date });
	}

	/**
	 * Write stuff above this
	 */

	return json(returnObj);
};
