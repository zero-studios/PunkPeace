/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

	let lastChar = event.url.pathname.charAt(event.url.pathname.slice(-1));

	/** --- Force trailing --- */
	if(lastChar != "/") {
		console.log("no trialing slash?");
	}

	const response = await resolve(event);

	return response;
}
