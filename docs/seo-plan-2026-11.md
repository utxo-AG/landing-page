# SEO plan (2026-11-26)

Goal from Phil: as much relevant organic traffic as possible for utxo.ag. Decisions of 2026-11-26: bring back the old guides where they make sense (optimised), German search terms under the service names, Phil approves every article, Ahrefs API key provided by Phil (stored outside the repo in `~/.config/ahrefs/key`), no Google Business Profile (utxo AG works online only, no office for customer visits).

## Baseline (Google Search Console, 2026-09-22 to 2026-11-24, property `sc-domain:utxo.ag`)

- 48 clicks, 1,920 impressions, CTR 2.5 %, average position 32.9.
- 26 of 48 clicks come from the query "utxo ag". Non-brand traffic is practically zero.
- All non-brand impressions came from pages of the 2026-10 site that no longer exist:
  - "copilot vs coworker", "coworker vs copilot", "copilot coworker": position 9 to 18 (guide `/de/coworker-vs-copilot`, now 301 to `/de/agentic-coworker`)
  - "digital coworker", "ai coworker" and variants: position 60 to 75
  - "ai phone assistant", "ai telefonassistent": position 70 to 80
  - EU AI Act queries ("ki verordnung", "eu ai act pflichten unternehmen", "bußgeld risiko eu ai act"): position 54 to 95 (guide `/de/eu-ai-act`, now 301 to `/de/ai-adoption`)
- The redirect targets do not cover these topics, so these rankings will fade.
- Sitemap resubmitted on 2026-11-26 (30 URLs read). `/en` crawled on 2026-11-25, new version indexed.
- Brave Search still shows `utxoag.com` with a title from before 2026-10; Phil submitted the domain on 2026-11-26.

## Technical state (audit of the live pages)

Good: unique title and description per page, canonical, hreflang de/en/x-default, sitemap with alternates, robots allows all search crawlers, JSON-LD (Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage), one H1 per page, about 1,400 to 2,000 words per service page, six FAQ per service page, 301s for every old URL, old domain 301 to utxo.ag.

Gaps:
1. Service pages are named in English on the German site (H1 "Software Development", "Managed Agents", "Agent Factories", "AI Adoption und Consulting", "Penetration Testing"). German searches use "Softwareentwicklung", "Individualsoftware", "KI-Agenten entwickeln", "KI-Beratung", "Penetrationstest". These terms are missing in titles, H1 area and descriptions.
2. No content that answers questions (guides, explanations). Only service pages, which rank mainly for brand searches.
3. Organization schema has no `sameAs` (LinkedIn, NMKR, Sokosumi, Masumi), so Google links fewer signals to the company.
4. Performance (Lighthouse 12, local production build, 2026-11-26): service pages 99, articles 100, home page 98 without throttling but 40 with Lighthouse's simulated mid-range phone (4x CPU): almost all main-thread time is `scene/hero.js` (one 207 ms task unthrottled, about 12 s script time throttled), LCP 6.0 s simulated. Open: split the scene setup into smaller tasks or start it after the first interaction on phones; needs Phil's go because the scene was approved as is. Core Web Vitals in GSC: no field data yet (too little traffic). SEO score 69 locally only because local builds are `noindex`.
5. `www.utxoag.com` has no DNS record.

## Plan

### Phase 1: on-page (code, about one day; first part done 2026-11-26, not deployed)
- German search terms in title, description and a visible line under the H1 of each German service page, keeping the service name as H1 (decision of 2026-11-24). Same check for English pages (e.g. "custom software development", "AI agent development", "penetration testing services").
  Done: `tagline` per service page (inside the h1, under the name; also `serviceType` in the Service schema), new titles and descriptions for the service pages and the homes.
- Organization node: `brand` NMKR done; `sameAs` waits for the exact LinkedIn URL from Phil.
- Lighthouse run done (see gap 4); home page scene cost open.
- Request indexing in GSC for the main pages (max about 10 per day).

### Phase 2: content hub (biggest lever, ongoing; section and eight German drafts done 2026-11-26, not deployed)
- New section `/de/wissen` and `/en/insights` (names open) with its own page template, Article schema, listing page, sitemap entries.
- First articles, rebuilt from the old guides that already ranked: CoWorker vs. Copilot (was position 9), EU AI Act for companies, AI in the company. Then switch their 301s from the service pages to the articles.
- Then one cluster per service, two articles per month, each linking to its service page (topics to be validated with keyword data, ideally Ahrefs).
- Every claim follows the copy rules in `CLAUDE.md`; Phil approves each article before publishing.

### Phase 3: authority (mostly Phil)
- Links to utxo.ag from own and partner properties: nmkr.io, sokosumi.com, masumi.network, Serviceplan (credit "developed by utxo AG").
- Bing Webmaster Tools (also feeds DuckDuckGo, Ecosia), LinkedIn company page linking to utxo.ag.
- Ask press outlets that covered Masumi and Sokosumi for a link to utxo.ag where they name utxo AG.
- Listings in relevant directories (e.g. Swiss and DACH software agency directories).

### Phase 4: measurement
- Monthly GSC check: non-brand clicks, impressions per service page, position of target terms.

## Phase 2 detail (advisor review by Fable, 2026-11-26; volumes are estimates until keyword data is available)

Old guides:
- `coworker-vs-copilot`: revive and rewrite as "Microsoft Copilot oder individueller KI-CoWorker" (decision aid), links to Agentic CoWorker and AI Adoption. Check the live results page first (the query may also mean Microsoft "Copilot Cowork"). Remove outdated claims ("Pilot in rund 30 Tagen", "Festpreis", unsourced statements about Copilot). Move its 301 to the article in the same deploy.
- `ki-im-unternehmen`: drop (thin, belonged to the retired phone product); reuse the steps in article 3.
- `eu-ai-act`: do not revive the 4,400 word overview (results page owned by authorities and law firms, legal review burden); replace with the narrow article 7.

First articles (priority order, DE first, EN as translation of articles that work):
1. Microsoft Copilot oder individueller KI-CoWorker (Agentic CoWorker)
2. Was ist ein digitaler CoWorker? Abgrenzung zu Chatbot, Assistent und RPA (Agentic CoWorker)
3. KI-Agenten einführen: von der Prozessauswahl zum Betrieb (AI Adoption)
4. KI-Agenten in ERP, CRM und SSO integrieren (Software Development, Agentic CoWorker)
5. KI-Agenten betreiben: Monitoring, Freigaben, Verantwortung (Managed Agents)
6. Penetrationstest für KI-Anwendungen und Agenten (Penetration Testing)
7. KI-Agenten und die EU-KI-Verordnung: Betreiberpflichten in der Praxis (AI Adoption, Managed Agents; "ausgerichtet an", note "Keine Rechtsberatung")
8. KI-Automatisierung oder RPA (KI-Automationen)
9. Individualsoftware oder Standardsoftware im KI-Zeitalter (Software Development)
10. Agent Factory: KI-Agenten in Serie entwickeln (Agent Factories)

Section: `/de/wissen/<slug>`, `/en/insights/<slug>`, one listing page per language, no cluster pages until a service has three articles. Article template: Article schema (author, publisher `#org`, datePublished, dateModified), BreadcrumbList, FAQPage only for real questions, visible "Stand", short answer block at the top, sources, one table or checklist, 1,200 to 1,800 words, link to the service page in the first third and at the end; each service page gets a "Weiterführend" block. A named author (Person with LinkedIn) is the strongest missing trust signal.

Off-page priority: links "entwickelt von utxo AG" on nmkr.io, sokosumi.com, masumi.network; link requests and guest articles with the outlets that covered Masumi and Sokosumi; a Serviceplan partner or case page linking to utxo.ag.

### Release waves (updated 2026-11-26)

`published` in `web/src/content/articles.json` controls what is live.
- Wave 1 (first deploy): `copilot-oder-ki-coworker` (published 2026-07-31, the date of the comparison page it continues; updated 2026-11-26), `digitaler-coworker`, `ki-automatisierung-oder-rpa`, `ki-agenten-betreiben-lassen` and `ki-agenten-betreiben` (Managed Agents), `agent-factory` and `agent-registry` (Agent Factories). Seven at once because Phil wants Managed Agents and Agent Factories covered soon and the articles link to each other.
- December 2026: `ki-agenten-einfuehren` (shorten its repeated OWASP/BSI part, link to `ki-agenten-betreiben`).
- January 2027: `individualsoftware-oder-standardsoftware` (after a legal check of the Data Act statements).
- February 2027: `penetrationstest-ki-anwendungen`, only after Phil confirms the pentest process statements.
- Next topics: running costs of agents, hosting agents, EU AI Act duties for agents, MCP in the enterprise, integrating agents into ERP, CRM and SSO.
- Before each release Phil checks the article's open points and may add one first-hand detail; then set `published` (and `modified` only after real changes).

## Research of 2026-11-26 (second round)

Writing and publishing (sources: Google Search Central, Bing Webmaster blog, studies; details in the session report):
- Google's AI optimization guide (2026-05-15): no special markup or "chunking" for AI features; what counts is non-commodity content (first-hand experience, own data, precise distinctions). llms.txt has no effect (Google changelog 2026-06-15; Ahrefs: 97 % of llms.txt files get no requests). Skip llms.txt.
- FAQ rich results ended 2026-05-07; FAQPage markup only with a visible FAQ. Removed from the articles.
- Dates: true `datePublished`, `dateModified` only after real changes, visible on the page. Backdating new articles is not done.
- Cadence is no ranking signal; quality and topic focus are. Internal links between articles and service pages are recommended.
- Author: Person with a profile url and `sameAs`; Organization `sameAs` (LinkedIn company page, commercial register) still missing.
- LLM search: ChatGPT cites mostly through its search index (OAI-SearchBot); question-like titles and readable slugs are cited more often (Ahrefs study 2026-04).

Topics Managed Agents and Agent Factories: German results are weak (vendor pages, machine translations, news). "Managed Agents" is also an Anthropic product name since 2026-04. First articles: `ki-agenten-betreiben-lassen` (who runs agents: own operation, hosted runtime, operated service) and `agent-registry` (inventory and identity of agents). Further ideas: running costs of agents, hosting agents (DE, EU, on-premise), EU AI Act duties for agents, MCP in the enterprise, platform comparison (Copilot Studio, Agentforce, Gemini Enterprise, Bedrock AgentCore), testing agents with evals.

Crawlers and tools (checked 2026-11-26):
- Cloudflare "Block AI bots" answers PerplexityBot with 403, so Perplexity cannot index utxo.ag. OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, Bingbot, Googlebot are allowed. The blocked GPTBot, ClaudeBot, Google-Extended, Applebot-Extended only affect training. To do (Phil, Cloudflare dashboard): allow PerplexityBot.
- Bing Webmaster Tools (import from GSC, submit sitemap; AI Performance report) and Cloudflare Crawler Hints (IndexNow).
- Search Console: keep "Search generative AI" on; watch the generative AI performance report.
- Free profiles with identical name, address, URL: LinkedIn, Crunchbase, Clutch; Wikidata only with independent sources.
- Claude Code tools worth considering: `mcp-gsc` (Search Console, read-only, pinned version), `chrome-devtools-mcp` (official, performance), `claude-seo` plugin (review the code first). The Ahrefs MCP needs a paid plan.

## Expectations

B2B service keywords with enterprise intent have low volume and strong competitors. Phase 1 alone makes the pages findable for the right terms but brings little traffic. Noticeable growth needs phase 2 and 3; first effects usually after three to six months.

## Open questions for Phil

1. Exact URL of the LinkedIn company page (and any other official profile) for `sameAs`.
2. Re-check the Claude/EU Data Boundary section of `copilot-oder-ki-coworker` after 2026-12-09 (Microsoft changes the EU default that day).
3. Replace artificialintelligenceact.eu and gdpr-info.eu sources with EUR-Lex; update redirected source URLs (claude.com, anthropic.com/research, Microsoft Learn Copilot paths).
