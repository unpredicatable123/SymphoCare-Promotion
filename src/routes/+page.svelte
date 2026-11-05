<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { onMount } from 'svelte';
	import {
		CalendarCheck,
		Ticket,
		Stethoscope,
		FlaskConical,
		Pill,
		Receipt,
		ChartColumn,
		ScanText
	} from '@lucide/svelte';

	// --- Hero queue board: gently "calls" the next token so the mock feels alive ---
	let tokens = $state([
		{ cabin: 'Cabin 1', dept: 'General Medicine', now: 14, next: [15, 16], prefix: 'A' },
		{ cabin: 'Cabin 2', dept: 'Paediatrics', now: 7, next: [8, 9], prefix: 'B' },
		{ cabin: 'Cabin 3', dept: 'Homeopathy', now: 22, next: [23, 24], prefix: 'C' }
	]);
	let calling = $state(-1);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let i = 0;
		const id = setInterval(() => {
			const row = tokens[i % tokens.length];
			row.now = row.next[0];
			row.next = [row.next[1], row.next[1] + 1];
			calling = i % tokens.length;
			setTimeout(() => (calling = -1), 1600);
			i++;
		}, 3800);
		return () => clearInterval(id);
	});

	const pad = (n: number) => String(n).padStart(3, '0');

	const capabilities = [
		{
			icon: CalendarCheck,
			label: 'Front desk',
			title: 'Registration and appointments',
			text: 'Register patients with an auto-generated MRN, catch duplicates early, and book, reschedule or cancel against each doctor’s shifts — without double-booking.'
		},
		{
			icon: Ticket,
			label: 'Front desk',
			title: 'Queue and waiting-room TV',
			text: 'Check-in, per-doctor tokens and cabins, a queue console to call, recall or skip, and a live waiting-room display that never shows patient names.'
		},
		{
			icon: Stethoscope,
			label: 'Doctor',
			title: 'Consultations and e-prescriptions',
			text: 'A focused visit pad for complaints, history, examination, vitals and diagnosis. Prescribe from the medicine catalogue and print with the doctor’s signature.'
		},
		{
			icon: FlaskConical,
			label: 'Laboratory',
			title: 'Investigations and lab workbench',
			text: 'Order investigations, collect and track samples, enter results against reference ranges, verify, and release numbered reports to the patient portal.'
		},
		{
			icon: Pill,
			label: 'Pharmacy',
			title: 'Dispensing and inventory',
			text: 'Dispense straight from the finalised prescription. Batch and expiry-aware stock is deducted in the same step, with suppliers, purchases and returns on record.'
		},
		{
			icon: Receipt,
			label: 'Billing',
			title: 'Billing and collections',
			text: 'Itemised invoices with discounts and GST-ready tax lines, partial payments by cash, UPI, card or bank transfer, receipts, refunds and reversals with a full trail.'
		},
		{
			icon: ChartColumn,
			label: 'Management',
			title: 'MIS and reports',
			text: 'A clinic dashboard for today, this week or any range, with operational, financial and pharmacy reports — exportable to CSV for your accountant.'
		},
		{
			icon: ScanText,
			label: 'AI assisted',
			title: 'Smart Files AI',
			text: 'Upload a lab report or discharge summary and let AI read, classify and extract key values for review. Compare reports over time to see trends.'
		}
	];

	const portals = [
		{ n: '01', name: 'Clinic OS', who: 'Doctors, nurses and front desk', line: 'Your whole clinic day, in one workspace.' },
		{ n: '02', name: 'Lab Workbench', who: 'Technicians and pathologists', line: 'From sample to verified report.' },
		{ n: '03', name: 'Pharmacy Desk', who: 'Pharmacists and dispensers', line: 'Dispense with the prescription in front of you.' },
		{ n: '04', name: 'Patient Portal', who: 'Patients and families', line: 'Your health records, whenever you need them.' }
	];

	const settings = [
		{ title: 'Solo practitioners', text: 'Run consultations, prescriptions, billing and follow-ups from one calm workspace — with a small team or none at all.' },
		{ title: 'Multi-doctor clinics', text: 'Give every doctor a cabin, a queue and a schedule, while the front desk sees the whole clinic day at a glance.' },
		{ title: 'Medical coworking spaces', text: 'Independent doctors share one front desk, one waiting room and one TV display — each with their own shifts and tokens.' },
		{ title: 'Hospital OPDs', text: 'Connect OPD consultations with the in-house lab, pharmacy and billing counters so the patient’s record travels with them.' },
		{ title: 'Diagnostic centres', text: 'Move from sample collection to verified, numbered reports with clear worklists, priorities and patient-portal release.' },
		{ title: 'In-clinic pharmacies', text: 'Dispense against the doctor’s finalised prescription, with batch, expiry and stock movements tracked automatically.' },
		{ title: 'AYUSH practices', text: 'Dedicated case forms for Homeopathy, Ayurveda and Siddha sit alongside conventional consultation notes.' },
		{ title: 'Functional medicine', text: 'Capture functional-medicine case details and compare a patient’s lab reports over time with AI-assisted trends.' }
	];

	const faqs = [
		{
			q: 'What is SymphoCare?',
			a: 'SymphoCare is a connected clinic platform from SymphoZen Labs. It brings appointments, queue management, consultations, e-prescriptions, investigations, laboratory, pharmacy, billing, reports and a patient portal onto one shared patient record — with each team seeing only what it needs.'
		},
		{
			q: 'Who is SymphoCare built for?',
			a: 'Solo doctors, multi-doctor clinics, medical coworking spaces, hospital OPDs, diagnostic centres and in-clinic pharmacies — across conventional medicine, AYUSH systems (Homeopathy, Ayurveda, Siddha) and functional medicine.'
		},
		{
			q: 'Can we run more than one clinic or branch?',
			a: 'Yes. SymphoCare is organised as an organisation with one or more clinics. Staff who work across branches switch clinics from a selector, and every record stays scoped to the clinic it belongs to.'
		},
		{
			q: 'How do I get pricing?',
			a: 'Contact our team. We offer a SaaS Subscription and a One-time License with Yearly Maintenance, and share pricing in a tailored proposal based on your clinics, team and the capabilities you need.'
		},
		{
			q: 'Is the AI making clinical decisions?',
			a: 'No. Smart Files AI is assistive: it reads, classifies and suggests extracted values from documents, and a person accepts, edits or rejects each suggestion. Nothing is written to the medical record on its own.'
		},
		{
			q: 'Where are you based?',
			a: 'SymphoZen Labs is based in Salem, Tamil Nadu. Contact us to discuss your clinic and rollout requirements.'
		}
	];
</script>

<Seo
	title="SymphoCare | Connected Clinic Platform — Connected Care. Healthier Lives."
	description="Appointments, queue, consultations, e-prescriptions, laboratory, pharmacy, billing and a patient portal — on one shared patient record. Meet SymphoCare by SymphoZen Labs."
/>

<!-- HERO -->
<section class="hero">
	<div class="shell hero-layout">
		<div class="hero-copy">
			<p class="eyebrow eyebrow-light">SymphoCare · Clinic Platform</p>
			<h1>Connected care,<br /><em>from front desk to pharmacy.</em></h1>
			<p class="hero-lede">
				Bring appointments, the waiting room, consultations, lab results, dispensing and billing
				into one shared patient record — with each team seeing only what it needs.
			</p>
			<p class="presence"><span></span> Based in Salem, Tamil Nadu</p>
			<div class="hero-actions">
				<a class="button button-accent" href="/contact">Book a Demo <span>→</span></a>
				<a class="button button-ghost" href="/platform">Explore the platform</a>
			</div>
		</div>

		<div class="hero-visual" aria-label="Illustration of the SymphoCare waiting-room display" role="img">
			<div class="board">
				<div class="board-top">
					<span class="live"><i></i> Live queue</span>
					<span>Now serving</span>
				</div>
				{#each tokens as row, i (row.cabin)}
					<div class="board-row" class:calling={calling === i}>
						<div>
							<strong>{row.cabin}</strong>
							<small>{row.dept}</small>
						</div>
						<div class="now">{row.prefix}-{pad(row.now)}</div>
						<div class="next">
							<small>Next</small>
							{#each row.next as n, j (j)}<span>{row.prefix}-{pad(n)}</span>{/each}
						</div>
					</div>
				{/each}
				<p class="board-note">Tokens only. Never patient names.</p>
			</div>

			<div class="day-card">
				<div class="day-top"><span>Today at the clinic</span><i>MIS</i></div>
				<div class="day-stats">
					<div><b>68</b><small>Appointments</small></div>
					<div><b>41</b><small>Consults done</small></div>
					<div><b>12</b><small>Lab reports</small></div>
				</div>
				<div class="day-bars" aria-hidden="true">
					{#each [38, 62, 80, 54, 92, 70, 46] as h, i (i)}<span style="height:{h}%"></span>{/each}
				</div>
				<div class="day-foot"><span>Collections · UPI, cash, card</span><b>Day-end ready</b></div>
			</div>
		</div>
	</div>
</section>

<!-- PRESENCE BAND -->
<section class="presence-band">
	<div class="shell presence-grid">
		<span class="band-label">Built for the way clinics work</span>
		<strong>One record from token to pharmacy.</strong>
		<span>Designed for doctors, front desks, labs and pharmacies — growing one clinic at a time.</span>
	</div>
</section>

<GuideStrip
	eyebrow="A little guidance"
	title="Let’s find your clinic’s rhythm."
	text="See how SymphoCare fits together — from the front desk and the doctor’s cabin to the lab bench, the pharmacy counter and the patient at home."
	href="/platform"
	cta="Explore the platform"
/>

<!-- THE STORY -->
<section class="section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">The clinic story</p>
			<h2>A patient’s visit is one story. Your systems should be too.</h2>
		</div>
		<div {@attach reveal(120)}>
			<p class="lead">
				From the patient’s chair a visit looks simple. Behind it, the front desk, the doctor, the
				lab, the pharmacy and the billing counter are all trying to stay in step.
			</p>
			<p>
				SymphoCare gives every handoff the same patient record, so nobody re-types a prescription,
				hunts for a lab report or wonders whether a bill was settled.
			</p>
		</div>
	</div>
	<div class="shell steps line-grid" {@attach reveal()}>
		<div><span>01</span><strong>Patient arrives</strong><small>Registration, appointment, token</small></div>
		<div><span>02</span><strong>Doctor consults</strong><small>Visit pad, vitals, e-prescription</small></div>
		<div><span>03</span><strong>Care continues</strong><small>Lab investigations and dispensing</small></div>
		<div><span>04</span><strong>Clinic closes the loop</strong><small>Billing, reports, patient portal</small></div>
	</div>
</section>

<!-- PLATFORM GRID -->
<section class="section warm-section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">One connected platform</p>
			<h2>Connect the front desk, the cabin, the lab and the counter.</h2>
			<p>From the first token of the morning to the day-end collection report, SymphoCare keeps the clinic day visible.</p>
		</div>
		<div class="capability-grid">
			{#each capabilities as c, i (c.title)}
				<article class="capability-card" {@attach reveal((i % 4) * 70)}>
					<div class="icon-chip"><c.icon size={20} strokeWidth={1.8} /></div>
					<p class="card-label">{c.label}</p>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
					<a href={c.label === 'AI assisted' ? '/smart-files' : '/platform'}>See capability <span>→</span></a>
				</article>
			{/each}
		</div>
		<div class="center-action">
			<a class="button button-outline" href="/platform">Explore the full platform</a>
		</div>
	</div>
</section>

<!-- PORTALS -->
<section class="section dark-section">
	<div class="shell portals-layout">
		<div class="portals-intro" {@attach reveal()}>
			<p class="eyebrow eyebrow-light">Every team, its own workspace</p>
			<h2>Four portals. <em>One patient record.</em></h2>
			<p>
				Each team signs in to a workspace built for its work. A login for one portal can’t be used
				on another, and access inside each is shaped by role.
			</p>
			<a class="text-link light-link" href="/solutions">See how each role works →</a>
		</div>
		<div class="portal-grid">
			{#each portals as p, i (p.name)}
				<div {@attach reveal(i * 80)}>
					<span>{p.n}</span>
					<h3>{p.name}</h3>
					<small>{p.who}</small>
					<p>“{p.line}”</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- SMART FILES AI -->
<section class="section sand-section">
	<div class="shell ai-layout">
		<div class="ai-art" {@attach reveal()} aria-hidden="true">
			<div class="doc">
				<div class="doc-head"><b>Lab report.pdf</b><span>Classified · Lab report</span></div>
				<i style="width:70%"></i><i style="width:88%"></i><i style="width:56%"></i>
				<div class="doc-fields">
					<div><small>Haemoglobin</small><b>12.8 g/dL</b><em>Accept</em></div>
					<div><small>HbA1c</small><b>6.9 %</b><em class="flag">Review</em></div>
					<div><small>TSH</small><b>3.1 mIU/L</b><em>Accept</em></div>
				</div>
			</div>
			<div class="ai-chip"><span>AI suggests</span><strong>You decide.</strong></div>
		</div>
		<div {@attach reveal(120)}>
			<p class="eyebrow">Meet the intelligence behind the paperwork</p>
			<h2>Less paperwork.<br />More time for patients.</h2>
			<p class="lead">
				Smart Files AI reads the reports patients bring in — so the important numbers are ready
				when the doctor is.
			</p>
			<p>
				Upload a lab report, discharge summary or referral. SymphoCare classifies it, extracts the
				key values for your review, and compares two to four reports to show how results are
				trending.
			</p>
			<a class="button button-primary" href="/smart-files">Explore Smart Files AI <span>→</span></a>
			<p class="scope-note">AI is assistive only. Every suggestion is accepted, edited or rejected by a person.</p>
		</div>
	</div>
</section>

<!-- LOOP -->
<section class="section">
	<div class="shell loop-layout">
		<div {@attach reveal()}>
			<p class="eyebrow">The SymphoCare story</p>
			<h2>Register. Consult. Care. Understand.</h2>
			<p class="loop-copy">A clinic platform is the operating layer that connects daily care with better decisions.</p>
			<a class="text-link" href="/platform">See how the platform connects →</a>
		</div>
		<div class="loop-grid line-grid">
			<div {@attach reveal(0)}><span>01</span><h3>Register</h3><p>Patient registry, appointments, shifts, check-in, tokens and the waiting-room display.</p></div>
			<div {@attach reveal(80)}><span>02</span><h3>Consult</h3><p>Visit pad, vitals, allergies, specialty case forms and signed e-prescriptions.</p></div>
			<div {@attach reveal(160)}><span>03</span><h3>Care</h3><p>Investigations, laboratory workflows, dispensing, stock and the patient portal.</p></div>
			<div {@attach reveal(240)}><span>04</span><h3>Understand</h3><p>Billing, collections, MIS dashboards, reports and an append-only audit trail.</p></div>
		</div>
	</div>
</section>

<!-- CARE SETTINGS -->
<section class="section warm-section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">For the practice you run</p>
			<h2>From the solo consulting room to the hospital OPD.</h2>
			<p>We support clinics, coworking spaces, OPDs, diagnostic centres and pharmacies — across conventional, AYUSH and functional medicine.</p>
		</div>
		<div class="format-grid">
			{#each settings as s, i (s.title)}
				<article {@attach reveal((i % 4) * 70)}>
					<span class="format-rule"></span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
					<a href="/solutions">Explore solutions <span>→</span></a>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- NUMBERS -->
<section class="numbers">
	<div class="shell numbers-grid">
		<div {@attach reveal(0)}><b>4</b><span>Team portals on one record</span></div>
		<div {@attach reveal(80)}><b>8</b><span>Clinic roles with feature-level access</span></div>
		<div {@attach reveal(160)}><b>2,400+</b><span>Jan Aushadhi generics pre-loaded</span></div>
		<div {@attach reveal(240)}><b>4</b><span>Specialty EMRs incl. AYUSH</span></div>
	</div>
</section>

<!-- MODULES -->
<section class="section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">Extend when you are ready</p>
			<h2>Start with the clinic. Add deeper capability as you grow.</h2>
		</div>
		<div class="module-list" id="modules">
			<article {@attach reveal(0)}>
				<span>01</span>
				<div><h3>Multi-clinic and branches</h3><p>Run several clinics under one organisation, with staff who move between branches and records that stay scoped to each clinic.</p></div>
				<a href="/platform#administration" aria-label="Learn about multi-clinic">→</a>
			</article>
			<article {@attach reveal(80)}>
				<span>02</span>
				<div><h3>Smart Files AI</h3><p>Document classification, field extraction and AI report comparison for clinics that handle a lot of outside paperwork.</p></div>
				<a href="/smart-files" aria-label="Learn about Smart Files AI">→</a>
			</article>
			<article {@attach reveal(160)}>
				<span>03</span>
				<div><h3>Laboratory workbench</h3><p>Sample tracking, worklists, result verification and numbered reports for in-house labs and diagnostic centres.</p></div>
				<a href="/platform#laboratory" aria-label="Learn about the laboratory workbench">→</a>
			</article>
		</div>
	</div>
</section>

<!-- LICENSING TEASER -->
<section class="section licensing-teaser">
	<div class="shell license-banner" {@attach reveal()}>
		<div>
			<p class="eyebrow eyebrow-light">Two ways to adopt SymphoCare</p>
			<h2>Choose the commercial model that fits your practice.</h2>
			<p class="banner-note">Pricing is shared on request, tailored to your clinic.</p>
		</div>
		<div class="banner-actions">
			<a class="button button-accent" href="/contact?interest=pricing">Request pricing <span>→</span></a>
			<a class="button button-ghost" href="/licensing">Licensing options</a>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section faq-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">Questions, answered</p>
			<h2>Let’s make the next step clear.</h2>
			<p class="lead">We’ll walk through your clinic, your team and your priorities in a guided conversation.</p>
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

<FinalCta>
	{#snippet heading()}Let’s make room<br /><em>for calmer clinic days.</em>{/snippet}
</FinalCta>

<style>
	/* ---------- Hero ---------- */
	.hero {
		background: radial-gradient(at 85% 40%, #2b5936 0%, #133a29 58%);
		color: #fff;
		padding: 80px 0 96px;
		overflow: hidden;
	}
	.hero-layout {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.hero h1 {
		letter-spacing: -0.045em;
		font: 500 clamp(44px, 5vw, 70px) / 1.05 var(--serif);
	}
	.hero-lede {
		color: #d5e6d7;
		max-width: 560px;
		margin: 25px 0 19px;
		font-size: 19px;
		line-height: 1.65;
	}
	.presence {
		color: #e1eee2;
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 14px;
	}
	.presence span {
		background: var(--sun);
		border-radius: 50%;
		width: 8px;
		height: 8px;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	.hero-visual {
		position: relative;
		padding-bottom: 150px;
	}
	.board {
		background: linear-gradient(160deg, #0d2d20, #0a2419);
		border: 1px solid #b9d99b30;
		border-radius: 18px;
		padding: 22px;
		box-shadow: 0 28px 60px #061b1199;
	}
	.board-top {
		display: flex;
		justify-content: space-between;
		color: #a9ce9a;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-weight: 700;
		margin-bottom: 14px;
	}
	.live {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.live i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--sun);
		animation: pulse 1.8s ease-in-out infinite;
	}
	.board-row {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr;
		align-items: center;
		gap: 12px;
		padding: 14px 12px;
		border-top: 1px solid #ffffff14;
		border-radius: 8px;
		transition: background 0.4s;
	}
	.board-row.calling {
		background: #f0c45c1f;
	}
	.board-row strong {
		display: block;
		font-size: 15px;
	}
	.board-row small {
		color: #9fb9a5;
		font-size: 11px;
	}
	.now {
		font: 600 30px/1 var(--serif);
		color: var(--sun);
		letter-spacing: -0.02em;
	}
	.calling .now {
		animation: call 0.8s ease-in-out 2;
	}
	.next {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}
	.next small {
		width: 100%;
	}
	.next span {
		background: #ffffff12;
		border-radius: 4px;
		padding: 2px 7px;
		font-size: 12px;
		color: #d5e6d7;
	}
	.board-note {
		margin-top: 10px;
		color: #7f9a86;
		font-size: 11px;
		text-align: right;
	}
	.day-card {
		position: absolute;
		right: -28px;
		bottom: 0;
		width: 290px;
		color: var(--ink);
		background: var(--cream);
		border-radius: 16px;
		padding: 18px;
		box-shadow: var(--shadow), 0 20px 40px #061b1155;
	}
	.day-top {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		font-weight: 700;
	}
	.day-top i {
		color: var(--green-700);
		font-size: 10px;
		font-style: normal;
		letter-spacing: 0.1em;
	}
	.day-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		margin: 14px 0 6px;
	}
	.day-stats b {
		display: block;
		font: 600 22px/1.1 var(--serif);
		color: var(--forest-800);
	}
	.day-stats small {
		color: var(--muted);
		font-size: 10px;
	}
	.day-bars {
		display: flex;
		align-items: end;
		gap: 9px;
		height: 64px;
		padding: 8px 6px 0;
		border-bottom: 1px solid var(--line);
	}
	.day-bars span {
		flex: 1;
		border-radius: 4px 4px 0 0;
		background: linear-gradient(#a4ca8f, var(--green-700));
	}
	.day-foot {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		font-size: 10px;
		color: var(--muted);
	}
	.day-foot b {
		color: var(--forest-800);
	}

	/* ---------- Bands ---------- */
	.presence-band {
		background: var(--sun);
		color: var(--forest-950);
		padding: 26px 0;
	}
	.presence-grid {
		display: grid;
		grid-template-columns: 1fr 1.25fr 1fr;
		align-items: center;
		gap: 24px;
	}
	.presence-grid strong {
		font: 500 24px var(--serif);
	}
	.band-label {
		text-transform: uppercase;
		letter-spacing: 0.13em;
		font-size: 11px;
		font-weight: 700;
	}
	.presence-grid > span:last-child {
		font-size: 13px;
	}

	/* ---------- Steps ---------- */
	.steps {
		grid-template-columns: repeat(4, 1fr);
		margin-top: 80px;
	}
	.steps > div {
		display: grid;
		gap: 7px;
		padding: 27px 24px;
	}
	.steps span {
		color: var(--green-700);
		letter-spacing: 0.1em;
		font-size: 12px;
		font-weight: 700;
	}
	.steps strong {
		font-size: 17px;
	}
	.steps small {
		color: var(--muted);
		font-size: 13px;
	}
	.warm-section .capability-card {
		background: #fff;
	}

	/* ---------- Portals ---------- */
	.portals-layout {
		display: grid;
		grid-template-columns: 0.75fr 1.25fr;
		gap: 80px;
	}
	.portals-intro > p:not(.eyebrow) {
		color: #d5e6d7;
		margin-top: 22px;
	}
	.portal-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: #ffffff35;
	}
	.portal-grid > div {
		background: var(--forest-900);
		padding: 30px;
	}
	.portal-grid span {
		color: var(--sun);
		font-size: 12px;
		font-weight: 700;
	}
	.portal-grid h3 {
		margin: 24px 0 2px;
		font: 500 29px var(--serif);
	}
	.portal-grid small {
		color: #a9ce9a;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
	}
	.portal-grid p {
		margin-top: 12px;
		color: #b8cdbc;
		font-size: 14px;
	}

	/* ---------- AI ---------- */
	.ai-layout {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		align-items: center;
		gap: 80px;
	}
	.ai-layout h2 {
		margin-bottom: 24px;
	}
	.ai-layout p + p {
		margin-top: 18px;
	}
	.ai-layout .button {
		margin-top: 28px;
	}
	.scope-note {
		color: #5c695f;
		font-size: 13px;
	}
	.ai-art {
		position: relative;
		padding: 30px 0 40px;
		background: radial-gradient(#fff8e9 20%, transparent 70%);
	}
	.doc {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 24px;
		box-shadow: var(--shadow);
		display: grid;
		gap: 9px;
	}
	.doc-head {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
		font-size: 14px;
		margin-bottom: 4px;
	}
	.doc-head span {
		color: var(--green-700);
		font-size: 11px;
		font-weight: 700;
	}
	.doc > i {
		height: 6px;
		border-radius: 5px;
		background: #e6ece2;
	}
	.doc-fields {
		display: grid;
		gap: 8px;
		margin-top: 12px;
	}
	.doc-fields div {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 14px;
		align-items: center;
		background: #f4f7f1;
		border-radius: 6px;
		padding: 10px 12px;
		font-size: 13px;
	}
	.doc-fields small {
		color: var(--muted);
	}
	.doc-fields em {
		font-style: normal;
		font-size: 11px;
		font-weight: 700;
		color: var(--green-700);
		border: 1px solid #b9d0b0;
		border-radius: 4px;
		padding: 2px 8px;
	}
	.doc-fields em.flag {
		color: #8a5a00;
		border-color: #f0c45c;
		background: #fdf3d8;
	}
	.ai-chip {
		position: absolute;
		right: -14px;
		bottom: 6px;
		background: var(--forest-800);
		color: #fff;
		border-radius: 8px;
		padding: 14px 20px;
		box-shadow: var(--shadow);
	}
	.ai-chip span {
		display: block;
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--sun-light);
		font-weight: 700;
	}
	.ai-chip strong {
		font: 500 22px var(--serif);
	}

	/* ---------- Loop ---------- */
	.loop-layout {
		display: grid;
		grid-template-columns: 0.7fr 1.3fr;
		gap: 90px;
	}
	.loop-copy {
		color: var(--muted);
		margin-top: 20px;
		font-size: 17px;
	}
	.loop-grid {
		grid-template-columns: 1fr 1fr;
	}
	.loop-grid > div {
		padding: 30px;
	}
	.loop-grid span {
		color: var(--green-700);
		font-size: 12px;
		font-weight: 700;
	}
	.loop-grid h3 {
		margin: 28px 0 10px;
		font: 500 29px var(--serif);
		color: var(--forest-900);
	}
	.loop-grid p {
		color: var(--muted);
		font-size: 14px;
	}

	/* ---------- Settings ---------- */
	.format-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 34px;
	}
	.format-grid article {
		display: flex;
		flex-direction: column;
		min-height: 230px;
	}
	.format-rule {
		background: var(--sun);
		width: 34px;
		height: 3px;
		margin-bottom: 24px;
	}
	.format-grid h3 {
		font-size: 21px;
		line-height: 1.2;
	}
	.format-grid p {
		color: var(--muted);
		margin-top: 12px;
		font-size: 14px;
	}
	.format-grid a {
		color: var(--green-700);
		margin-top: auto;
		padding-top: 20px;
		font-size: 13px;
		font-weight: 700;
	}

	/* ---------- Numbers ---------- */
	.numbers {
		background: var(--forest-800);
		color: #fff;
		padding: 56px 0;
	}
	.numbers-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;
	}
	.numbers-grid div {
		border-left: 2px solid var(--sun);
		padding-left: 20px;
	}
	.numbers-grid b {
		display: block;
		font: 500 clamp(36px, 4vw, 50px) / 1 var(--serif);
		letter-spacing: -0.03em;
	}
	.numbers-grid span {
		display: block;
		margin-top: 10px;
		color: #c7ddca;
		font-size: 14px;
	}

	/* ---------- Modules ---------- */
	.module-list {
		background: #d5dbd2;
		display: grid;
		gap: 1px;
	}
	.module-list article {
		background: var(--cream);
		display: grid;
		grid-template-columns: 34px 1fr 24px;
		gap: 16px;
		align-items: start;
		padding: 25px 0;
	}
	.module-list article > span {
		color: var(--green-700);
		font-size: 12px;
		font-weight: 700;
		padding-top: 6px;
	}
	.module-list h3 {
		font-size: 21px;
	}
	.module-list p {
		color: var(--muted);
		margin-top: 6px;
		font-size: 14px;
	}
	.module-list a {
		color: var(--green-700);
		font-weight: 700;
	}
	.licensing-teaser {
		padding-top: 0;
	}
	.banner-note {
		color: #d5e6d7;
		margin-top: 14px;
		font-size: 16px;
	}
	.banner-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		flex-shrink: 0;
	}

	@keyframes pulse {
		50% {
			opacity: 0.35;
		}
	}
	@keyframes call {
		50% {
			transform: scale(1.12);
		}
	}

	@media (width <= 900px) {
		.hero {
			padding: 64px 0 80px;
		}
		.hero-layout,
		.portals-layout,
		.ai-layout,
		.loop-layout {
			grid-template-columns: 1fr;
			gap: 45px;
		}
		.hero-visual {
			max-width: 600px;
		}
		.day-card {
			right: 0;
		}
		.presence-grid {
			grid-template-columns: 1fr;
			gap: 7px;
		}
		.presence-grid strong {
			font-size: 20px;
		}
		.steps,
		.numbers-grid {
			grid-template-columns: 1fr 1fr;
		}
		.format-grid {
			grid-template-columns: 1fr 1fr;
			gap: 28px;
		}
		.ai-chip {
			right: 0;
		}
	}
	@media (width <= 600px) {
		.hero h1 {
			font-size: 42px;
		}
		.hero-lede {
			font-size: 17px;
		}
		.hero-actions .button {
			width: 100%;
		}
		.board {
			padding: 16px;
		}
		.board-row {
			grid-template-columns: 1fr auto;
		}
		.next {
			display: none;
		}
		.day-card {
			position: relative;
			width: auto;
			margin: -20px 12px 0;
		}
		.hero-visual {
			padding-bottom: 0;
		}
		.steps,
		.format-grid,
		.portal-grid,
		.loop-grid {
			grid-template-columns: 1fr;
		}
		.numbers-grid {
			gap: 26px;
		}
	}
</style>
