<script lang="ts">
	import Logo from './Logo.svelte';
	import { site } from '#lib/site.ts';
</script>

<footer class="site-footer">
	<div class="shell">
		<div class="footer-welcome">
			<div>
				<p class="eyebrow">One shared record. All the way through.</p>
				<h2>Your clinic’s next chapter.<br /><em>Connected care, healthier lives.</em></h2>
			</div>
			<a class="button button-accent" href="/contact">Let’s talk <span aria-hidden="true">→</span></a>
		</div>

		<div class="footer-main">
			<div class="footer-brand">
				<a class="footer-logo" href="/" aria-label="SymphoCare home"><Logo light lazy /></a>
				<p>The connected clinic platform for front desk, doctors, laboratory, pharmacy and patients.</p>
				<a class="footer-ai-link" href="/aura">AURA. Look at the patient, not the keyboard. <span aria-hidden="true">↗</span></a>
			</div>
			<nav class="footer-links" aria-label="Footer platform navigation">
				<h3>Explore</h3>
				<a href="/platform">The platform</a>
				<a href="/aura">AURA ambient listening</a>
				<a href="/platform#queue">PACE queue management</a>
				<a href="/smart-files">Smart Files AI</a>
				<a href="/solutions">Solutions by care setting</a>
				<a href="/security">Security &amp; privacy</a>
				<a href="/licensing">Licensing options</a>
			</nav>
			<nav class="footer-links" aria-label="Footer company navigation">
				<h3>Behind the product</h3>
				<a href="/about">About SymphoCare</a>
				<a href={site.companyUrl} rel="noopener">{site.company} <span aria-hidden="true">↗</span></a>
				<a href="/contact">Book a demo</a>
			</nav>
			<div class="footer-contact">
				<h3>Start a conversation</h3>
				<address>
					<a href={site.phoneHref}>{site.phone}</a>
					<a href="mailto:{site.email}">{site.email}</a>
				</address>
				<p class="footer-presence"><span aria-hidden="true"></span>Based in<br />{site.presence}</p>
			</div>
		</div>

		<div class="footer-base">
			<p>© {new Date().getFullYear()} {site.company} <span aria-hidden="true">·</span> SymphoCare Clinic Platform</p>
			<a href="#page-top">Back to top <span aria-hidden="true">↑</span></a>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		color: #d5e6d7;
		background: #102d20;
		padding: 0 0 22px;
		border-top: 1px solid #ffffff14;
	}
	.footer-welcome {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: end;
		gap: 30px;
		padding: 72px 0 56px;
		border-bottom: 1px solid #ffffff1f;
	}
	.footer-welcome .eyebrow {
		color: #a9ce9a;
	}
	.footer-welcome h2 {
		color: #fff;
		letter-spacing: -0.04em;
		font: 500 clamp(32px, 4vw, 48px) / 1.1 var(--serif);
	}
	.footer-main {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
		gap: 40px;
		padding-top: 56px;
	}
	.footer-logo {
		display: block;
		width: 210px;
		margin-bottom: 18px;
	}
	.footer-brand p {
		color: #b8cdbc;
		font-size: 14px;
		max-width: 300px;
	}
	.footer-ai-link {
		display: inline-block;
		margin-top: 16px;
		color: var(--sun-light);
		font-size: 13px;
		font-weight: 700;
	}
	h3 {
		color: #fff;
		margin-bottom: 14px;
		font: 700 13px var(--sans);
	}
	.footer-links a,
	address a {
		display: block;
		color: #b8cdbc;
		margin: 7px 0;
		font-size: 13px;
		font-style: normal;
	}
	.footer-links a:hover,
	address a:hover {
		color: #fff;
	}
	address {
		font-style: normal;
	}
	.footer-presence {
		display: flex;
		gap: 9px;
		align-items: flex-start;
		margin-top: 14px;
		color: #b8cdbc;
		font-size: 13px;
		line-height: 1.5;
	}
	.footer-presence span {
		width: 8px;
		height: 8px;
		margin-top: 6px;
		border-radius: 50%;
		background: var(--sun);
		flex-shrink: 0;
	}
	.footer-base {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		margin-top: 52px;
		padding-top: 18px;
		border-top: 1px solid #ffffff22;
		color: #8ba391;
		font-size: 12px;
	}
	.footer-base a:hover {
		color: #fff;
	}
	@media (width <= 900px) {
		.footer-main {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= 600px) {
		.footer-welcome,
		.footer-main,
		.footer-base {
			grid-template-columns: 1fr;
			display: grid;
		}
		.footer-welcome .button {
			justify-self: start;
		}
	}
</style>
