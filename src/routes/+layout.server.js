import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { helpers } from "$lib/stores/content";

export const trailingSlash = "always";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	let host = url.hostname;

	const prismic = get(helpers);

	let graphQuery = `{
		site {
			...siteFields
			landing_page {
				...landing_pageFields
				slices {
					...on module_group {
						variation {
							...on default {
								primary {
									...primaryFields
									group {
										...groupFields
									}
								}
							}
						}
					}
				}
			}
		}
	}`;

	/** @type {import('@prismicio/client').Client} */
	const response = await prismic.client({ request, fetch }).getByUID("site", "site", {
		graphQuery: graphQuery
	}).catch(err => {
		throw error(400, err.message);
	});

	/**
	 * ecommerce
	 */
	let cart = cookies.get("cart");

	return {
		page: response?.data?.landing_page?.data,
		cart: cart
	};
}
