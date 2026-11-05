<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { useSmoothScroll } from '#lib/smooth-scroll.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	useSmoothScroll();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#133a29" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div id="page-top" aria-hidden="true"></div>
<a class="skip-link" href="#main">Skip to content</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	.skip-link {
		position: absolute;
		left: 16px;
		top: -60px;
		z-index: 50;
		background: var(--forest-800);
		color: #fff;
		padding: 10px 16px;
		border-radius: 5px;
		font-weight: 700;
	}
	.skip-link:focus {
		top: 12px;
	}
</style>
