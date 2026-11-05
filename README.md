# SymphoCare — promotion website

Marketing site for **SymphoCare** (SymphoZen Labs), built with SvelteKit 3 / Svelte 5.
It shares SymphoServe's design language: Google Sans + Playfair Display, forest-green / cream / sun palette,
1px line grids, and the same page structure.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run check      # type + template checks
npm run build      # static site → build/
npm run preview    # serve the production build
```

## Pages

| Route          | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| `/`            | Home: hero with live queue-board mock, visit story, platform, portals, AI, FAQ |
| `/platform`    | All 12 capabilities in detail, plus a clearly labelled roadmap             |
| `/smart-files` | Smart Files AI: interactive "review what AI found" demo, report comparison |
| `/solutions`   | By care setting (8) and by clinic role (8)                                 |
| `/security`    | Verified security & privacy controls                                      |
| `/licensing`   | SaaS Subscription vs One-time License + Yearly Maintenance (no prices)     |
| `/about`       | Story, principles, SymphoZen Labs                                          |
| `/contact`     | Demo enquiry form                                                         |

## Deploy

The site is fully prerendered (`@sveltejs/adapter-static`) into `build/`.

- **Vercel:** import the repo and deploy. `vercel.json` sets the output directory to `build`
  and enables clean URLs (`/platform` → `platform.html`). Leave the Output Directory setting
  in the Vercel dashboard empty, so `vercel.json` controls it.
- **Other static hosts** (Netlify, Cloudflare Pages, S3, Hostinger…): publish `build/`.
  Pages are emitted as `platform.html` etc.; `404.html` is the not-found page.

## Contact form

Enquiries are emailed to **hello@symphozen.com** via [FormSubmit](https://formsubmit.co) (free, no backend, no API key).

**One-time activation (required before go-live):** the very first submission makes FormSubmit send an
activation email to hello@symphozen.com. Click the link in it. Until then, submissions show an error
with a "send by email instead" fallback. After activating, FormSubmit also gives you a random alias. To keep
the address out of the page source, rebuild with:

```sh
VITE_ENQUIRY_ENDPOINT=https://formsubmit.co/ajax/<your-alias> npm run build
```

Any other JSON form endpoint (Web3Forms, your own API) can be used the same way.

## Content guard-rails

The copy was written from the SymphoCare codebase and only claims what is built.
Keep these off the site until they ship. They are either not built yet or only partly built
(see `MASTER_ROADMAP.md` / `AI_AGENT.md` in the product repo):

- Drug-interaction checking, ICD-10 coding, analyzer interfacing (HL7/ASTM), QC / Levey-Jennings, reagent inventory
- WhatsApp / SMS messaging, payment gateway, 2FA, offline / mobile app
- **Any** certification or compliance claim (HIPAA, ISO, NABL, DPDP, "ABDM certified/integrated").
  Use "ABDM-ready architecture" only.

Contact details and company info live in `src/lib/site.ts`. Brand assets are in `static/brand/`.
