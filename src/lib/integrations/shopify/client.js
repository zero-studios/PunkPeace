import { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/private";

const year = new Date().getFullYear();

export const shopifyStorefrontQuery = async (fetch, query, variables = {}, options = {}) => {

	try {

		const result = await fetch(`https://punkpeace.myshopify.com/api/${year}-04/graphql.json`, {
			method: options.method || "POST",
			headers: options.headers || {
				"Content-type": "application/json",
				"X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN
			},
			body: JSON.stringify({ query, variables })
		}).catch((error) => {
			console.error(error);
		});

		let data = await result.json();

		return data;

	} catch(error){
		console.log(error);
	}
};

export const shopifyAdminQuery = async (fetch, query, variables = {}, options = {}) => {

	try {

		const result = await fetch(`https://punkpeace.myshopify.com/admin/api/${year}-04/graphql.json`, {
			method: options.method || "POST",
			headers: options.headers || {
				"Content-type": "application/json",
				"X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN
			},
			body: JSON.stringify({ query, variables })
		}).catch((error) => {
			console.error(error);
		});

		let data = await result.json();

		return data;

	} catch(error){
		console.log(error);
	}
};
