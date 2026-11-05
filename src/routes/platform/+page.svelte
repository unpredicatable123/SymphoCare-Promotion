<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';

	type Row = {
		id: string;
		label: string;
		title: string;
		text: string;
		points: string[];
		visual: { tag: string; title: string; lines: [string, string][] };
		link?: { href: string; text: string };
	};

	const rows: Row[] = [
		{
			id: 'front-desk',
			label: 'Front desk',
			title: 'Patient registry and appointments',
			text: 'Give every patient one record from the first visit — and give the front desk a clear, double-booking-proof view of the day.',
			points: [
				'Auto-generated clinic MRN / UHID for every patient, with duplicate warnings at registration',
				'Search by name, mobile number or MRN; archive and restore records',
				'Book, reschedule and cancel with reference numbers and a 1-week advance window',
				'Doctor shifts with a patient cap per shift — booking is protected against double-booking',
				'Longitudinal profile: visits, vitals, prescriptions, investigations, files and allergies'
			],
			visual: { tag: 'Today', title: 'Daily schedule', lines: [['Scheduled', '42'], ['Checked in', '18'], ['Completed', '21']] }
		},
		{
			id: 'queue',
			label: 'Waiting room',
			title: 'PACE — queue management and waiting-room TV',
			text: 'PACE, the Patient Arrival and Coordination Engine, turns a crowded waiting room into a calm, visible queue for the reception desk, the doctor’s assistant and the patients waiting.',
			points: [
				'Check-in for appointments and walk-ins with per-doctor token numbers (e.g. A-014)',
				'Cabins mapped to doctors for each session',
				'Queue console to call next, recall, skip, pause or complete — from the doctor, assistant or reception',
				'Clinic-defined missed-turn policy, plus a printable token slip',
				'Waiting-room TV pairs with a short code — up to 6 cabins per screen, live updates and a chime on every call',
				'The display shows tokens only, never patient names'
			],
			visual: { tag: 'Now serving', title: 'Cabin 2 · A-014', lines: [['Next', 'A-015'], ['Then', 'A-016'], ['Display', 'Live']] }
		},
		{
			id: 'consultations',
			label: 'Doctor',
			title: 'Consultations and specialty EMR',
			text: 'A visit pad built for the pace of an OPD — with specialty case forms for the way you practise.',
			points: [
				'Chief complaint, history, examination, vitals, assessment and diagnosis on one visit pad',
				'Vitals history and allergy records always in view',
				'Dedicated case forms for Homeopathy, Ayurveda, Siddha and Functional Medicine',
				'A results inbox and favourite lab tests for every doctor',
				'Completed consultations are locked — the clinical record cannot be silently changed'
			],
			visual: { tag: 'Visit pad', title: 'Consultation', lines: [['Vitals', 'Recorded'], ['Allergies', '1 on file'], ['Status', 'Completed']] }
		},
		{
			id: 'aura',
			label: 'AI assisted',
			title: 'AURA ambient listening',
			text: 'AURA, the Ambient Understanding and Recognition Assistant, listens to the consultation and drafts the notes, so the doctor can focus on the patient.',
			points: [
				'Recording starts from the consultation screen, only after the patient’s consent is confirmed',
				'Built for Tamil, English and the mix of both',
				'Separates the doctor’s voice from the patient’s',
				'Drafts complaint, history, examination, diagnosis and follow-up beside the consultation form',
				'Only reorganises what was said, never adds diagnoses or treatment ideas',
				'The doctor accepts or edits every field; audio and transcripts stay private to the recording doctor'
			],
			visual: { tag: 'AURA draft', title: 'Ambient notes', lines: [['Language', 'Tamil–English'], ['Speakers', '2'], ['Review', '5 fields']] },
			link: { href: '/aura', text: 'Meet AURA' }
		},
		{
			id: 'prescriptions',
			label: 'Doctor',
			title: 'E-prescriptions and medicine master',
			text: 'Prescribe from a catalogue that already knows Indian generics — and print a clean, signed prescription.',
			points: [
				'Numbered prescriptions with morning–afternoon–evening–night dosing, duration and instructions',
				'Pre-loaded Jan Aushadhi catalogue of 2,400+ generic medicines, plus your own entries',
				'Allopathic, AYUSH, nutraceutical and device classifications; search by brand, generic or ingredient',
				'Allergy alerts must be acknowledged by the doctor before a prescription is finalised',
				'Printable prescription with the doctor’s signature'
			],
			visual: { tag: 'RX-000128', title: 'Prescription', lines: [['Dosing', '1-0-0-1'], ['Duration', '5 days'], ['Status', 'Finalised']] }
		},
		{
			id: 'laboratory',
			label: 'Laboratory',
			title: 'Investigations and lab workbench',
			text: 'From the doctor’s order to a verified report in the patient’s hands — with every step visible to the lab team.',
			points: [
				'Investigation orders across laboratory, imaging, pathology and cardiology diagnostics',
				'Routine, urgent and STAT priorities; sample collection with barcodes and labels',
				'Receiving, rejection, storage and outsourcing logs',
				'Result entry against reference ranges with abnormal and critical flags',
				'Microbiology and histopathology worklists',
				'Verification, numbered reports, release to the patient portal and an online report-verification page'
			],
			visual: { tag: 'Worklist', title: 'Lab bench', lines: [['Collected', '24'], ['Pending verify', '6'], ['Released', '17']] }
		},
		{
			id: 'pharmacy',
			label: 'Pharmacy',
			title: 'Dispensing and inventory',
			text: 'Dispense with the prescription in front of you — and keep stock honest without a separate system.',
			points: [
				'Live queue of finalised prescriptions with partial and repeat dispensing',
				'Batch and lot selection — expired lots are blocked',
				'Stock deducted in the same step as dispensing, with an append-only movement ledger',
				'Low-stock and expiry status at a glance',
				'Suppliers, purchase invoices and stock returns on record'
			],
			visual: { tag: 'Stock', title: 'Pharmacy desk', lines: [['To dispense', '9'], ['Low stock', '4'], ['Near expiry', '2']] }
		},
		{
			id: 'billing',
			label: 'Billing',
			title: 'Billing, payments and receipts',
			text: 'Clear, itemised billing with a trail your accountant will appreciate.',
			points: [
				'Numbered invoices with multiple line items and discounts',
				'Per-line tax: none, percentage, fixed or exempt — GST-ready',
				'Partial payments by cash, UPI, card or bank transfer, with printable receipts',
				'Payments are never edited — corrections are reversals, and refunds are capped at what was paid',
				'Consultation-fee billing at the front desk and day-end billing reports'
			],
			visual: { tag: 'INV-000342', title: 'Invoice', lines: [['Consultation', '₹500'], ['Lab', '₹850'], ['Paid · UPI', '₹1,350']] }
		},
		{
			id: 'reports',
			label: 'Management',
			title: 'MIS dashboard and reports',
			text: 'Understand the clinic day beyond the last bill — in your clinic’s own timezone.',
			points: [
				'Dashboard for today, yesterday, this week, this month or a custom range',
				'Operational reports: patients, appointments, consultations, prescriptions, investigations',
				'Financial reports: summary, bills, collections, refunds, outstanding and reversals',
				'Pharmacy reports: dispensing, stock and movements',
				'Audited CSV exports'
			],
			visual: { tag: 'This week', title: 'Clinic MIS', lines: [['Visits', '312'], ['Collections', '↑ 8%'], ['Outstanding', '₹4,200']] }
		},
		{
			id: 'smart-files',
			label: 'AI assisted',
			title: 'Smart Files AI',
			text: 'Private document storage with AI that reads, sorts and compares the reports patients bring in.',
			points: [
				'Private, secure file storage with short-lived download links',
				'AI classification across 10 document types — lab reports, imaging, discharge summaries, referrals and more',
				'Field extraction that a person accepts, edits or rejects',
				'AI report comparison across 2–4 reports with trend view and PDF export'
			],
			visual: { tag: 'Classified', title: 'Lab report', lines: [['HbA1c', '6.9 %'], ['TSH', '3.1'], ['Review', 'Pending']] },
			link: { href: '/smart-files', text: 'Explore Smart Files AI' }
		},
		{
			id: 'patient-portal',
			label: 'Patients',
			title: 'Patient portal',
			text: 'Give patients and families their records — only what the clinic has chosen to release.',
			points: [
				'Book, reschedule and cancel appointments within each doctor’s slots',
				'Released prescriptions, investigations and lab reports, with print views',
				'Files shared by the clinic, plus the patient’s own uploads',
				'Self-recorded vitals — clearly labelled for clinicians as not clinician-confirmed',
				'Versioned consent to terms and the privacy notice'
			],
			visual: { tag: 'My health', title: 'Patient portal', lines: [['Next visit', 'Thu 10:30'], ['New report', '1'], ['Prescriptions', '3']] }
		},
		{
			id: 'administration',
			label: 'Clinic admin',
			title: 'Team, roles and multi-clinic',
			text: 'Shape access around the people in your clinic — and grow to more branches without starting over.',
			points: [
				'8 clinic roles, from Owner and Clinic Admin to Doctor, Nurse, Receptionist, Cashier, Pharmacist and Lab Technician',
				'Each role’s features shown as plain names — with optional per-person toggles',
				'One person can hold several roles; suspend, reactivate or revoke access anytime',
				'Organisation with multiple clinics and a clinic selector for staff who work across branches',
				'Clinic identity, timezone, time format and medical system in settings'
			],
			visual: { tag: 'Team', title: 'Roles & access', lines: [['Doctors', '6'], ['Front desk', '3'], ['Branches', '2']] }
		},
		{
			id: 'med-reps',
			label: 'Clinic admin',
			title: 'Medical representative visits',
			text: 'Keep pharma rep visits organised instead of in a drawer of visiting cards.',
			points: [
				'Directory of medical representatives with duplicate detection',
				'Visit logs for doctor, clinic and pharmacy visits',
				'Proposed medicines linked to your medicine catalogue',
				'Optional AI reading of visiting cards'
			],
			visual: { tag: 'This month', title: 'Rep visits', lines: [['Visits', '14'], ['Reps', '9'], ['Products', '22']] }
		}
	];

	const short: Record<string, string> = {
		'front-desk': 'Appointments',
		queue: 'PACE queue',
		aura: 'AURA',
		consultations: 'Consultations',
		prescriptions: 'E-prescriptions',
		laboratory: 'Laboratory',
		pharmacy: 'Pharmacy',
		billing: 'Billing',
		reports: 'MIS & reports',
		'smart-files': 'Smart Files AI',
		'patient-portal': 'Patient portal',
		administration: 'Roles & multi-clinic',
		'med-reps': 'Medical reps'
	};

	const roadmap = [
		{ title: 'WhatsApp updates', text: 'Appointment confirmations, reminders and lab-ready notices — with patient consent and quiet hours.' },
		{ title: 'ABDM health exchange', text: 'SymphoCare is built on an ABDM-ready architecture, with ABHA linking and consent-based record sharing on the roadmap.' },
		{ title: 'PACE, phase two', text: 'Spoken token announcements, WhatsApp token updates and estimated waiting times.' }
	];
</script>

<Seo
	title="Platform"
	description="Every SymphoCare module: patient registry, appointments, PACE queue and waiting-room TV, consultations, AURA ambient listening, specialty EMR, e-prescriptions, laboratory, pharmacy, billing, MIS, Smart Files AI and the patient portal."
/>

<PageHero
	eyebrow="The platform"
	sub="Thirteen connected capabilities, one shared patient record. Here is everything SymphoCare brings to your clinic today."
>
	{#snippet heading()}Everything a clinic day needs. <em>Nothing it doesn’t.</em>{/snippet}
	<nav class="jump" aria-label="Jump to a capability">
		{#each rows as r (r.id)}<a href="#{r.id}">{short[r.id]}</a>{/each}
	</nav>
</PageHero>

<GuideStrip
	title="Start with the work you want to make clearer."
	text="Most clinics begin with the front desk, the queue and consultations — then switch on the lab, pharmacy and AI capabilities as they grow."
	href="/contact"
	cta="Discuss your setup"
/>

<section class="section">
	<div class="shell capability-list">
		{#each rows as r, i (r.id)}
			<article class="capability-row" id={r.id} {@attach reveal()}>
				<span class="row-number">{String(i + 1).padStart(2, '0')}</span>
				<div>
					<p class="eyebrow">{r.label}</p>
					<h2>{r.title}</h2>
					<p class="row-text">{r.text}</p>
					<ul class="check-list">
						{#each r.points as pt (pt)}<li>{pt}</li>{/each}
					</ul>
					{#if r.link}<a class="text-link" href={r.link.href}>{r.link.text} →</a>{/if}
				</div>
				<div class="row-visual" aria-hidden="true">
					<span>{r.visual.tag}</span>
					<strong>{r.visual.title}</strong>
					{#each r.visual.lines as [k, v] (k)}
						<div class="kv"><small>{k}</small><b>{v}</b></div>
					{/each}
					<i></i><i></i>
				</div>
			</article>
		{/each}
	</div>
</section>

<section class="section dark-section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow eyebrow-light">On the roadmap</p>
			<h2>What we’re building next.</h2>
			<p>These capabilities are in development. Ask us about timelines for your rollout.</p>
		</div>
		<div class="roadmap">
			{#each roadmap as r, i (r.title)}
				<article {@attach reveal(i * 80)}>
					<span>Coming</span>
					<h3>{r.title}</h3>
					<p>{r.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="shell cta-strip" {@attach reveal()}>
		<h2>See the platform with your own clinic in mind.</h2>
		<a class="button button-primary" href="/contact">Book a Demo <span>→</span></a>
	</div>
</section>

<FinalCta>
	{#snippet heading()}One record.<br /><em>Every team in step.</em>{/snippet}
</FinalCta>

<style>
	.jump {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 36px;
		max-width: 900px;
	}
	.jump a {
		border: 1px solid #ffffff40;
		border-radius: 40px;
		padding: 6px 14px;
		font-size: 13px;
		color: #d5e6d7;
		transition: background 0.2s;
	}
	.jump a:hover {
		background: #ffffff14;
		color: #fff;
	}
	.capability-list {
		background: var(--line);
		display: grid;
		gap: 1px;
	}
	.capability-row {
		background: var(--cream);
		display: grid;
		grid-template-columns: 60px 1fr 280px;
		align-items: center;
		gap: 40px;
		padding: 52px 0;
	}
	.row-number {
		color: var(--green-700);
		letter-spacing: 0.1em;
		font-size: 12px;
		font-weight: 700;
		align-self: start;
		padding-top: 4px;
	}
	.capability-row h2 {
		margin-bottom: 12px;
		font-size: 37px;
	}
	.row-text {
		max-width: 620px;
		color: var(--muted);
	}
	.check-list {
		max-width: 640px;
	}
	.row-visual {
		border: 1px solid var(--line);
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 9px;
		padding: 22px;
	}
	.row-visual > span {
		color: var(--green-700);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-size: 10px;
		font-weight: 700;
	}
	.row-visual strong {
		font-size: 17px;
		margin-bottom: 4px;
	}
	.kv {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		border-bottom: 1px dashed var(--line);
		padding-bottom: 6px;
	}
	.kv small {
		color: var(--muted);
		font-size: 13px;
	}
	.kv b {
		color: var(--forest-800);
	}
	.row-visual i {
		background: #dbe8d7;
		border-radius: 5px;
		width: 80%;
		height: 5px;
		margin-top: 4px;
	}
	.row-visual i:last-child {
		width: 50%;
	}
	.roadmap {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: #ffffff35;
	}
	.roadmap article {
		background: var(--forest-900);
		padding: 30px;
	}
	.roadmap span {
		display: inline-block;
		color: var(--forest-950);
		background: var(--sun);
		border-radius: 3px;
		padding: 3px 8px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.roadmap h3 {
		margin: 24px 0 10px;
		font: 500 26px var(--serif);
	}
	.roadmap p {
		color: #b8cdbc;
		font-size: 14px;
	}
	.cta-strip {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 30px;
		padding: 35px 0;
		border-block: 1px solid var(--line);
	}
	.cta-strip h2 {
		font-size: 36px;
	}
	@media (width <= 900px) {
		.capability-row {
			grid-template-columns: 40px 1fr;
		}
		.row-visual {
			grid-column: 2;
		}
		.roadmap {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.capability-row {
			grid-template-columns: 1fr;
			gap: 18px;
			padding: 34px 0;
		}
		.row-visual {
			grid-column: auto;
		}
		.capability-row h2 {
			font-size: 31px;
		}
		.roadmap {
			grid-template-columns: 1fr;
		}
		.cta-strip {
			display: grid;
		}
	}
</style>
