import fs from "node:fs";

const file = ".vercel/output/config.json";
const config = {
	...JSON.parse(fs.readFileSync(file, "utf-8")),
	images: {
		"sizes": [20, 240, 360, 480, 640, 800, 1040, 1280, 1540, 1600, 1880],
		"domains": [
			"images.prismic.io"
		],
		"minimumCacheTTL": (60 * 60 * 24),
		"formats": [
			"image/avif",
			"image/webp"
		],
		"remotePatterns": [{
			"protocol": "https",
			"hostname": "^images\\.prismic\\.io$",
			"pathname": "^/pathway/.*$"
		}]
	}
};

fs.writeFileSync(file, JSON.stringify(config, null, 2));
