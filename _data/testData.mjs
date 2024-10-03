import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "https://api.github.com/repos/11ty/eleventy";

	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
};