<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import GuideStrip from '#lib/components/GuideStrip.svelte';
	import { site } from '#lib/site.ts';
	import { onMount } from 'svelte';
	import { Phone, Mail, MapPin } from '@lucide/svelte';

	// Enquiries are emailed to hello@symphozen.com through FormSubmit (https://formsubmit.co) — no backend needed.
	// FormSubmit requires a one-time activation: the first submission sends a confirmation link to the inbox.
	// After activating, you can swap the address for the random alias FormSubmit provides via VITE_ENQUIRY_ENDPOINT.
	const endpoint =
		(import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined) ||
		`https://formsubmit.co/ajax/${site.email}`;

	const interestOptions = [
		{ key: 'pricing', label: 'Pricing & proposal' },
		{ key: 'aura', label: 'AURA ambient listening' },
		{ key: 'pace', label: 'PACE queue management' },
		{ key: 'laboratory', label: 'Laboratory workbench' },
		{ key: 'pharmacy', label: 'Pharmacy and inventory' },
		{ key: 'smart-files', label: 'Smart Files AI' },
		{ key: 'patient-portal', label: 'Patient portal' },
		{ key: 'multi-clinic', label: 'Multi-clinic / branches' },
		{ key: 'security', label: 'Security walkthrough' }
	];

	let form = $state({
		clinicName: '',
		contactName: '',
		email: '',
		phone: '',
		city: '',
		clinics: '',
		doctors: '',
		setting: '',
		model: 'Help me choose',
		notes: '',
		website: '' // honeypot
	});
	let interests = $state<string[]>([]);
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

	onMount(() => {
		// read query params on the client (the page is prerendered)
		const params = new URLSearchParams(window.location.search);
		const interest = params.get('interest');
		if (interest && interestOptions.some((o) => o.key === interest)) interests = [interest];
		const model = params.get('model');
		if (model === 'saas') form.model = 'SaaS Subscription';
		if (model === 'license') form.model = 'One-time License + Yearly Maintenance';
	});

	function summary() {
		const picked = interestOptions.filter((o) => interests.includes(o.key)).map((o) => o.label);
		return [
			`Clinic / organisation: ${form.clinicName}`,
			`Contact: ${form.contactName}`,
			`Email: ${form.email}`,
			`Phone: ${form.phone}`,
			`City: ${form.city}`,
			`Clinics / branches: ${form.clinics}`,
			`Doctors: ${form.doctors || '-'}`,
			`Care setting: ${form.setting || '-'}`,
			`Commercial model: ${form.model}`,
			`Interested in: ${picked.join(', ') || '-'}`,
			'',
			form.notes
		].join('\n');
	}

	const subject = () => `SymphoCare demo request — ${form.clinicName}`;
	// Fallback if delivery fails: open the visitor's email app with everything pre-filled.
	const mailtoHref = () =>
		`mailto:${site.email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(summary())}`;

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (form.website) return; // honeypot filled → bot, drop silently
		status = 'sending';
		const picked = interestOptions.filter((o) => interests.includes(o.key)).map((o) => o.label);
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					_subject: subject(),
					_template: 'table',
					_replyto: form.email,
					Product: 'SymphoCare',
					'Clinic / organisation': form.clinicName,
					'Contact name': form.contactName,
					Email: form.email,
					Phone: form.phone,
					City: form.city,
					'Clinics / branches': form.clinics,
					Doctors: form.doctors || '-',
					'Care setting': form.setting || '-',
					'Commercial model': form.model,
					'Interested in': picked.join(', ') || '-',
					Message: form.notes || '-'
				})
			});
			const data = await res.json().catch(() => ({}));
			status = res.ok && String(data.success) === 'true' ? 'sent' : 'error';
		} catch {
			status = 'error';
		}
	}
</script>

<Seo
	title="Book a Demo"
	description="Book a guided SymphoCare demo. Tell us about your clinic and we’ll shape the walkthrough around your front desk, doctors, lab and pharmacy."
/>

<PageHero eyebrow="Let’s talk clinics" sub="Book a guided demo of SymphoCare. We’re based in Salem, Tamil Nadu.">
	{#snippet heading()}Bring your questions. <em>We’ll bring a clear view.</em>{/snippet}
</PageHero>

<GuideStrip
	title="Tell us what a clinic day looks like."
	text="How patients arrive, who sees them, where reports and prescriptions go. Select the capabilities you care about and we’ll include them in your demo."
	href="/platform"
	cta="Explore the platform"
/>

<section class="section">
	<div class="shell contact-layout">
		<aside class="contact-aside">
			<p class="eyebrow">Talk to the team</p>
			<h2>See how the platform fits your practice.</h2>
			<p>
				Whether you run a solo practice, a multi-doctor clinic, a coworking space, a diagnostic centre
				or a hospital OPD, start with the work you want to make clearer: appointments, the queue,
				consultations, the lab, the pharmacy or billing.
			</p>
			<p>We’ll walk through the relevant capabilities, explain both commercial models and share pricing tailored to your requirements.</p>
			<div class="contact-details">
				<a href={site.phoneHref}><Phone size={16} /> {site.phone}</a>
				<a href="mailto:{site.email}"><Mail size={16} /> {site.email}</a>
				<span><MapPin size={16} /> {site.presence}</span>
			</div>
		</aside>

		<div class="contact-form">
			{#if status === 'sent'}
				<div class="form-success" role="status">
					<img src="/brand/symphocare-mark.png" alt="" width="120" height="120" />
					<h2>Thank you, {form.contactName.split(' ')[0] || 'there'}.</h2>
					<p>Your enquiry is with the SymphoCare team. We’ll be in touch shortly to plan your demo.</p>
				</div>
			{:else}
				<div class="form-heading">
					<p class="eyebrow">Book a conversation</p>
					<h2>Tell us about your clinic.</h2>
					<p>Share how your clinic runs today. We’ll shape the demo around your practice and the workflows you want to connect.</p>
				</div>
				<form onsubmit={submit}>
					<div class="form-grid">
						<label><span>Clinic / organisation name *</span><input required name="clinicName" bind:value={form.clinicName} autocomplete="organization" /></label>
						<label><span>Your name *</span><input required name="contactName" bind:value={form.contactName} autocomplete="name" /></label>
						<label><span>Work email *</span><input required type="email" name="email" bind:value={form.email} autocomplete="email" /></label>
						<label><span>Phone number *</span><input required type="tel" name="phone" bind:value={form.phone} autocomplete="tel" /></label>
						<label><span>City *</span><input required name="city" bind:value={form.city} autocomplete="address-level2" /></label>
						<label>
							<span>Number of clinics / branches *</span>
							<select required name="clinics" bind:value={form.clinics}>
								<option value="">Select</option>
								<option>1 clinic</option>
								<option>2–3 clinics</option>
								<option>4–10 clinics</option>
								<option>More than 10</option>
							</select>
						</label>
						<label>
							<span>Number of doctors</span>
							<select name="doctors" bind:value={form.doctors}>
								<option value="">Select</option>
								<option>1</option>
								<option>2–5</option>
								<option>6–15</option>
								<option>More than 15</option>
							</select>
						</label>
						<label>
							<span>Care setting</span>
							<select name="setting" bind:value={form.setting}>
								<option value="">Select</option>
								<option>Solo practice</option>
								<option>Multi-doctor clinic</option>
								<option>Medical coworking space</option>
								<option>Hospital OPD</option>
								<option>Diagnostic centre / lab</option>
								<option>Pharmacy</option>
								<option>AYUSH practice</option>
								<option>Functional medicine</option>
								<option>Other</option>
							</select>
						</label>
						<label class="field-wide">
							<span>Commercial model</span>
							<select name="model" bind:value={form.model}>
								<option>Help me choose</option>
								<option>SaaS Subscription</option>
								<option>One-time License + Yearly Maintenance</option>
							</select>
						</label>
						<label class="field-wide">
							<span>What would you like to discuss?</span>
							<textarea name="notes" rows="4" bind:value={form.notes}></textarea>
						</label>
					</div>
					<fieldset class="interests">
						<legend>Capabilities you’d like to explore</legend>
						{#each interestOptions as o (o.key)}
							<label><input type="checkbox" value={o.key} bind:group={interests} /> {o.label}</label>
						{/each}
					</fieldset>
					<label class="honeypot" aria-hidden="true">Website <input tabindex="-1" autocomplete="off" name="website" bind:value={form.website} /></label>
					<button class="button button-primary submit" type="submit" disabled={status === 'sending'}>
						{status === 'sending' ? 'Sending…' : 'Send enquiry'} <span>→</span>
					</button>
					{#if status === 'error'}
						<p class="form-error" role="alert">
							We couldn’t send your enquiry just now.
							<a href={mailtoHref()}>Send it by email instead</a> or call
							<a href={site.phoneHref}>{site.phone}</a>.
						</p>
					{/if}
					<p class="privacy-note">By submitting, you agree that SymphoZen Labs may contact you about SymphoCare.</p>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-layout {
		display: grid;
		grid-template-columns: 0.7fr 1.3fr;
		gap: 90px;
		align-items: start;
	}
	.contact-aside h2 {
		color: var(--forest-900);
		letter-spacing: -0.04em;
		font: 500 44px/1.1 var(--serif);
	}
	.contact-aside > p:not(.eyebrow) {
		color: var(--muted);
		margin-top: 20px;
		font-size: 17px;
	}
	.contact-details {
		display: grid;
		gap: 12px;
		margin-top: 38px;
		padding-top: 25px;
		border-top: 1px solid var(--line);
		font-weight: 700;
	}
	.contact-details a,
	.contact-details span {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.contact-details a {
		color: var(--green-700);
	}
	.contact-details span {
		color: var(--muted);
		font-weight: 500;
	}
	.contact-form {
		background: #fff;
		border: 1px solid var(--line);
		padding: 38px;
	}
	.form-heading {
		border-bottom: 1px solid var(--line);
		margin-bottom: 25px;
		padding-bottom: 25px;
	}
	.form-heading h2 {
		font-size: 35px;
		color: var(--forest-900);
	}
	.form-heading > p:last-child {
		color: var(--muted);
		margin-top: 9px;
	}
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 17px;
	}
	.form-grid label {
		display: grid;
		gap: 7px;
		font-size: 13px;
		font-weight: 700;
	}
	.form-grid label span {
		color: #34423a;
	}
	.field-wide {
		grid-column: 1 / -1;
	}
	input,
	select,
	textarea {
		width: 100%;
		color: var(--ink);
		font: inherit;
		font-size: 14px;
		font-weight: 400;
		background: #fbfcfa;
		border: 1px solid #ccd6cd;
		border-radius: 4px;
		padding: 11px 12px;
	}
	textarea {
		resize: vertical;
	}
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--green-700);
		outline: 3px solid #cfe3c4;
	}
	.interests {
		border: 1px solid var(--line);
		margin: 24px 0;
		padding: 18px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2px 16px;
	}
	.interests legend {
		padding: 0 6px;
		font-size: 14px;
		font-weight: 700;
	}
	.interests label {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 6px 0;
		font-size: 14px;
	}
	.interests input {
		width: auto;
		accent-color: var(--forest-800);
	}
	.honeypot {
		position: absolute;
		left: -10000px;
	}
	.submit[disabled] {
		opacity: 0.7;
		cursor: wait;
	}
	.privacy-note {
		color: var(--muted);
		margin-top: 14px;
		font-size: 12px;
	}
	.form-error {
		color: #a23a2c;
		margin-top: 14px;
		font-weight: 700;
	}
	.form-error a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.form-success {
		text-align: center;
		padding: 50px 20px;
	}
	.form-success img {
		margin: 0 auto 20px;
		width: 120px;
		height: auto;
	}
	.form-success h2 {
		color: var(--forest-900);
		font: 500 40px var(--serif);
	}
	.form-success p {
		color: var(--muted);
		margin-top: 12px;
	}
	@media (width <= 900px) {
		.contact-layout {
			grid-template-columns: 1fr;
			gap: 45px;
		}
	}
	@media (width <= 600px) {
		.form-grid,
		.interests {
			grid-template-columns: 1fr;
		}
		.contact-form {
			padding: 24px 18px;
		}
		.contact-aside h2 {
			font-size: 38px;
		}
	}
</style>
