import type { APIRoute } from "astro";
import { SITE } from "../consts";

export const GET: APIRoute = ({ site }) => {
  const baseURL = site ?? new URL(SITE.website);
  const sitemapURL = new URL("/sitemap-index.xml", baseURL).toString();

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapURL}`,
    `Host: ${baseURL.host}`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
