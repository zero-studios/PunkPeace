/** @type {import('@sveltejs/adapter-vercel')} */
import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import tailwind from "tailwindcss";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ runtime: "nodejs18.x" }),
		alias: {
			"$css": "./src/lib/css",
			"$js": "./src/lib/js",
			"$slices": "./src/lib/components/slices",
		},
		prerender: {
			crawl: true,
			entries: []
		}
	},
	preprocess: preprocess({
		postcss: {
			plugins: tailwind
		},
		scss: {},
		preserve: ["ld+json"]
	})
};

export default config;
