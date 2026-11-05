<script lang="ts">
	// Official SymphoCare logo (static/brand). `light` = variant for dark backgrounds.
	let { light = false, lazy = false }: { light?: boolean; lazy?: boolean } = $props();
</script>

<img
	class="logo"
	src={light ? '/brand/symphocare-logo-light.png' : '/brand/symphocare-logo.png'}
	alt="SymphoCare — Connected Care. Healthier Lives."
	width="900"
	height="197"
	loading={lazy ? 'lazy' : 'eager'}
	decoding="async"
/>

<style>
	.logo {
		width: 100%;
		height: auto;
	}
</style>
