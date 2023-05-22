import { get, readable, writable } from "svelte/store";
import createClient from "$lib/integrations/prismic/client";

export const helpers = readable({
	/** @type {import('@prismicio/client').CreateClient} */
	client: createClient,
	linkResolver: (document) => {

		if(document.link_type == "Web") {

			let url = `${document.url}`;

			return `${url}`;
		}

		let landingPage = get(landing);

		if(document.uid === landingPage.uid) {
			return "/";
		}

		return `/${document.uid}/`;
	}
});

export const site = writable({});
export const landing = writable(null);
export const pages = writable([]);
export const collections = writable([]);
export const products = writable([]);
