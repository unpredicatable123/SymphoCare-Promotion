<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import FinalCta from '#lib/components/FinalCta.svelte';
	import { reveal } from '#lib/reveal.ts';
	import { Database, KeyRound, Lock, History, FileLock, ShieldCheck, EyeOff, HandHeart, Server } from '@lucide/svelte';

	const pillars = [
		{
			icon: Database,
			label: 'Isolation',
			title: 'Every clinic’s data, kept apart',
			text: 'Every query is scoped to the organisation and clinic it belongs to — and database row-level security is switched on for every table as a second line of defence.'
		},
		{
			icon: KeyRound,
			label: 'Access',
			title: 'Role-based access, checked on the server',
			text: 'Each request is checked from session to clinic membership, role and permission — across roughly a hundred fine-grained permissions. Hiding a button is never the only control.'
		},
		{
			icon: Lock,
			label: 'Sessions',
			title: 'Separate portals, sensible sessions',
			text: 'Staff and patient sign-ins are kept apart by portal. Sessions expire after three hours, signing out every open tab, and repeated login attempts are rate-limited.'
		},
		{
			icon: History,
			label: 'Audit',
			title: 'An audit trail that can’t be rewritten',
			text: 'Important actions are recorded in an append-only audit log, enforced by the database itself. Audit entries are scrubbed of personal health details and secrets.'
		},
		{
			icon: ShieldCheck,
			label: 'Integrity',
			title: 'Records that stay true',
			text: 'Completed consultations and finalised prescriptions are locked. Payments are never edited — corrections are made by reversal, so the financial trail stays complete.'
		},
		{
			icon: FileLock,
			label: 'Files',
			title: 'Private files, short-lived links',
			text: 'Documents live in private storage and open only through signed links that expire within minutes. Uploads are checked by their actual contents.'
		},
		{
			icon: HandHeart,
			label: 'Patients',
			title: 'Patients see what the clinic releases',
			text: 'The patient portal shows only records the clinic has released and files it has explicitly shared. Patients agree to versioned terms and a privacy notice.'
		},
		{
			icon: EyeOff,
			label: 'Platform staff',
			title: 'Our team doesn’t browse your records',
			text: 'SymphoCare’s own administrative roles manage subscriptions, support and operations — and never grant access to clinical data.'
		},
		{
			icon: Server,
			label: 'Web',
			title: 'Hardened in the browser',
			text: 'A strict, nonce-based content security policy, HSTS, frame blocking and other modern browser protections are applied to every page. Application logs avoid personal health information.'
		}
	];
</script>

<Seo
	title="Security & privacy"
	description="How SymphoCare protects clinic and patient data: tenant isolation with row-level security, server-side role-based access, append-only audit logs, immutable records, private files and a release-only patient portal."
/>

<PageHero
	eyebrow="Security & privacy"
	sub="Patient records deserve care beyond the consulting room. Here is how SymphoCare is built to protect them."
>
	{#snippet heading()}Trust is part of <em>the treatment.</em>{/snippet}
</PageHero>

<GuideStrip
	title="Have a security questionnaire?"
	text="Bring it to the conversation. We’ll walk your team through how access, isolation, audit and data handling work in SymphoCare."
	href="/contact?interest=security"
	cta="Talk to the team"
/>

<section class="section">
	<div class="shell">
		<div class="section-intro" {@attach reveal()}>
			<p class="eyebrow">Built in, not bolted on</p>
			<h2>Nine ways SymphoCare looks after your data.</h2>
		</div>
		<div class="pillars">
			{#each pillars as p, i (p.title)}
				<article {@attach reveal((i % 3) * 80)}>
					<div class="icon-chip"><p.icon size={20} strokeWidth={1.8} /></div>
					<p class="card-label">{p.label}</p>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section dark-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow eyebrow-light">AI and your records</p>
			<h2>AI assists. <em>People decide.</em></h2>
		</div>
		<div class="dark-copy" {@attach reveal(120)}>
			<p>
				Smart Files AI reads and classifies documents and suggests extracted values. It never writes
				to a medical record on its own — every suggestion is accepted, edited or rejected by your
				team.
			</p>
			<p>
				Report comparisons flag values that can’t be verified instead of guessing, so the doctor
				always knows what the AI was unsure about.
			</p>
			<a class="text-link light-link" href="/smart-files">How Smart Files AI works →</a>
		</div>
	</div>
</section>

<section class="section warm-section">
	<div class="shell two-col">
		<div {@attach reveal()}>
			<p class="eyebrow">Ready for India’s digital health future</p>
			<h2>An ABDM-ready architecture.</h2>
		</div>
		<div {@attach reveal(120)}>
			<p class="lead">
				SymphoCare’s records are designed to be shared the way India’s Ayushman Bharat Digital
				Mission expects — with consent at the centre.
			</p>
			<p>
				The groundwork for ABHA linking, consent management and standards-based (FHIR) record
				packaging is part of the platform’s design. ABDM health-information exchange is on our
				roadmap; ask us about its status for your rollout.
			</p>
		</div>
	</div>
</section>

<FinalCta eyebrow="Questions about data?" text="We’re happy to walk your doctors, administrators or IT advisor through SymphoCare’s security model in detail.">
	{#snippet heading()}Care for patients.<br /><em>Care for their data.</em>{/snippet}
</FinalCta>

<style>
	.pillars {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	.pillars article {
		background: #fff;
		border: 1px solid var(--line);
		padding: 30px;
		transition:
			box-shadow 0.24s,
			border-color 0.24s;
	}
	.pillars article:hover {
		border-color: #97ac9c;
		box-shadow: 0 14px 32px #0d2d2012;
	}
	.pillars .card-label {
		margin-top: 22px;
	}
	.pillars h3 {
		margin: 10px 0;
		font-size: 23px;
		line-height: 1.25;
	}
	.pillars article > p:last-child {
		color: var(--muted);
		font-size: 15px;
	}
	.dark-copy {
		color: #d5e6d7;
		font-size: 18px;
	}
	.dark-copy p + p {
		margin-top: 22px;
	}
	@media (width <= 900px) {
		.pillars {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.pillars {
			grid-template-columns: 1fr;
		}
	}
</style>
