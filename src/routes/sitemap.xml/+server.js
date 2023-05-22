import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { helpers } from "$lib/stores/content";
import { findAllByParam } from "$js/helpers/flatten";

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, params, request, url }) {

	let host = url.hostname;

	let devArray = [
		"dropout.vercel.app",
		"127.0.0.1",
		"localhost"
	];

	/** --- Get our stores --- */
	const prismic = get(helpers);

	/** --- Get linked fields from Property (Show) via GraphQL --- */
	let graphQuery = `{
		site {
			...siteFields
			property {
				...propertyFields
			}
			landing_page {
				...landing_pageFields
			}
			header_navigation {
				...header_navigationFields
				links {
					...linksFields
					document_or_group {
						...on page {
							...pageFields
						}
						...on link_list {
							...link_listFields
							links {
								...linksFields
							}
						}
					}
				}
			}
			footer_navigation {
				...footer_navigationFields
				links {
					...linksFields
					document_or_group {
						...on page {
							...pageFields
						}
						...on link_list {
							...link_listFields
							links {
								...linksFields
							}
						}
					}
				}
			}
		}
	}`;

	const response = await prismic.client({ request, fetch }).getAllByType("site", {
		graphQuery: graphQuery
	}).catch(err => {
		throw error(400, err.message);
	});

	let siteData = response;

	/** --- See if our landing page exists --- */
	let page;
	let website;

	[...siteData].forEach((site, index) => {

		if(site.data?.site_domain?.url?.indexOf(host) > -1) {

			website = site;
			page = site.data.landing_page?.uid;
		}
	});

	/** --- Error page if no landing page content --- */
	if(!page && url.pathname.indexOf("preview") === -1) {
		throw error(404, "Not found");
	}

	let siteLinks = [];

	/** --- Get Header --- */
	if(website.data.header_navigation && website.data.header_navigation.uid) {

		siteLinks = findAllByParam(siteLinks, website.data.header_navigation.data.links, "uid", true);
	}

	/** --- Get Footer --- */
	if(website.data.footer_navigation && website.data.footer_navigation.uid) {

		siteLinks = findAllByParam(siteLinks, website.data.footer_navigation.data.links, "uid", true);
	}

	/** Remove duplicates */
	if(siteLinks.length > 0) {
		siteLinks.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
	}

	let domain = website.data?.site_domain?.url.replace("www.", "");

	/** Remove trailing slash from domain */
	domain = (domain[domain.length - 1] === "/") ? domain.slice(0, -1) : domain;

	let sitemapLinks = [];

	/** Static pages */
	let landing = {
		loc: "/",
		lastmod: website.data?.landing_page?.last_publication_date,
		changefreq: "monthly",
		priority: "1"
	};

	sitemapLinks.push(landing);

	/** Dynamic linked pages */
	[...siteLinks].forEach((page) => {
		sitemapLinks.push({
			loc: page.uid,
			lastmod: page.last_publication_date,
			changefreq: "monthly",
			priority: "0.6"
		});
	});

	// TODO: Make sure if we do subpage routing, that it's accounted for
	return new Response(
	`
	<?xml version="1.0" encoding="UTF-8" ?>
	<urlset
		xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xhtml="https://www.w3.org/1999/xhtml"
		xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
		xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
		xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
		xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
	>
		${sitemapLinks.map((item) => `<url>
			<loc>${(item.loc === "/") ? domain : domain + "/" + item.loc}/</loc>
			<lastmod>${item.lastmod}</lastmod>
			<changefreq>${item.changefreq}</changefreq>
			<priority>${item.priority}</priority>
		</url>`).join("")}
	</urlset>`.trim(),
	{
		headers: {
			"Content-Type": "application/xml"
		}
	});
}
