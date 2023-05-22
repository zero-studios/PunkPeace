import * as prismic from "@prismicio/client";
import sm from "./slicemachine.config.json";

const repoName = sm.repositoryName;
const accessToken = import.meta.env.PRISMIC_ACCESS_TOKEN;

console.log(repoName, accessToken);

/** @type {import("@prismicio/client").ClientConfig["routes"]} */
const routes = [
	{
		type: "page",
		path: "/:uid",
	},
	{
		type: "products",
		path: "/products/:uid"
	},
	{
		type: "collections",
		path: "/collections/:uid"
	}
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 */
/** @type {import("@prismicio/client").CreateClient} */
const createClient = ({ request, fetch } = {}) => {

	const clientOptions = {
		fetch,
		accessToken,
		routes
	};

	const client = prismic.createClient(repoName, clientOptions);

	if(request) {
		client.enableAutoPreviewsFromReq(request);
	}

	return client;
};

export default createClient;