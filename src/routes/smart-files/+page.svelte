<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { FileScan, ScanText, ListChecks, ChartColumn, FileLock, Layers } from '@lucide/svelte';

	const capabilities = [
		{
			icon: FileLock,
			title: 'Private, organised storage',
			text: 'Every file lives in private storage, opened only through short-lived signed links. File types are checked by their contents, not just their names.',
			example: 'A patient’s scan, uploaded at the front desk, filed to their record.'
		},
		{
			icon: ScanText,
			title: 'Reads the document',
			text: 'AI reads printed and scanned documents so the text inside becomes searchable and usable — not just an image in a folder.',
			example: 'A photographed lab report becomes readable text.'
		},
		{
			icon: Layers,
			title: 'Sorts it for you',
			text: 'Documents are classified into ten types — lab report, imaging, discharge summary, referral, insurance, consent and more.',
			example: '“This looks like a discharge summary.”'
		},
		{
			icon: ListChecks,
			title: 'Pulls out what matters',
			text: 'Key values are extracted into structured fields — and each suggestion waits for a person to accept, edit or reject it.',
			example: 'HbA1c 6.9 % · suggested, awaiting review.'
		},
		{
			icon: ChartColumn,
			title: 'Compares reports over time',
			text: 'Compare two to four reports side by side. Units are converted, trends are drawn, and values that can’t be verified are flagged.',
			example: 'HbA1c across three visits, trending down.'
		},
		{
			icon: FileScan,
			title: 'Exports a clean summary',
			text: 'Turn a report comparison into a PDF the doctor can review with the patient or keep with the record.',
			example: 'A one-page comparison report, ready to print.'
		}
	];

	type Field = { k: string; v: string; state: 'pending' | 'accepted' | 'rejected' };
	type Example = { key: string; label: string; file: string; kind: string; fields: Field[]; note: string };

	const make = (pairs: [string, string][]): Field[] => pairs.map(([k, v]) => ({ k, v, state: 'pending' }));

	let examples = $state<Example[]>([
		{
			key: 'lab',
			label: 'Lab report',
			file: 'blood-report-scan.jpg',
			kind: 'Lab report',
			fields: make([
				['Haemoglobin', '12.8 g/dL'],
				['HbA1c', '6.9 %'],
				['Fasting glucose', '118 mg/dL'],
				['TSH', '3.1 mIU/L']
			]),
			note: 'Values flagged against the report’s own reference ranges.'
		},
		{
			key: 'discharge',
			label: 'Discharge summary',
			file: 'discharge-summary.pdf',
			kind: 'Discharge summary',
			fields: make([
				['Admission date', '12 Oct'],
				['Discharge date', '16 Oct'],
				['Final diagnosis', 'Community-acquired pneumonia'],
				['Follow-up', 'Review in 1 week']
			]),
			note: 'Ready to file under the patient’s documents.'
		},
		{
			key: 'referral',
			label: 'Referral letter',
			file: 'referral-letter.pdf',
			kind: 'Referral',
			fields: make([
				['Referred by', 'Outside physician'],
				['Reason', 'Evaluation of persistent cough'],
				['Requested', 'Chest X-ray, CBC'],
				['Urgency', 'Routine']
			]),
			note: 'Classified and linked to the patient’s record.'
		}
	]);
	let active = $state(0);
	const current = $derived(examples[active]);
	const reviewed = $derived(current.fields.filter((f) => f.state !== 'pending').length);

	const controls = [
		{ title: 'AI suggests. People decide.', text: 'Nothing extracted by AI is written to the medical record on its own. Every value is accepted, edited or rejected by a member of your team.' },
		{ title: 'Doubtful values are flagged', text: 'When the comparison can’t verify a value — a unit it can’t convert, or a number it can’t read clearly — it says so instead of guessing.' },
		{ title: 'Access follows roles', text: 'Smart Files sits inside SymphoCare’s role-based access. Staff see files only for the clinics and features they are permitted to use.' }
	];

	// Illustrative trend for the comparison mock
	const trend = [
		{ d: 'Mar', v: 7.8 },
		{ d: 'Jun', v: 7.3 },
		{ d: 'Sep', v: 6.9 }
	];
	const x = (i: number) => 30 + i * 120;
	const y = (v: number) => 110 - (v - 6.5) * 60;
</script>

<Seo
	title="Smart Files AI"
	description="Smart Files AI in SymphoCare reads, classifies and extracts key values from lab reports, discharge summaries and referrals — with every suggestion reviewed by a person — and compares reports over time."
/>

<section class="ai-hero">
	<div class="shell hero-layout">
		<div>
			<p class="eyebrow">SymphoCare · Smart Files AI</p>
			<h1>Records that <em>read themselves.</em></h1>
			<p class="lead">
				Patients arrive with folders of reports. Smart Files AI reads them, sorts them and pulls out
				the values that matter — so the doctor starts the consultation already informed.
			</p>
			<div class="hero-actions">
				<a class="button button-primary" href="/contact?interest=smart-files">Book a Smart Files demo <span>→</span></a>
				<a class="text-link" href="#try">Try the example below ↓</a>
			</div>
		</div>
		<div class="hero-stack" aria-hidden="true">
			<div class="paper p3"></div>
			<div class="paper p2"></div>
			<div class="paper p1">
				<span class="tag">Classified · Lab report</span>
				<i style="width:80%"></i><i style="width:64%"></i><i style="width:72%"></i>
				<div class="hl"><small>HbA1c</small><b>6.9 %</b></div>
				<div class="hl"><small>TSH</small><b>3.1 mIU/L</b></div>
			</div>
			<div class="badge"><span>Assistive AI</span><strong>Reviewed by you.</strong></div>
		</div>
	</div>
</section>

<GuideStrip
	title="Less typing. Fewer missed values."
	text="Smart Files AI is an optional capability inside SymphoCare. Talk to us about whether it suits the volume of documents your clinic handles."
	href="/contact?interest=smart-files"
	cta="Discuss Smart Files"
/>

<section class="section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">What Smart Files AI does</p>
			<h2>From a pile of paper to a clear clinical picture.</h2>
		</div>
		<div class="capabilities">
			{#each capabilities as c, i (c.title)}
				<article {@attach reveal((i % 3) * 80)}>
					<div class="icon-chip"><c.icon size={20} strokeWidth={1.8} /></div>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
					<p class="example"><span>For example</span>{c.example}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section sand-section" id="try">
	<div class="shell conversation">
		<div {@attach reveal()}>
			<p class="eyebrow">See it in action</p>
			<h2>Pick a document. Review what AI found.</h2>
			<p class="lead small">This is an illustrative example of the review step. In SymphoCare, accepted values go to the patient’s record — rejected ones never do.</p>
		</div>
		<div class="example-body" {@attach reveal(120)}>
			<div class="options" role="group" aria-label="Choose an example document">
				{#each examples as ex, i (ex.key)}
					<button type="button" aria-pressed={active === i} onclick={() => (active = i)}>{ex.label}</button>
				{/each}
			</div>
			<div class="upload">
				<span>Uploaded</span>
				<strong>{current.file}</strong>
				<em>Classified as {current.kind}</em>
			</div>
			<div class="suggest">
				<span>SymphoCare suggests</span>
				<ul>
					{#each current.fields as f (f.k)}
						<li class={f.state}>
							<small>{f.k}</small>
							<b>{f.v}</b>
							<div class="acts">
								<button type="button" aria-pressed={f.state === 'accepted'} onclick={() => (f.state = f.state === 'accepted' ? 'pending' : 'accepted')}>Accept</button>
								<button type="button" aria-pressed={f.state === 'rejected'} onclick={() => (f.state = f.state === 'rejected' ? 'pending' : 'rejected')}>Reject</button>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<p class="review" aria-live="polite">
				{reviewed} of {current.fields.length} reviewed · {current.note}
			</p>
		</div>
	</div>
</section>

<section class="section">
	<div class="shell two-col compare">
		<div {@attach reveal()}>
			<p class="eyebrow">AI report comparison</p>
			<h2>See the trend, not just the last result.</h2>
			<p class="lead">
				Choose two to four reports and SymphoCare lines them up — converting units, drawing the trend
				and flagging anything it can’t verify.
			</p>
			<ul class="check-list">
				<li>Side-by-side comparison of 2–4 reports</li>
				<li>Unit conversion so values compare fairly</li>
				<li>Unverifiable values flagged, never guessed</li>
				<li>Export the comparison as a PDF</li>
			</ul>
		</div>
		<figure class="trend-card" {@attach reveal(120)}>
			<figcaption><span>HbA1c · 3 reports</span><b>Improving</b></figcaption>
			<svg viewBox="0 0 300 140" role="img" aria-label="Illustrative HbA1c trend: 7.8% in March, 7.3% in June, 6.9% in September">
				<line x1="20" y1="120" x2="290" y2="120" class="axis" />
				<polyline points={trend.map((t, i) => `${x(i)},${y(t.v)}`).join(' ')} class="line" />
				{#each trend as t, i (t.d)}
					<circle cx={x(i)} cy={y(t.v)} r="5" class="dot" />
					<text x={x(i)} y={y(t.v) - 12} text-anchor="middle" class="val">{t.v}%</text>
					<text x={x(i)} y="136" text-anchor="middle" class="lbl">{t.d}</text>
				{/each}
			</svg>
			<p class="fine">Illustrative values.</p>
		</figure>
	</div>
</section>

<section class="section dark-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow eyebrow-light">Responsible by design</p>
			<h2>Helpful AI, <em>kept in its lane.</em></h2>
		</div>
		<div class="control-list">
			{#each controls as c, i (c.title)}
				<article {@attach reveal(i * 80)}>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<FinalCta eyebrow="Your next chapter, with Smart Files" text="See Smart Files AI work through real document types in a guided SymphoCare demo." href="/contact?interest=smart-files">
	{#snippet heading()}Let the paperwork<br /><em>read itself.</em>{/snippet}
</FinalCta>

<style>
	.ai-hero {
		background: linear-gradient(115deg, #f8f7f2 40%, #eee6d2);
		padding: 80px 0 96px;
		overflow: hidden;
	}
	.hero-layout {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.ai-hero h1 {
		letter-spacing: -0.045em;
		color: var(--forest-950);
		font: 500 clamp(48px, 5.5vw, 78px) / 1.05 var(--serif);
	}
	.ai-hero h1 em {
		color: #507436;
	}
	.ai-hero .lead {
		color: #374d3c;
		margin: 25px 0 8px;
		max-width: 560px;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 22px;
		margin-top: 22px;
	}
	.hero-actions .text-link {
		margin-top: 0;
	}
	.hero-stack {
		position: relative;
		height: 400px;
	}
	.paper {
		position: absolute;
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		box-shadow: var(--shadow);
		width: 70%;
		height: 300px;
	}
	.p3 {
		left: 22%;
		top: 10px;
		transform: rotate(6deg);
		background: #f3f1e8;
	}
	.p2 {
		left: 14%;
		top: 30px;
		transform: rotate(-4deg);
		background: #f8f7f2;
	}
	.p1 {
		left: 8%;
		top: 54px;
		padding: 26px;
		display: grid;
		align-content: start;
		gap: 10px;
	}
	.p1 .tag {
		color: var(--green-700);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-bottom: 6px;
	}
	.p1 i {
		height: 6px;
		background: #e6ece2;
		border-radius: 5px;
	}
	.hl {
		display: flex;
		justify-content: space-between;
		background: #fdf3d8;
		border-left: 3px solid var(--sun);
		padding: 8px 12px;
		font-size: 14px;
		margin-top: 6px;
	}
	.hl small {
		color: var(--muted);
		font-size: 14px;
	}
	.badge {
		position: absolute;
		right: 0;
		bottom: 10px;
		background: var(--forest-800);
		color: #fff;
		border-radius: 8px;
		padding: 14px 20px;
		box-shadow: var(--shadow);
	}
	.badge span {
		display: block;
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--sun-light);
		font-weight: 700;
	}
	.badge strong {
		font: 500 22px var(--serif);
	}

	.capabilities {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 44px 36px;
	}
	.capabilities article {
		border-top: 1px solid #adbea3;
		padding-top: 24px;
		display: flex;
		flex-direction: column;
	}
	.capabilities h3 {
		margin: 18px 0 12px;
		font-size: 26px;
		line-height: 1.25;
	}
	.capabilities article > p:not(.example) {
		color: #526056;
	}
	.example {
		margin-top: auto;
		padding-top: 22px;
		color: var(--forest-950);
		font-size: 15px;
	}
	.example span {
		display: block;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #526056;
		font-size: 11px;
		margin-bottom: 4px;
	}

	.conversation {
		display: grid;
		grid-template-columns: 0.7fr 1.3fr;
		gap: 50px;
		align-items: center;
	}
	.lead.small {
		font-size: 17px;
		margin-top: 20px;
	}
	.example-body {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 32px;
	}
	.options {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 24px;
	}
	.options button,
	.acts button {
		cursor: pointer;
		color: var(--forest-950);
		background: none;
		border: 1px solid #c4cbbb;
		border-radius: 4px;
		padding: 10px 16px;
		font-size: 14px;
		transition:
			background 0.18s,
			color 0.18s;
	}
	.options button[aria-pressed='true'] {
		background: var(--forest-800);
		border-color: var(--forest-800);
		color: #fff;
	}
	.upload,
	.suggest {
		border-radius: 5px;
		padding: 18px 20px;
	}
	.upload {
		background: #f2f1eb;
		margin-bottom: 12px;
		display: grid;
		gap: 2px;
	}
	.upload span,
	.suggest > span {
		color: var(--forest-800);
		font-size: 12px;
		font-weight: 700;
	}
	.upload em {
		font-style: normal;
		color: var(--green-700);
		font-size: 13px;
	}
	.suggest {
		background: #eaf1e5;
	}
	.suggest ul {
		list-style: none;
		margin: 10px 0 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.suggest li {
		display: grid;
		grid-template-columns: 1fr 1.2fr auto;
		align-items: center;
		gap: 12px;
		background: #fff;
		border-radius: 5px;
		padding: 10px 12px;
		border-left: 3px solid #c4cbbb;
		transition: border-color 0.2s, opacity 0.2s;
	}
	.suggest li.accepted {
		border-left-color: var(--green-500);
	}
	.suggest li.rejected {
		border-left-color: #c2603f;
		opacity: 0.6;
	}
	.suggest li.rejected b {
		text-decoration: line-through;
	}
	.suggest small {
		color: var(--muted);
		font-size: 13px;
	}
	.suggest b {
		font-size: 14px;
	}
	.acts {
		display: flex;
		gap: 6px;
	}
	.acts button {
		padding: 5px 10px;
		font-size: 12px;
	}
	.acts button[aria-pressed='true']:first-child {
		background: var(--forest-800);
		border-color: var(--forest-800);
		color: #fff;
	}
	.acts button[aria-pressed='true']:last-child {
		background: #c2603f;
		border-color: #c2603f;
		color: #fff;
	}
	.review {
		margin-top: 16px;
		color: #526056;
		font-size: 14px;
	}

	.compare {
		align-items: center;
	}
	.compare .lead {
		margin-top: 22px;
	}
	.trend-card {
		margin: 0;
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 26px;
		box-shadow: var(--shadow);
	}
	.trend-card figcaption {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin-bottom: 12px;
	}
	.trend-card figcaption span {
		font-weight: 700;
	}
	.trend-card figcaption b {
		color: var(--green-700);
	}
	.trend-card svg {
		width: 100%;
		height: auto;
	}
	.axis {
		stroke: var(--line);
	}
	.line {
		fill: none;
		stroke: var(--green-700);
		stroke-width: 3;
		stroke-linejoin: round;
	}
	.dot {
		fill: #fff;
		stroke: var(--green-700);
		stroke-width: 3;
	}
	.val {
		font: 700 12px var(--sans);
		fill: var(--forest-900);
	}
	.lbl {
		font: 500 11px var(--sans);
		fill: var(--muted);
	}
	.fine {
		color: var(--muted);
		font-size: 12px;
		margin-top: 6px;
	}

	.control-list article + article {
		border-top: 1px solid #ffffff30;
		margin-top: 24px;
		padding-top: 24px;
	}
	.control-list h3 {
		color: #fff;
		margin-bottom: 10px;
		font-size: 26px;
	}
	.control-list p {
		color: #d5e6d7;
	}

	@media (width <= 900px) {
		.hero-layout,
		.conversation {
			grid-template-columns: 1fr;
		}
		.capabilities {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.ai-hero {
			padding: 60px 0 70px;
		}
		.ai-hero h1 {
			font-size: 46px;
		}
		.hero-stack {
			height: 340px;
		}
		.paper {
			width: 84%;
			height: 260px;
		}
		.capabilities {
			grid-template-columns: 1fr;
		}
		.example-body {
			padding: 20px;
		}
		.suggest li {
			grid-template-columns: 1fr auto;
		}
		.suggest li small {
			grid-column: 1 / -1;
		}
	}
</style>
