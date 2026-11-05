<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/reveal.ts';

	let {
		eyebrow = 'Your next chapter in care',
		heading,
		text = 'See SymphoCare walk through a real clinic day — from the first token to the final bill — in a guided demo.',
		cta = 'Book a Demo',
		href = '/contact'
	}: { eyebrow?: string; heading: Snippet; text?: string; cta?: string; href?: string } = $props();
</script>

<section class="final-cta">
	<div class="shell cta-layout">
		<div {@attach reveal()}>
			<p class="eyebrow eyebrow-light">{eyebrow}</p>
			<h2>{@render heading()}</h2>
			<p class="cta-copy">{text}</p>
			<a class="button button-accent" {href}>{cta} <span>→</span></a>
		</div>
		<div class="cta-art" aria-hidden="true">
			<div class="ring r1"></div>
			<div class="ring r2"></div>
			<img src="/brand/symphocare-mark-light.png" alt="" width="300" height="296" loading="lazy" />
		</div>
	</div>
</section>

<style>
	.cta-layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		align-items: center;
		gap: 48px;
	}
	.cta-art {
		position: relative;
		display: grid;
		place-items: center;
		aspect-ratio: 1;
	}
	.cta-art img {
		width: 62%;
		height: auto;
		position: relative;
		opacity: 0.95;
	}
	.ring {
		position: absolute;
		border-radius: 50%;
		border: 1px solid #b9d99b38;
	}
	.r1 {
		inset: 0;
		background: radial-gradient(circle, #a9ce9a14, transparent 70%);
	}
	.r2 {
		inset: 14%;
		border-color: #f0c45c40;
	}
	@media (width <= 760px) {
		.cta-layout {
			grid-template-columns: 1fr;
		}
		.cta-art {
			max-width: 200px;
		}
	}
</style>
