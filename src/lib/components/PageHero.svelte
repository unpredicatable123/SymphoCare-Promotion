<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		heading,
		sub,
		children
	}: { eyebrow: string; heading: Snippet; sub?: string; children?: Snippet } = $props();
</script>

<section class="page-hero">
	<img class="hero-watermark" src="/brand/symphocare-mark-light.png" alt="" width="300" height="296" aria-hidden="true" />
	<div class="shell">
		<p class="eyebrow eyebrow-light">{eyebrow}</p>
		<h1>{@render heading()}</h1>
		{#if sub}<p class="hero-sub">{sub}</p>{/if}
		{@render children?.()}
	</div>
</section>

<style>
	.hero-watermark {
		position: absolute;
		right: -60px;
		bottom: -70px;
		width: 420px;
		height: auto;
		opacity: 0.07;
		pointer-events: none;
	}
	@media (width <= 600px) {
		.hero-watermark {
			width: 260px;
			right: -60px;
			bottom: -40px;
		}
	}
</style>
