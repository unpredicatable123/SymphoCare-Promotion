<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import { reveal } from '#lib/reveal.ts';

	const scales = [
		{
			n: '01',
			title: 'Single clinic',
			who: 'Solo doctors and small clinics',
			points: ['One clinic and a small team', 'Patient records, consultations and e-prescriptions', 'Appointments, queue and billing', 'Pharmacy dispensing']
		},
		{
			n: '02',
			title: 'Growing practice',
			who: 'Multi-doctor clinics and coworking spaces',
			points: ['Several clinics or branches', 'Specialty EMR, investigations and laboratory', 'Pharmacy inventory and purchases', 'Smart Files AI document processing']
		},
		{
			n: '03',
			title: 'Hospital network',
			who: 'Hospital OPDs and clinic groups',
			points: ['Clinics and teams at scale', 'Full multi-specialty EMR', 'Expanded document intelligence', 'Priority escalation for your team']
		}
	];

	const faqs = [
		{ q: 'How do we get pricing?', a: 'Contact our team. Clinics vary widely in the number of branches, users and capabilities they need, so we share pricing in a clear, tailored proposal once we understand your practice.' },
		{ q: 'Can we start small and grow?', a: 'Yes. Many clinics begin with the front desk, queue and consultations, then add laboratory, pharmacy, Smart Files AI or more branches later.' },
		{ q: 'Which commercial model is better for us?', a: 'A subscription keeps the upfront cost low and predictable. A one-time license with yearly maintenance suits organisations that prefer a capital purchase. We’ll help you compare both.' }
	];
</script>

<Seo
	title="Licensing"
	description="Adopt SymphoCare through a SaaS Subscription or a One-time License with Yearly Maintenance, scoped to your clinics, team and modules."
/>

<PageHero
	eyebrow="Licensing"
	sub="We keep the conversation focused on your practice — your clinics, your team and the care you deliver."
>
	{#snippet heading()}Choose the commercial model that fits <em>your practice.</em>{/snippet}
</PageHero>

<GuideStrip
	title="A good fit starts with a conversation."
	text="Explore both commercial models with the team, ask about optional capabilities like Smart Files AI, and agree the scope your clinic needs."
	href="/contact"
	cta="Discuss your setup"
/>

<section class="section warm-section">
	<div class="shell licensing-grid">
		<article class="license-card featured" {@attach reveal()}>
			<p class="eyebrow">01 · Recurring access</p>
			<h2>SaaS Subscription</h2>
			<p>Access SymphoCare through a recurring subscription, hosted and maintained for you. Discuss the clinics, users and capabilities suited to your practice.</p>
			<ul class="check-list">
				<li>Low, predictable upfront cost</li>
				<li>Hosted in the cloud — nothing to install</li>
				<li>New capabilities as the platform grows</li>
			</ul>
			<a class="button button-accent" href="/contact?interest=pricing&model=saas">Discuss this option <span>→</span></a>
		</article>
		<article class="license-card" {@attach reveal(100)}>
			<p class="eyebrow">02 · License and maintenance</p>
			<h2>One-time License + Yearly Maintenance</h2>
			<p>Choose a one-time software license with yearly maintenance. Discuss the scope and commercial terms with our team.</p>
			<ul class="check-list">
				<li>A one-time capital purchase</li>
				<li>Yearly maintenance for updates and support</li>
				<li>Scope agreed around your organisation</li>
			</ul>
			<a class="button button-primary" href="/contact?interest=pricing&model=license">Discuss this option <span>→</span></a>
		</article>
	</div>
</section>

<section class="section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">Scoped to your size</p>
			<h2>From one consulting room to a hospital network.</h2>
			<p>Either model can be shaped around where your practice is today — and where it’s heading.</p>
		</div>
		<div class="scale-grid">
			{#each scales as s, i (s.n)}
				<article {@attach reveal(i * 80)}>
					<span>{s.n}</span>
					<h3>{s.title}</h3>
					<small>{s.who}</small>
					<ul class="check-list">
						{#each s.points as p (p)}<li>{p}</li>{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section warm-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">A clear conversation</p>
			<h2>Start with your clinic. Build a proposal around your needs.</h2>
			<p class="lead spaced">
				Tell us about your care setting, branches, team and priorities. We’ll map appointments,
				consultations, laboratory, pharmacy, billing and optional capabilities to your practice,
				then discuss the commercial model in a tailored proposal.
			</p>
			<div class="cta-row">
				<a class="button button-primary" href="/contact?interest=pricing">Request pricing <span>→</span></a>
				<a class="button button-outline" href="/contact">Talk to SymphoCare</a>
			</div>
		</div>
		<div class="faq-list">
			{#each faqs as f, i (f.q)}
				<details open={i === 0}>
					<summary>{f.q}<span>+</span></summary>
					<p>{f.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.licensing-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
	.license-card {
		background: #fff;
		border: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		min-height: 420px;
		padding: 48px;
		transition:
			box-shadow 0.24s,
			translate 0.24s;
	}
	.license-card:hover {
		translate: 0 -3px;
		box-shadow: 0 14px 32px #0d2d2012;
	}
	.license-card h2 {
		margin: 8px 0 15px;
		font-size: 38px;
	}
	.license-card > p:not(.eyebrow) {
		color: var(--muted);
		max-width: 470px;
	}
	.license-card .check-list {
		margin-bottom: 30px;
	}
	.license-card .button {
		align-self: flex-start;
		margin-top: auto;
	}
	.featured {
		background: var(--forest-800);
		border-color: var(--forest-800);
		color: #fff;
	}
	.featured h2 {
		color: #fff;
	}
	.featured > p:not(.eyebrow),
	.featured .check-list {
		color: #d5e6d7;
	}
	.featured .eyebrow {
		color: var(--sun-light);
	}
	.featured .check-list li::before {
		background: var(--sun);
	}
	.scale-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 36px;
	}
	.scale-grid article {
		border-top: 2px solid var(--green-700);
		padding-top: 24px;
	}
	.scale-grid span {
		color: var(--green-700);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
	.scale-grid h3 {
		margin: 14px 0 4px;
		font-size: 28px;
	}
	.scale-grid small {
		color: var(--muted);
		font-weight: 700;
		font-size: 13px;
	}
	.spaced {
		margin: 22px 0 28px;
	}
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	@media (width <= 900px) {
		.scale-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}
	}
	@media (width <= 600px) {
		.licensing-grid {
			grid-template-columns: 1fr;
		}
		.license-card {
			min-height: 0;
			padding: 30px;
		}
		.license-card h2 {
			font-size: 32px;
		}
	}
</style>
