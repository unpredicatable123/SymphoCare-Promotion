import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { afterNavigate } from '$app/navigation';
import { onMount } from 'svelte';

/**
 * Inertial smooth scrolling for the whole site (Lenis).
 * - Skipped entirely for visitors who prefer reduced motion.
 * - Touch devices keep native scrolling (Lenis default).
 * - In-page anchor links glide to their target; the sticky-header offset comes from
 *   `scroll-padding-top` in app.css, which Lenis honours.
 * Call once from the root layout.
 */
export function useSmoothScroll() {
	let lenis: Lenis | undefined;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		lenis = new Lenis({
			lerp: 0.1,
			wheelMultiplier: 1,
			autoRaf: true,
			anchors: true
		});
		return () => {
			lenis?.destroy();
			lenis = undefined;
		};
	});

	// Keep Lenis in step with SvelteKit client-side navigation.
	afterNavigate(({ type, to }) => {
		if (!lenis || type === 'enter') return;
		lenis.resize(); // new page height
		const hash = to?.url.hash;
		const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
		if (target) {
			lenis.scrollTo(target, { immediate: type !== 'link' });
		} else if (type !== 'popstate') {
			lenis.scrollTo(0, { immediate: true, force: true });
		}
	});
}
