<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { site } from '#lib/site.ts';

	const principles = [
		{ title: 'One shared record', text: 'A patient’s visit shouldn’t be retyped at every counter. Every SymphoCare workspace reads from — and writes to — the same record.' },
		{ title: 'Each team sees what it needs', text: 'Front desk, doctors, lab, pharmacy and patients each get a workspace shaped for their work, with access governed by role.' },
		{ title: 'AI that assists, never decides', text: 'Our AI reads and suggests. Clinicians and staff confirm. Nothing reaches the medical record without a person’s review.' },
		{ title: 'Records you can trust', text: 'Completed records are locked, payments are reversed rather than edited, and important actions leave an audit trail.' },
		{ title: 'Built for Indian clinics', text: 'UPI payments, GST-ready billing, the Jan Aushadhi catalogue and AYUSH case forms — designed in, not added later.' },
		{ title: 'Honest about what’s next', text: 'We tell you clearly what SymphoCare does today and what is on the roadmap — so you can plan with confidence.' }
	];
</script>

<Seo
	title="About"
	description="SymphoCare is built by SymphoZen Labs — the team behind SymphoServe — to bring connected, calmer days to clinics across India."
/>

<PageHero eyebrow="About SymphoCare" sub="SymphoCare is a connected clinic platform from SymphoZen Labs, built for the realities of outpatient care in India.">
	{#snippet heading()}Connected care. <em>Healthier lives.</em>{/snippet}
</PageHero>

<section class="section">
	<div class="shell about-grid">
		<div {@attach reveal()}>
			<p class="eyebrow">Why we built SymphoCare</p>
			<h2>Clinics run on handoffs. We wanted every handoff to land.</h2>
		</div>
		<div class="about-copy" {@attach reveal(120)}>
			<p class="lead">
				In most clinics, the front desk, the doctor, the lab and the pharmacy each keep their own
				version of the patient. Prescriptions are re-typed, reports go missing in folders, and the
				owner only sees the day once it’s over.
			</p>
			<p>
				SymphoCare brings those workflows onto one shared patient record — from the token a patient
				receives at the door to the report they read at home. It supports solo practitioners,
				multi-doctor clinics, medical coworking spaces, hospital OPDs, diagnostic centres and
				in-clinic pharmacies, across conventional, AYUSH and functional medicine.
			</p>
		</div>
	</div>
</section>

<section class="section warm-section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">What guides us</p>
			<h2>The principles behind the platform.</h2>
		</div>
		<div class="principles">
			{#each principles as p, i (p.title)}
				<article {@attach reveal((i % 3) * 80)}>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section dark-section">
	<div class="shell presence">
		<div {@attach reveal()}>
			<p class="eyebrow eyebrow-light">SymphoZen Labs</p>
			<h2>The team behind <em>SymphoCare and SymphoServe.</em></h2>
		</div>
		<div class="presence-copy" {@attach reveal(120)}>
			<p>
				SymphoZen Labs builds connected operating platforms for the businesses that look after
				people. SymphoCare brings that approach to healthcare; its sibling, SymphoServe, does the
				same for restaurants.
			</p>
			<p>We’re based in {site.presence}.</p>
			<div class="links">
				<a class="text-link light-link" href={site.companyUrl} rel="noopener">Visit SymphoZen Labs ↗</a>
				<a class="text-link light-link" href="https://www.symphoserve.com/" rel="noopener">Discover SymphoServe ↗</a>
			</div>
		</div>
	</div>
</section>

<FinalCta>
	{#snippet heading()}Let’s write your clinic’s<br /><em>next chapter together.</em>{/snippet}
</FinalCta>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: start;
	}
	.about-copy p + p {
		margin-top: 22px;
	}
	.principles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 40px 36px;
	}
	.principles article {
		border-top: 2px solid var(--green-700);
		padding-top: 24px;
	}
	.principles h3 {
		margin-bottom: 12px;
		font-size: 25px;
		line-height: 1.3;
	}
	.principles p {
		color: var(--muted);
	}
	.presence {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: center;
	}
	.presence-copy {
		color: #d5e6d7;
		font-size: 18px;
	}
	.presence-copy p + p {
		margin-top: 18px;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}
	@media (width <= 900px) {
		.about-grid,
		.presence {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.principles {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.principles {
			grid-template-columns: 1fr;
		}
	}
</style>
