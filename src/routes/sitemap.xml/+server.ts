import { site } from '#lib/site.ts';

export const prerender = true;

const pages = ['/', '/platform', '/smart-files', '/solutions', '/security', '/licensing', '/about', '/contact'];

export function GET() {
	const urls = pages
		.map((p) => `<url><loc>${site.url}${p === '/' ? '/' : p}</loc><changefreq>monthly</changefreq></url>`)
		.join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
