<script>
import { JsonLd, MetaTags } from "svelte-meta-tags";
import { asText } from "@prismicio/helpers";

export let page;
export let site;
export let type;
export let uid;

/** Set up WebSite schema */
let siteUrl = new URL(site.site_domain.url);

let websiteSameAs = [];

if(site?.property?.data.facebook_url?.url) websiteSameAs.push(site.property.data.facebook_url.url);
if(site?.property?.data.instagram_url?.url) websiteSameAs.push(site.property.data.instagram_url.url);
if(site?.property?.data.tiktok_url?.url) websiteSameAs.push(site.property.data.tiktok_url.url);
if(site?.property?.data.twitter_url?.url) websiteSameAs.push(site.property.data.twitter_url.url);
if(site?.property?.data.youtube_url?.url) websiteSameAs.push(site.property.data.youtube_url.url);

let websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${siteUrl.origin}/#website`,
	"name": `${asText(site.site_title)}`,
	"url": `${siteUrl.origin}/`,
	"sameAs": websiteSameAs
};

if(site?.property?.data.name?.length > 0) {

	websiteSchema.publisher = {
		"@type": "Organization",
		"@id": `${siteUrl.origin}/#org`,
		"name": `Punk Peace`,
		"url": "https://punkpeace.world/",
		"logo": {
			"@type": "ImageObject",
			"contentUrl": "LOGO"
		}
	};

	if(site.property?.data.legal_name?.length > 0) websiteSchema.publisher.legalName = asText(site.property.data.legal_name).trim();
	if(site.property?.data.description?.length > 0) websiteSchema.publisher.description = asText(site.property.data.description).trim();
	if(site.property?.data.email?.length > 0) websiteSchema.publisher.email = asText(site.property.data.email).trim();
	if(site.property?.data.phone?.length > 0) websiteSchema.publisher.telephone = asText(site.property.data.phone).trim();
}

/**
 * WebPage Schema
 */
let pageSchema = {
	"@context": "http://schema.org",
	"@type": "WebPage",
	"@id": (site.landing_page?.uid == uid) ? `${siteUrl.origin}/` : `${siteUrl.origin}/${uid}/`,
	"mainContentOfPage": {
		"@type": "WebPageElement",
		"cssSelector": "#main-content"
	},
	"isPartOf": {
		"@id": `${siteUrl.origin}/#website`
	},
	"name": `${(page.data.title.length > 0) ? asText(page.data.title).trim() : ""}`,
	// "logo": ``,
	"url": (site.landing_page?.uid == uid) ? `${siteUrl.origin}/` : `${siteUrl.origin}/${uid}/`
}

if(page && page.last_publication_date) pageSchema.dateModified = `${page.last_publication_date}`;
if(page && page.first_publication_date) pageSchema.datePublished = `${page.first_publication_date}`;

let twitterHandle = undefined;

if(site?.property?.data.twitter_url?.url) {

	let match = site?.property?.data.twitter_url?.url.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);

	if(match?.groups?.handle) twitterHandle = `@${match.groups.handle}`;
}

</script>

<MetaTags
	title={(page.data.metadata_title.length > 0) ? asText(page.data.metadata_title).trim() : asText(page.data.title).trim()}
	titleTemplate={(site.site_title.length > 0) ? `%s | ${asText(site.site_title).trim()}` : `%s | Dropout`}
	description={asText(page.data.metadata_description).trim()}
	canonical={(site.landing_page?.uid == uid) ? `${siteUrl.origin}/` : `${siteUrl.origin}/${uid}/`}
	openGraph={{
		url: (site.landing_page?.uid == uid) ? `${siteUrl.origin}/` : `${siteUrl.origin}/${uid}/`,
		title: (page.data.metadata_title.length > 0) ? asText(page.data.metadata_title).trim() : asText(page.data.title).trim(),
		description: asText(page.data.metadata_description).trim(),
		images: [
			{
				url: (page.data.metadata_image?.social?.url || site.property?.data?.metadata_image?.social?.url),
				alt: (page.data.metadata_image?.social?.alt || site.property?.data?.metadata_image?.social?.alt),
				height: (page.data.metadata_image?.social?.dimensions?.height || site.property?.data?.metadata_image?.social?.dimensions?.height),
				width: (page.data.metadata_image?.social?.dimensions?.width || site.property?.data?.metadata_image?.social?.dimensions?.width)
			}
		],
		site_name: asText(site.site_title),
	}}
	twitter={{
		handle: twitterHandle,
		cardType: "summary_large_image",
		title: (page.data.metadata_title.length > 0) ? asText(page.data.metadata_title).trim() : asText(page.data.title).trim(),
		description: asText(page.data.metadata_description),
		image: (page.data.metadata_image?.social?.url || site.property?.data?.metadata_image?.social?.url),
		imageAlt: page.data.metadata_image?.alt
	}}
	facebook={{
		appId: ""
	}}
/>

<JsonLd schema={websiteSchema} output={"body"} />

{#if type == "page"}
	<JsonLd schema={pageSchema} output={"body"} />
{/if}
