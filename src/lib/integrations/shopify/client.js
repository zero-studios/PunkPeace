// import Shopify from "@shopify/shopify-api";
import { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "$env/static/private";

// export const shopifyClient = Shopify.Clients.Storefront("commonstate.myshopify.com", import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN);

export const shopifyStorefrontQuery = async (fetch, query, variables = {}, options = {}) => {

	try {

		const result = await fetch("https://punkpeace.myshopify.com/api/2023-04/graphql.json", {
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

// export const shopifyAdminQuery = async(query, variables, options = {
// 	method: "POST"
// }) => {

// 	try {

// 		const result = await axios({
// 			url: import.meta.env.VITE_SHOPIFY_ADMIN_API_ENDPOINT,
// 			method: options.method,
// 			headers: {
// 				"Content-type": "application/json",
// 				"X-Shopify-Access-Token": import.meta.env.VITE_SHOPIFY_PASSWORD
// 			},
// 			data: {
// 				query: query,
// 				variables: variables
// 			}
// 		});

// 		// const result = await fetch(import.meta.env.VITE_SHOPIFY_ADMIN_API_ENDPOINT, {
// 		// 	method: options.method,
// 		// 	mode: "no-cors",
// 		// 	headers: {
// 		// 		"Accept": "application/json",
// 		// 		"Content-type": "application/graphql",
// 		// 		"X-Shopify-Access-Token": import.meta.env.VITE_SHOPIFY_PASSWORD
// 		// 	},
// 		// 	body: JSON.stringify({ query, variables })
// 		// }).then((res) => res.json()).catch((error) => { console.log("err", error); });

// 		if(result.errors){
// 			console.log({ errors: result.errors, raw: result });
// 		} else if(!result || !result.data){
// 			console.log({ result });
// 			return "No results found.";
// 		}

// 		return result.data;

// 	} catch(error){
// 		console.log(error);
// 	}
// };
