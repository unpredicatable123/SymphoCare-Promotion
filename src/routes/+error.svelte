<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>Page not found | SymphoCare</title></svelte:head>

<section class="page-hero error">
	<div class="shell">
		<p class="eyebrow eyebrow-light">{page.status}</p>
		<h1>This page has <em>wandered off.</em></h1>
		<p class="hero-sub">The page you were looking for isn’t here. Let’s get you back to the clinic.</p>
		<div class="actions">
			<a class="button button-accent" href="/">Back to home <span>→</span></a>
			<a class="button button-ghost" href="/contact">Book a Demo</a>
		</div>
	</div>
</section>

<style>
	.error {
		min-height: 60vh;
		display: grid;
		align-items: center;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
</style>
