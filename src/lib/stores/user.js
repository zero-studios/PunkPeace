import { browser, dev } from "$app/environment";
import { writable } from "svelte/store";
import { localStore } from "$js/helpers/localstorage";

let localUser = (browser) ? JSON.parse(localStorage.getItem("user")) : null;

export const user = localStore("user", {
	data: {},
	shop: {
		size: (localUser?.shop?.size) ? localUser.shop.size : "M"
	},
	site: {
		darkMode: (localUser?.site?.darkMode) ? localUser.site.darkMode : false,
		debug: (dev && import.meta.env.VITE_DEBUG === "1") ? true : false
	},
	service: {
		shop: "v1"
	}
});