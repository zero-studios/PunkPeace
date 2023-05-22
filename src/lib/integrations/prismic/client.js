import { PRISMIC_API_URL, PRISMIC_ACCESS_TOKEN, PRISMIC_PREVIEW_TOKEN } from "$env/static/private";
import * as prismic from "@prismicio/client";

const apiEndpoint = PRISMIC_API_URL;
const accessToken = PRISMIC_ACCESS_TOKEN;

/** @type {import('@prismicio/client').CreateClient} */
const createClient = ({ request, fetch, token } = {}) => {

	/** --- Set our options --- */
	let options = {
		accessToken
	};

	if(token) {
		options.ref = token;
		options.accessToken = PRISMIC_PREVIEW_TOKEN;
	}

	/** --- Fetch addition if needed --- */
	if(fetch) options.fetch = fetch;

	const client = prismic.createClient(apiEndpoint, options)

	/** --- case for request --- */
	if(request) {
		client.enableAutoPreviewsFromReq(request);
	}

	/** --- Set our client --- */
	return client;
};

export default createClient;
