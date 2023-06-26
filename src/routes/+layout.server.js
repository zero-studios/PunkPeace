import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { helpers } from "$lib/integrations/prismic/client";

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
			default_product_template {
				...default_product_templateFields
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
	let pageData = response?.data?.landing_page?.data;
	let siteData = response?.data;

	if(siteData.landing_page) delete siteData.landing_page;

	return {
		site: siteData,
		page: pageData,
		product_template: response?.data?.default_product_template?.data,
		cart: cart
	};
}
