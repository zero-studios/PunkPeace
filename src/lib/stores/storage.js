import { get, readable, writable } from "svelte/store";

export const storage = writable({
	lazyLoad: null,
	navOpen: false,
	cartOpen: false,
	scrollLock: false
});