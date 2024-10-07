import EleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
    let url = "https://purple-pine-028c.leith-green.workers.dev/";

    // Fetch the raw response
    const response = await EleventyFetch(url, {
        duration: "1d",
        type: "text"  
    });

    const data = JSON.parse(response);

    return data;
}

