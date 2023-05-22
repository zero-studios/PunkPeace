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

	console.log("existing lines", data.lines);

	let callType = "cartCreate";
	let callInput = "$input: CartInput!";
	let callVars = "input: $input"

	if(data.cart) {
		callType = "cartLinesAdd";
		callInput = "$cartId: ID!, $lines: [CartLineInput!]!";
		callVars = "cartId: $cartId, lines: $lines";
	}

	/** --- Setup line object --- */
	let lines = (data.lines) ? JSON.parse(data.lines) : [];
	let add = true;
	let update = 0;

	/** --- Check previous lines for new product addition --- */
	[...lines].forEach((line, key) => {

		let match = 0;

		// console.log("attr", (data.attributes && JSON.stringify(line.attributes) == data.attributes) || !data.attributes && line.attributes.length <= 0);

		/** --- check if attributes match --- */
		if((data.attributes && JSON.stringify(line.attributes) == data.attributes) || !data.attributes && line.attributes.length <= 0) {
			++match;
		}

		// console.log("sellingPlan", data.sellingPlanId === line.sellingPlanId);

		/** --- Check for sellingPlanId --- */
		if(data.sellingPlanId === line.sellingPlanId) {
			++match;
		}

		// console.log("id", data.variant === line.merchandiseId);

		/** --- check if variant ID matches --- */
		if(data.variant === line.merchandiseId) {
			++match;
		}

		/** --- block addition of product, increase quantity of line --- */
		if(match >= 3) {

			add = false;
			line.quantity = line.quantity + parseInt(data.quantity);

			/** --- update one product --- */
			callType = "cartLinesUpdate";
			callInput = "$cartId: ID!, $lines: [CartLineUpdateInput!]!";
			lines = line;

			return;
		}
	});

	/** --- add one product --- */
	if(typeof data.variant === "string" && add === true) {

		lines = [{
			merchandiseId: data.variant,
			quantity: parseInt(data.quantity)
		}];
	}

	let variables = {
		input: {
			lines: lines
		}
	};

	if(data.cart) {

		variables = {
			cartId: `gid://shopify/Cart/${data.cart}`,
			lines: lines
		}
	}

	// TODO: do I need metafields?
	let query = `mutation ${callType}(${callInput}) {
		${callType}(${callVars}) {
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
			userErrors {
				field
				message
			}
		}
	}`;

	// console.log(query, variables);

	let shopRequest = await shopifyStorefrontQuery(fetch, query, variables);

	// console.log("req", shopRequest?.data);

	if(shopRequest?.data?.errors) returnObj.errors = shopRequest.data.errors;
	if(shopRequest?.data[callType]?.cart) {

		returnObj.cart = shopRequest.data[callType]?.cart;

		let domain = "punkpeace.world";

		if(dev) domain = "127.0.0.1";

		// console.log(returnObj.cart);

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
