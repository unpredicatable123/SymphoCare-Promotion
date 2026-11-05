<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';

	let { title, description = site.description }: { title: string; description?: string } = $props();

	const fullTitle = $derived(title.includes('SymphoCare') ? title : `${title} | SymphoCare`);
	const canonical = $derived(site.url + (page.url.pathname === '/' ? '/' : page.url.pathname));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/brand/symphocare-logo.png" />
	<meta name="twitter:card" content="summary" />
</svelte:head>
