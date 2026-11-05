import type { Attachment } from 'svelte/attachments';

/**
 * Fade-and-rise elements into view as they scroll in.
 * The hidden state is only applied once JS runs, so content is always visible without JS.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (node) => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const rect = node.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.9) return; // already on screen: don't hide it

		node.classList.add('reveal');
		node.style.transitionDelay = `${delay}ms`;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add('is-visible');
						io.disconnect();
					}
				}
			},
			{ rootMargin: '0px 0px -8% 0px' }
		);
		io.observe(node);
		return () => io.disconnect();
	};
}
