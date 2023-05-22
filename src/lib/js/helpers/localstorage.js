/**
 * @fileOverview This function will sync a store to localstorage, useful for saving things like user preferences without a database
 */
import { writable as internal, get } from "svelte/store";

const stores = {};

export function localStore(key, initialValue){

	const browser = typeof(localStorage) != "undefined";

	function updateStorage(key, value){

		if(!browser) return;

		localStorage.setItem(key, JSON.stringify(value));
	}

	if(!stores[key]){

		const store = internal(initialValue, (set)=>{

			const json = browser ? localStorage.getItem(key) : null;

			if(json){
				set(JSON.parse(json));
			}

			if(browser){

				const handleStorage = (event)=>{

					if(event.key === key){
						set(event.newValue ? JSON.parse(event.newValue) : null);
					}
				};

				window.addEventListener("storage", handleStorage);

				return () => window.removeEventListener("storage", handleStorage);
			}
		});

		const { subscribe, set } = store;

		stores[key] = {
			set(value){

				updateStorage(key, value);
				set(value);
			},
			update(value){

				// console.log("updater", updater);
				// const value = updater(get(store));

				updateStorage(key, value);
				set(value);
			},
			subscribe
		}
	}

	return stores[key];
}
