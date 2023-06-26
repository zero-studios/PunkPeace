import { get, readable, writable } from "svelte/store";

export const helpers = readable({
	linkResolver: (document) => {

		/** External? */
		if(document.link_type == "Web") {

			let url = `${document.url}`;

			return `${url}`;
		}

		if(document.link_type == "") {

		}

		let landingPage = get(landing);

		/** Home */
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
