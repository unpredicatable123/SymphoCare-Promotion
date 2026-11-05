<script lang="ts">
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import { nav } from '#lib/site.ts';

	let open = $state(false);

	const isCurrent = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	$effect(() => {
		// close the mobile menu after navigation
		page.url.pathname;
		open = false;
	});
</script>

<header class="site-header">
	<div class="shell nav-shell">
		<a class="brand" href="/" aria-label="SymphoCare home">
			<Logo />
		</a>
		<nav class="desktop-nav" aria-label="Primary navigation">
			{#each nav as item (item.href)}
				<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>
			{/each}
		</nav>
		<a class="button button-primary nav-cta" href="/contact">Book a Demo <span>→</span></a>
		<button
			class="menu-button"
			type="button"
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			aria-controls="mobile-navigation"
			onclick={() => (open = !open)}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
	{#if open}
		<nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
			{#each nav as item (item.href)}
				<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>
			{/each}
			<a class="button button-primary" href="/contact">Book a Demo <span>→</span></a>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 20;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		background: #f8f7f2ee;
		border-bottom: 1px solid #dfe4dd99;
	}
	.nav-shell {
		display: flex;
		align-items: center;
		gap: 24px;
		height: 82px;
	}
	.brand {
		display: flex;
		align-items: center;
		margin-right: auto;
		width: 186px;
	}
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 22px;
		color: #3d4a42;
		font-size: 14px;
		font-weight: 700;
	}
	.desktop-nav a {
		border-bottom: 3px solid transparent;
		padding-block: 10px;
		transition:
			color 0.18s,
			border-color 0.22s;
	}
	.desktop-nav a:hover {
		color: var(--green-700);
	}
	.desktop-nav a[aria-current='page'] {
		color: var(--forest-800);
		border-bottom-color: var(--forest-800);
	}
	.nav-cta {
		padding: 12px 17px;
	}
	.menu-button {
		display: none;
		background: none;
		border: 0;
		padding: 10px;
		cursor: pointer;
	}
	.menu-button span {
		display: block;
		background: var(--forest-900);
		width: 23px;
		height: 2px;
		margin: 4px;
		transition:
			transform 0.22s,
			opacity 0.16s;
	}
	.menu-button[aria-expanded='true'] span:first-child {
		transform: translateY(6px) rotate(45deg);
	}
	.menu-button[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}
	.menu-button[aria-expanded='true'] span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}
	.mobile-nav {
		display: none;
	}

	@media (width <= 1020px) {
		.desktop-nav,
		.nav-cta {
			display: none;
		}
		.menu-button {
			display: block;
		}
		.mobile-nav {
			display: flex;
			flex-direction: column;
			gap: 14px;
			padding: 20px 24px 25px;
			border-top: 1px solid var(--line);
			background: var(--cream);
			font-weight: 700;
			animation: menu-enter 0.22s ease-out;
		}
		.mobile-nav a[aria-current='page']:not(:global(.button)) {
			background: var(--green-100);
			color: var(--forest-950);
			box-shadow: inset 3px 0 var(--forest-800);
			padding: 8px 14px;
		}
	}
</style>
