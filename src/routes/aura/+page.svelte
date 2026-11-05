<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { onMount } from 'svelte';
	import { ShieldCheck, Mic, Users, NotebookPen, UserCheck, Languages, Lock, EyeOff, Ban } from '@lucide/svelte';

	// --- Hero: transcript lines appear one by one, then the draft builds ---
	const lines = [
		{ who: 'Doctor', text: 'Sollunga, enna problem?' },
		{ who: 'Patient', text: 'Three days-aa fever irukku doctor, night-la cough jaasthi.' },
		{ who: 'Doctor', text: 'Any breathing difficulty? Sputum varudha?' },
		{ who: 'Patient', text: 'Konjam yellow sputum. Breathing okay.' }
	];
	let shown = $state(lines.length);
	let drafted = $state(true);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let timers: ReturnType<typeof setTimeout>[] = [];
		const play = () => {
			shown = 0;
			drafted = false;
			lines.forEach((_, i) => timers.push(setTimeout(() => (shown = i + 1), 700 + i * 1100)));
			timers.push(setTimeout(() => (drafted = true), 700 + lines.length * 1100 + 400));
		};
		play();
		const loop = setInterval(play, 12000);
		return () => {
			clearInterval(loop);
			timers.forEach(clearTimeout);
		};
	});

	const steps = [
		{ icon: ShieldCheck, title: 'Consent first', text: 'The doctor confirms the patient’s consent before anything is recorded.' },
		{ icon: Mic, title: 'Record the consultation', text: 'Recording starts from the consultation screen in the browser — just talk to your patient as usual.' },
		{ icon: Users, title: 'Recognise who said what', text: 'AURA transcribes the conversation and separates the doctor’s voice from the patient’s.' },
		{ icon: NotebookPen, title: 'Draft the notes', text: 'The conversation is organised into complaint, history, examination, diagnosis and follow-up.' },
		{ icon: UserCheck, title: 'Doctor reviews', text: 'The draft appears beside the consultation form. The doctor accepts or edits each field — nothing saves on its own.' }
	];

	type Field = { k: string; v: string; state: 'pending' | 'accepted' | 'editing' };
	let fields = $state<Field[]>([
		{ k: 'Chief complaint', v: 'Fever for 3 days; cough, worse at night.', state: 'pending' },
		{ k: 'History', v: 'Yellowish sputum. No breathing difficulty reported.', state: 'pending' },
		{ k: 'Examination', v: 'As stated by the doctor during the consultation.', state: 'pending' },
		{ k: 'Diagnosis', v: 'As stated by the doctor during the consultation.', state: 'pending' },
		{ k: 'Follow-up', v: 'Review after 5 days, or earlier if breathlessness develops.', state: 'pending' }
	]);
	const accepted = $derived(fields.filter((f) => f.state === 'accepted').length);

	const rules = [
		{ icon: ShieldCheck, title: 'Nothing without consent', text: 'Recording begins only after the doctor confirms the patient has agreed.' },
		{ icon: Ban, title: 'Never adds its own ideas', text: 'AURA only reorganises what was actually said. It does not suggest diagnoses or treatments.' },
		{ icon: UserCheck, title: 'The doctor has the final word', text: 'Every drafted field is accepted or edited by the doctor. Nothing is saved automatically.' },
		{ icon: Lock, title: 'Private to the recording doctor', text: 'Audio and transcripts are visible only to the doctor who recorded the consultation.' },
		{ icon: EyeOff, title: 'Kept out of logs', text: 'Audio and transcripts never enter application logs or audit metadata.' },
		{ icon: Languages, title: 'Made for how India talks', text: 'Built for Tamil–English consultations — the way doctors and patients actually speak.' }
	];

	const faqs = [
		{ q: 'What is AURA?', a: 'AURA — the Ambient Understanding and Recognition Assistant — is SymphoCare’s ambient listening feature. It listens to the consultation (with the patient’s consent), transcribes it and drafts the consultation notes for the doctor to review.' },
		{ q: 'Which languages does AURA understand?', a: 'AURA is built for Tamil, English and the natural mix of both that most consultations in Tamil Nadu use.' },
		{ q: 'Does AURA diagnose patients?', a: 'No. AURA only organises what was said in the room. It never adds diagnoses or treatment ideas, and the doctor reviews every field before it becomes part of the record.' },
		{ q: 'Does it transcribe live?', a: 'AURA works on the full recording. When the doctor stops recording, the conversation is transcribed and the draft notes appear beside the consultation form.' },
		{ q: 'Who can access the recordings?', a: 'Only the doctor who recorded the consultation. Audio and transcripts are kept out of logs and audit metadata.' },
		{ q: 'Do we need special hardware?', a: 'No special device is needed — AURA records from the consultation screen in the browser.' }
	];
</script>

<Seo
	title="AURA — Ambient Listening"
	description="AURA, SymphoCare’s Ambient Understanding and Recognition Assistant, listens to Tamil–English consultations with patient consent and drafts complaint, history, examination, diagnosis and follow-up for the doctor to review."
/>

<section class="aura-hero">
	<div class="shell hero-layout">
		<div>
			<p class="eyebrow eyebrow-light">SymphoCare · AURA</p>
			<h1>Listen to your patient.<br /><em>AURA writes the notes.</em></h1>
			<p class="full-name">Ambient Understanding and Recognition Assistant</p>
			<p class="hero-lede">
				AURA listens to the consultation — in Tamil, English or both — and drafts the notes for you
				to review. You keep your eyes on the patient, not the keyboard.
			</p>
			<div class="hero-actions">
				<a class="button button-accent" href="/contact?interest=aura">See AURA in a demo <span>→</span></a>
				<a class="button button-ghost" href="#how">How it works</a>
			</div>
		</div>

		<div class="stage" aria-label="Illustration of AURA transcribing a Tamil–English consultation and drafting notes" role="img">
			<div class="rec-card">
				<div class="rec-top">
					<span class="rec"><i></i> Recording · consent confirmed</span>
					<span class="wave" aria-hidden="true">
						{#each Array(14) as _, i (i)}<b style="animation-delay:{i * 70}ms"></b>{/each}
					</span>
				</div>
				<ul class="transcript">
					{#each lines as l, i (i)}
						<li class:on={i < shown} class={l.who === 'Doctor' ? 'doc' : 'pat'}>
							<small>{l.who}</small>
							<span>{l.text}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="draft-card" class:on={drafted}>
				<div class="draft-top"><span>AURA draft</span><i>Review needed</i></div>
				<dl>
					<dt>Complaint</dt>
					<dd>Fever × 3 days; night-time cough</dd>
					<dt>History</dt>
					<dd>Yellowish sputum, no breathlessness</dd>
				</dl>
			</div>
		</div>
	</div>
</section>

<GuideStrip
	eyebrow="Meet AURA"
	title="More eye contact. Less typing."
	text="AURA handles the note-taking during busy OPD hours, so doctors can spend the consultation looking at the patient instead of the screen."
	href="/contact?interest=aura"
	cta="Ask about AURA"
/>

<section class="section" id="how">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">How AURA works</p>
			<h2>From conversation to clinical notes in five steps.</h2>
		</div>
		<ol class="steps line-grid">
			{#each steps as s, i (s.title)}
				<li {@attach reveal(i * 70)}>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<div class="icon-chip"><s.icon size={20} strokeWidth={1.8} /></div>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section sand-section">
	<div class="shell demo">
		<div {@attach reveal()}>
			<p class="eyebrow">Try the review step</p>
			<h2>AURA drafts. You decide.</h2>
			<p class="lead small">
				This is an illustrative AURA draft. Accept the fields that are right and edit the ones that
				aren’t — exactly as a doctor does inside SymphoCare.
			</p>
			<p class="note">Notice the examination and diagnosis: AURA records only what the doctor said, and never fills in clinical judgement of its own.</p>
		</div>
		<div class="demo-body" {@attach reveal(120)}>
			<div class="demo-head">
				<div><span>Consultation</span><strong>AURA draft · Tamil–English</strong></div>
				<em>{accepted} of {fields.length} accepted</em>
			</div>
			<ul>
				{#each fields as f (f.k)}
					<li class={f.state}>
						<small>{f.k}</small>
						{#if f.state === 'editing'}
							<textarea rows="2" bind:value={f.v} aria-label="Edit {f.k}"></textarea>
						{:else}
							<p>{f.v}</p>
						{/if}
						<div class="acts">
							<button type="button" aria-pressed={f.state === 'accepted'} onclick={() => (f.state = f.state === 'accepted' ? 'pending' : 'accepted')}>
								{f.state === 'accepted' ? 'Accepted' : 'Accept'}
							</button>
							<button type="button" aria-pressed={f.state === 'editing'} onclick={() => (f.state = f.state === 'editing' ? 'accepted' : 'editing')}>
								{f.state === 'editing' ? 'Done' : 'Edit'}
							</button>
						</div>
					</li>
				{/each}
			</ul>
			<p class="save-note">Nothing is saved to the record until the doctor confirms it.</p>
		</div>
	</div>
</section>

<section class="section dark-section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow eyebrow-light">Responsible by design</p>
			<h2>Listening, <em>with care.</em></h2>
			<p>A consultation is a private conversation. AURA is built around that.</p>
		</div>
		<div class="rules">
			{#each rules as r, i (r.title)}
				<article {@attach reveal((i % 3) * 80)}>
					<r.icon size={22} strokeWidth={1.7} />
					<h3>{r.title}</h3>
					<p>{r.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">Better together</p>
			<h2>AURA, PACE and Smart Files — one consultation flow.</h2>
			<p class="lead spaced">
				PACE calls the patient in. AURA captures the conversation. Smart Files AI has already read
				the reports they brought. The doctor sees it all on one shared record.
			</p>
			<div class="links">
				<a class="text-link" href="/platform#queue">Meet PACE →</a>
				<a class="text-link" href="/smart-files">Explore Smart Files AI →</a>
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

<FinalCta eyebrow="Your next chapter, with AURA" text="See AURA turn a real Tamil–English consultation into draft notes in a guided SymphoCare demo." href="/contact?interest=aura">
	{#snippet heading()}Look at the patient.<br /><em>Let AURA take the notes.</em>{/snippet}
</FinalCta>

<style>
	.aura-hero {
		background: radial-gradient(at 85% 40%, #2b5936 0%, #133a29 58%);
		color: #fff;
		padding: 80px 0 96px;
		overflow: hidden;
	}
	.hero-layout {
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.aura-hero h1 {
		letter-spacing: -0.045em;
		font: 500 clamp(44px, 5vw, 70px) / 1.05 var(--serif);
	}
	.full-name {
		margin-top: 18px;
		color: var(--sun-light);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.hero-lede {
		color: #d5e6d7;
		max-width: 560px;
		margin: 16px 0 0;
		font-size: 19px;
		line-height: 1.65;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}

	.stage {
		position: relative;
		padding-bottom: 170px;
	}
	.rec-card {
		background: linear-gradient(160deg, #0d2d20, #0a2419);
		border: 1px solid #b9d99b30;
		border-radius: 18px;
		padding: 22px;
		box-shadow: 0 28px 60px #061b1199;
	}
	.rec-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}
	.rec {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #a9ce9a;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.rec i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: #e5675a;
		animation: blink 1.4s ease-in-out infinite;
	}
	.wave {
		display: flex;
		align-items: center;
		gap: 3px;
		height: 24px;
	}
	.wave b {
		width: 3px;
		height: 30%;
		border-radius: 2px;
		background: var(--sun);
		animation: wave 1s ease-in-out infinite;
	}
	.transcript {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
		min-height: 236px;
	}
	.transcript li {
		max-width: 88%;
		padding: 10px 14px;
		border-radius: 10px;
		font-size: 14px;
		line-height: 1.45;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.45s,
			transform 0.45s;
	}
	.transcript li.on {
		opacity: 1;
		transform: none;
	}
	.transcript small {
		display: block;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 2px;
	}
	.transcript .doc {
		background: #ffffff10;
		color: #e1eee2;
	}
	.transcript .doc small {
		color: #a9ce9a;
	}
	.transcript .pat {
		justify-self: end;
		background: #f0c45c1f;
		color: #f8f1dc;
	}
	.transcript .pat small {
		color: var(--sun);
	}
	.draft-card {
		position: absolute;
		right: -28px;
		bottom: 0;
		width: 300px;
		background: var(--cream);
		color: var(--ink);
		border-radius: 14px;
		padding: 18px;
		box-shadow: var(--shadow), 0 20px 40px #061b1155;
		opacity: 0.35;
		transform: translateY(10px);
		transition:
			opacity 0.6s,
			transform 0.6s;
	}
	.draft-card.on {
		opacity: 1;
		transform: none;
	}
	.draft-top {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		font-weight: 700;
		margin-bottom: 10px;
	}
	.draft-top i {
		font-style: normal;
		font-size: 10px;
		color: #8a5a00;
		background: #fdf3d8;
		border-radius: 4px;
		padding: 2px 8px;
	}
	dl {
		margin: 0;
		display: grid;
		gap: 2px;
	}
	dt {
		color: var(--green-700);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-top: 6px;
	}
	dd {
		margin: 0;
		font-size: 14px;
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		grid-template-columns: repeat(5, 1fr);
	}
	.steps li {
		padding: 30px 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.num {
		color: var(--green-700);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
	.steps h3 {
		font-size: 21px;
		line-height: 1.2;
	}
	.steps p {
		color: var(--muted);
		font-size: 14px;
	}

	.demo {
		display: grid;
		grid-template-columns: 0.75fr 1.25fr;
		gap: 56px;
		align-items: center;
	}
	.lead.small {
		font-size: 17px;
		margin-top: 20px;
	}
	.note {
		margin-top: 16px;
		color: #5c695f;
		font-size: 14px;
		border-left: 3px solid var(--sun);
		padding-left: 14px;
	}
	.demo-body {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 28px;
	}
	.demo-head {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 12px;
		padding-bottom: 16px;
		margin-bottom: 14px;
		border-bottom: 1px solid var(--line);
	}
	.demo-head span {
		display: block;
		color: var(--green-700);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.demo-head strong {
		font-size: 17px;
	}
	.demo-head em {
		font-style: normal;
		color: var(--muted);
		font-size: 13px;
	}
	.demo-body ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.demo-body li {
		display: grid;
		grid-template-columns: 130px 1fr auto;
		gap: 14px;
		align-items: center;
		background: #f6f8f3;
		border-left: 3px solid #c4cbbb;
		border-radius: 5px;
		padding: 12px 14px;
		transition: border-color 0.2s;
	}
	.demo-body li.accepted {
		border-left-color: var(--green-500);
	}
	.demo-body li.editing {
		border-left-color: var(--sun);
	}
	.demo-body small {
		color: var(--muted);
		font-size: 12px;
		font-weight: 700;
	}
	.demo-body li p {
		font-size: 14px;
	}
	.demo-body textarea {
		width: 100%;
		font: inherit;
		font-size: 14px;
		border: 1px solid #ccd6cd;
		border-radius: 4px;
		padding: 6px 8px;
		resize: vertical;
	}
	.demo-body textarea:focus {
		outline: 3px solid #cfe3c4;
		border-color: var(--green-700);
	}
	.acts {
		display: flex;
		gap: 6px;
	}
	.acts button {
		cursor: pointer;
		background: none;
		border: 1px solid #c4cbbb;
		border-radius: 4px;
		padding: 5px 10px;
		font-size: 12px;
		color: var(--forest-950);
		transition:
			background 0.18s,
			color 0.18s;
	}
	.acts button[aria-pressed='true']:first-child {
		background: var(--forest-800);
		border-color: var(--forest-800);
		color: #fff;
	}
	.acts button[aria-pressed='true']:last-child {
		background: var(--sun);
		border-color: var(--sun);
	}
	.save-note {
		margin-top: 14px;
		color: #526056;
		font-size: 13px;
	}

	.rules {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: #ffffff35;
	}
	.rules article {
		background: var(--forest-900);
		padding: 30px;
		color: var(--sun);
	}
	.rules h3 {
		margin: 20px 0 10px;
		font: 500 24px var(--serif);
		color: #fff;
	}
	.rules p {
		color: #b8cdbc;
		font-size: 14px;
	}

	.spaced {
		margin: 22px 0 6px;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
	}

	@keyframes blink {
		50% {
			opacity: 0.3;
		}
	}
	@keyframes wave {
		0%,
		100% {
			height: 25%;
		}
		50% {
			height: 100%;
		}
	}

	@media (width <= 1000px) {
		.steps {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (width <= 900px) {
		.hero-layout,
		.demo {
			grid-template-columns: 1fr;
		}
		.stage {
			max-width: 600px;
		}
		.draft-card {
			right: 0;
		}
		.rules {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.aura-hero {
			padding: 64px 0 72px;
		}
		.aura-hero h1 {
			font-size: 42px;
		}
		.hero-lede {
			font-size: 17px;
		}
		.hero-actions .button {
			width: 100%;
		}
		.stage {
			padding-bottom: 0;
		}
		.draft-card {
			position: relative;
			width: auto;
			margin: -16px 12px 0;
		}
		.steps,
		.rules {
			grid-template-columns: 1fr;
		}
		.demo-body {
			padding: 18px;
		}
		.demo-body li {
			grid-template-columns: 1fr auto;
		}
		.demo-body li small {
			grid-column: 1 / -1;
		}
		.demo-body li p,
		.demo-body li textarea {
			grid-column: 1;
		}
	}
</style>
