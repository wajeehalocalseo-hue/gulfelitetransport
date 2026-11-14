// Sends visitors on the free workers.dev address (and www) to the main domain with a permanent redirect,
// and serves the site's static files for every other host.
const MAIN = "gulfelitetransportgroup.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.endsWith(".workers.dev") || url.hostname === `www.${MAIN}`) {
      url.protocol = "https:";
      url.hostname = MAIN;
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    // The Riyadh city page moved to a keyword URL; the old address keeps its ranking by redirecting permanently.
    if (/^\/taxi-saudi-arabia\/riyadh-region\/riyadh\/?$/.test(url.pathname)) {
      url.pathname = "/riyadh-taxi-service";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
