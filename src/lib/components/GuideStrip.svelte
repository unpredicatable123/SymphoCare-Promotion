<script lang="ts">
	// Counterpart of SymphoServe's "A little guidance from Symba" strip, led by the SymphoCare lotus.
	let {
		eyebrow = 'A little guidance',
		title,
		text,
		href,
		cta
	}: { eyebrow?: string; title: string; text: string; href: string; cta: string } = $props();
</script>

<aside class="guide-strip" aria-label={eyebrow}>
	<div class="shell guide-strip-inner">
		<img class="guide-lotus" src="/brand/symphocare-mark.png" alt="" width="72" height="72" loading="lazy" />
		<div>
			<p class="eyebrow">{eyebrow}</p>
			<h2>{title}</h2>
			<p>{text}</p>
		</div>
		<a class="text-link" {href}>{cta} <span aria-hidden="true">→</span></a>
	</div>
</aside>

<style>
	.guide-lotus {
		width: 72px;
		height: 72px;
		background: #fff;
		border: 1px solid #e2e2d4;
		border-radius: 50%;
		padding: 6px;
	}
</style>
