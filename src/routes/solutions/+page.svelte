<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { UserRound, Users, Network, Building2, Microscope, Pill, Leaf, HeartPulse } from '@lucide/svelte';

	const settings = [
		{
			icon: UserRound,
			title: 'Solo practitioners',
			text: 'Everything you need to run your practice from one calm workspace — with a small team or none at all.',
			points: ['Appointments and walk-in tokens', 'Visit pad and signed e-prescriptions', 'Consultation-fee billing with UPI', 'Patient portal for reports and prescriptions']
		},
		{
			icon: Users,
			title: 'Multi-doctor clinics',
			text: 'Give every doctor a cabin, a queue and a schedule — while the front desk sees the whole clinic day.',
			points: ['Doctor shifts with patient caps', 'Cabin mapping and per-doctor tokens', 'Waiting-room TV for up to 6 cabins per screen', 'Role-based access for each team member']
		},
		{
			icon: Network,
			title: 'Medical coworking spaces',
			text: 'Independent doctors share one front desk, one waiting room and one display — each with their own shifts and patients.',
			points: ['Shared reception, separate doctor schedules', 'Per-doctor queues on one shared TV', 'Doctor-set consultation fees', 'Clinic-wide MIS for the space operator']
		},
		{
			icon: Building2,
			title: 'Hospital OPDs and clinic groups',
			text: 'Connect OPD consultations with in-house lab, pharmacy and billing — and run several branches under one organisation.',
			points: ['Organisation with multiple clinics', 'Clinic selector for staff across branches', 'Records scoped to each clinic', 'Financial and operational reports per clinic']
		},
		{
			icon: Microscope,
			title: 'Diagnostic centres and labs',
			text: 'Move from sample to verified report with clear worklists, priorities and release to the patient.',
			points: ['Routine, urgent and STAT priorities', 'Barcodes, labels and sample tracking', 'Reference ranges with critical flags', 'Numbered reports and online verification page']
		},
		{
			icon: Pill,
			title: 'In-clinic pharmacies',
			text: 'Dispense against the doctor’s finalised prescription, with stock kept honest automatically.',
			points: ['Live queue of finalised prescriptions', 'Batch, lot and expiry-aware dispensing', 'Purchase invoices, suppliers and returns', 'Dispensing, stock and movement reports']
		},
		{
			icon: Leaf,
			title: 'AYUSH practices',
			text: 'Homeopathy, Ayurveda and Siddha practitioners get case forms built for their system — not bolted on.',
			points: ['Dedicated Homeopathy case form', 'Dedicated Ayurveda case form', 'Dedicated Siddha case form', 'AYUSH medicine classification in the catalogue']
		},
		{
			icon: HeartPulse,
			title: 'Functional medicine',
			text: 'Capture the detail functional medicine needs, and follow a patient’s results across visits.',
			points: ['Functional-medicine case form', 'Smart Files AI for outside lab reports', 'AI report comparison across 2–4 reports', 'Trend view with PDF export']
		}
	];

	const roles = [
		{ name: 'Owner', text: 'Everything a Clinic Admin can do, plus organisation-level management.' },
		{ name: 'Clinic Admin', text: 'Team, settings, catalogues, billing oversight and reports.' },
		{ name: 'Doctor', text: 'Consults, prescribes, orders investigations, calls the queue and reviews results.' },
		{ name: 'Nurse / Clinical Assistant', text: 'Records vitals and supports the queue — assignable to specific doctors.' },
		{ name: 'Receptionist', text: 'Registers patients, books appointments, runs the queue and front-desk billing.' },
		{ name: 'Cashier / Billing', text: 'Bills, payments, refunds, reversals and day-end reports.' },
		{ name: 'Pharmacist', text: 'Dispensing, the medicine catalogue and stock.' },
		{ name: 'Lab Technician', text: 'A dedicated lab-bench workspace from sample to result.' }
	];
</script>

<Seo
	title="Solutions"
	description="SymphoCare for solo practitioners, multi-doctor clinics, medical coworking spaces, hospital OPDs, diagnostic centres, in-clinic pharmacies, AYUSH practices and functional medicine."
/>

<PageHero
	eyebrow="Solutions"
	sub="Every practice runs differently. Explore the workflows that match the way your clinic cares for patients."
>
	{#snippet heading()}Built for the practice <em>you actually run.</em>{/snippet}
</PageHero>

<GuideStrip
	title="Not sure where you fit?"
	text="Tell us how your clinic works today — how patients arrive, who sees them and where the paperwork goes — and we’ll shape the demo around it."
	href="/contact"
	cta="Talk to the team"
/>

<section class="section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">By care setting</p>
			<h2>From one consulting room to a network of clinics.</h2>
		</div>
		<div class="solution-grid">
			{#each settings as s, i (s.title)}
				<article {@attach reveal((i % 2) * 80)}>
					<div class="icon-chip"><s.icon size={20} strokeWidth={1.8} /></div>
					<h2>{s.title}</h2>
					<p>{s.text}</p>
					<ul class="check-list">
						{#each s.points as p (p)}<li>{p}</li>{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section dark-section">
	<div class="shell roles-layout">
		<div {@attach reveal()}>
			<p class="eyebrow eyebrow-light">By role</p>
			<h2>Everyone sees <em>what they need.</em></h2>
			<p class="dark-copy">
				Eight clinic roles come ready to use. Admins see each permission as a plain feature name —
				like “Add patient” or “Call next patient” — and can switch optional features on or off per
				person. One person can hold several roles.
			</p>
		</div>
		<div class="role-grid">
			{#each roles as r, i (r.name)}
				<div {@attach reveal((i % 2) * 60)}>
					<h3>{r.name}</h3>
					<p>{r.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section warm-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">For every tradition of care</p>
			<h2>Conventional, AYUSH and functional medicine — side by side.</h2>
		</div>
		<div {@attach reveal(120)}>
			<p class="lead">
				Set your clinic’s medical system and SymphoCare adapts: specialty case forms for Homeopathy,
				Ayurveda, Siddha and Functional Medicine sit alongside the standard consultation.
			</p>
			<p>
				The medicine catalogue understands allopathic, AYUSH, nutraceutical and device products, and
				comes pre-loaded with the Jan Aushadhi generic catalogue.
			</p>
			<a class="text-link" href="/platform#consultations">See consultations and specialty EMR →</a>
		</div>
	</div>
</section>

<FinalCta>
	{#snippet heading()}Your practice.<br /><em>Your rhythm.</em>{/snippet}
</FinalCta>

<style>
	.solution-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1px;
		background: var(--line);
	}
	.solution-grid article {
		background: var(--cream);
		padding: 40px;
		transition: background 0.24s;
	}
	.solution-grid article:hover {
		background: #fff;
	}
	.solution-grid h2 {
		margin: 24px 0 12px;
		font-size: 30px;
	}
	.solution-grid article > p {
		color: var(--muted);
	}
	.roles-layout {
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 80px;
	}
	.dark-copy {
		color: #d5e6d7;
		margin-top: 22px;
		font-size: 17px;
	}
	.role-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: #ffffff35;
	}
	.role-grid > div {
		background: var(--forest-900);
		padding: 26px 28px;
	}
	.role-grid h3 {
		font: 500 23px var(--serif);
		color: #fff;
		margin-bottom: 8px;
	}
	.role-grid p {
		color: #b8cdbc;
		font-size: 14px;
	}
	@media (width <= 900px) {
		.roles-layout {
			grid-template-columns: 1fr;
			gap: 40px;
		}
	}
	@media (width <= 600px) {
		.solution-grid,
		.role-grid {
			grid-template-columns: 1fr;
		}
		.solution-grid article {
			padding: 30px 22px;
		}
	}
</style>
