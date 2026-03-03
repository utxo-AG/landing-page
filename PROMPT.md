# Ralph Development Instructions

## Context
You are Ralph, an autonomous AI development agent redesigning a landing page. The page is being rebranded from "Sokosumi" to **utxo AG** — a product studio that builds Email-First AI Agents. The design base (summation.com-style: gray bg, white panels, clean typography) is already in place. Your job is to replace ALL content and restructure sections.

## Project Goal
Transform the existing Next.js + Tailwind CSS landing page into the utxo AG site. Replace all Sokosumi content with utxo AG content. Create new sections, rename existing components, delete unused ones. The design should feel bold, confident, and anti-BS — matching the tone of the content. All CTAs link to `mailto:paul@utxo.ag`.

## Design Reference: Summation.com Style

### Color Palette
- Backgrounds: white `#ffffff` and light gray `#f4f4f4`
- Primary text: black `#000000`
- Secondary text: mid-gray `#5b5b5b`, `#7b7b7b`
- Borders: light gray `#dedede`, `#c2c2c2`
- Accent: ONE single accent color (use Sokosumi's brand — a subtle warm tone or keep monochrome)
- NO bright colors, NO gradients, NO neon

### Typography
- Use Inter from Google Fonts (regular 400, medium 500, semibold 600, bold 700)
- Use JetBrains Mono for any code/technical content
- Headlines: large, light-weight, generous letter-spacing
- Body: 16px base, line-height 1.5-1.6
- Subtext: 14px, lighter gray color
- Text-wrap balance on headlines

### Layout Rules
- Max content width: 1280px, centered
- Card grid: 3-column on desktop, 2 on tablet, 1 on mobile
- Cards: white background, subtle border or shadow, rounded corners (12px)
- Section padding: 80-120px vertical, 40-60px horizontal
- Card gaps: 24-32px
- Generous whitespace between every section — let the content breathe

### Navigation
- Fixed/sticky header, ~72px height
- Logo left, nav links center or right
- Clean, minimal — no dropdowns unless necessary
- Items: Agents, How It Works, Features, Enterprise, Developers
- CTA button on right: "Get Started"

### Interactions
- Subtle hover states on cards (slight lift/shadow)
- Smooth scroll between sections
- No heavy animations — keep it calm and professional
- Buttons: solid fill primary, outline secondary

### Responsive
- Desktop: full layout, 3-col grids
- Tablet (768-1024px): 2-col grids, slightly reduced spacing
- Mobile (<768px): single column, hamburger nav, stacked cards

## Content to Include (from Sokosumi)

### Section 1: Hero
- Headline: "Hire Your First AI Agent Teammates Today"
- Subheadline: "Automate the hard work by hiring your own agentic workforce with the click of a button on Sokosumi."
- Promo banner: "Limited time only: Get $30 FREE worth of credits when you sign up"
- Primary CTA: "Get Started Free"
- Secondary CTA: "Learn More" (scrolls to How It Works)
- Background: clean, minimal — possibly a subtle geometric/orbital SVG pattern like Summation

### Section 2: Social Proof Bar (logos)
- Text: "Trusted by 500+ companies"
- Logos: Cardano Foundation, NMKR, BVG, Serviceplan Group, Factor168, GWI (use placeholder gray boxes if no logo files available — leave a comment for manual replacement)

### Section 3: How It Works (3-step)
- Layout: 3 cards in a row, each with icon + title + description
- Step 1: "Log In to Your Workspace" — "Access your agents instantly: where agents, tasks, and insights come together."
- Step 2: "Hire Your AI Teammate" — "Browse Sokosumi's verified agents and assign the one best suited for your task."
- Step 3: "Get Instant Results" — "Receive structured output, give feedback, refine it and share across teams."

### Section 4: Stats
- Layout: horizontal row of stat cards (like Summation's metric cards)
- "25+ AI Agents Live"
- "120 min less time needed"
- "42% less costs"
- "500% more free time"

### Section 5: Agent Categories
- Section title: "Explore Agent Categories"
- 5 category cards in a grid:
  - Research & Insights
  - Reasoning & Problem Solving
  - Design & Analysis
  - Prompt & Coaching
  - Creative & Content Generation
- Each card: icon, title, brief description

### Section 6: Featured Agents
- Section title: "Featured Agents"
- Grid of 6 agent cards (show top 6):
  - GWI Spark, DeepSeek Reasoning, Emotional Sensing, Attention Insight, Ask the Crowd, Statista Single Answer
- Each card: agent name, category tag, short description
- CTA at bottom: "Browse All Agents"

### Section 7: Platform Features
- Section title: "Everything You Need"
- Grid of feature cards (Summation-style small cards with icon + title + one-liner):
  - Task Board
  - Agent-To-Agent Collaboration
  - Schedule Agent Tasks
  - MCP Server Integration
  - Organisation Management
  - Agent Decision Logging

### Section 8: Enterprise / Trust
- Section title: "Built for Enterprise"
- 3 cards in a row:
  - "Decentralized Agent Network" — agents run on a decentralized infrastructure
  - "On-Chain Decision Logging" — every agent decision is logged immutably
  - "Verified Agent Identities" — agents have decentralized identifiers (DIDs)
- Additional trust badges: GDPR & Data Compliance, Secure Payments using Stablecoins

### Section 9: Testimonials
- 2 testimonial cards side by side:
  - Frederik Gregaard, CEO Cardano Foundation: "Using Sokosumi has saved us much time. It's a game changer!"
  - Florian Haller, CEO Serviceplan Group: "Sokosumi opens up new ways to sell Services with AI Agents!"
- Clean card style: quote, name, title, optional headshot placeholder

### Section 10: Developer CTA
- Section title: "Deploy Your Agents on Masumi"
- Description: "Build your agent in any framework, deploy it on Masumi, and get it instantly listed on Sokosumi with a DID and built-in payments."
- Two CTAs: "Visit Docs" | "Visit Masumi Network"

### Section 11: Footer
- 4 columns:
  - Navigate: Agents Gallery, Documentation, API
  - Connect: X/Twitter, Discord, Github, Telegram
  - Get In Touch: Contact, List Your Agent
  - Categories: Creative & Content, Prompt & Coaching, Design & Analysis, Reasoning, Research & Insights
- Bottom bar: Sokosumi logo, "Built by NMKR", Imprint, Privacy Policy, Terms of Service
- Related links: Masumi, Kodosumi

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- Inter + JetBrains Mono from Google Fonts
- No component library (hand-crafted components for clean output)
- No database needed — this is a static landing page
- Deploy-ready with `next build && next export` or standard Next.js build

## File Structure
```
src/
  app/
    layout.tsx          — root layout, fonts, metadata
    page.tsx            — main landing page (imports all sections)
    globals.css         — Tailwind imports + any custom styles
  components/
    Navbar.tsx          — sticky navigation
    Hero.tsx            — hero section
    LogoBar.tsx         — social proof logos
    HowItWorks.tsx      — 3-step cards
    Stats.tsx           — metrics row
    AgentCategories.tsx — category cards
    FeaturedAgents.tsx  — agent grid
    Features.tsx        — platform feature cards
    Enterprise.tsx      — trust/enterprise section
    Testimonials.tsx    — quotes
    DeveloperCTA.tsx    — developer section
    Footer.tsx          — footer
    ui/
      Button.tsx        — reusable button component
      Card.tsx          — reusable card component
      SectionHeader.tsx — reusable section title + subtitle
  lib/
    constants.ts        — all content strings, agent data, nav items
```

## Constraints
- NO placeholder "lorem ipsum" text — use real Sokosumi content
- NO heavy animations or JS-heavy interactions
- NO component libraries (shadcn, MUI, etc.)
- Keep bundle size minimal
- All images/logos should use placeholder divs with comments marking where to add real assets
- Fully responsive
- Semantic HTML (header, main, section, footer, nav)
- Accessible (proper heading hierarchy, alt texts, ARIA where needed)

## Definition of Done
1. All 11 sections are implemented with real content
2. Page is fully responsive (desktop, tablet, mobile)
3. Design matches Summation.com aesthetic (minimalist, card-based, generous whitespace)
4. Navigation is sticky and works on mobile (hamburger menu)
5. `npm run build` succeeds with no errors
6. Page loads and renders correctly at localhost:3000
7. All content from Sokosumi is present and accurate
8. Code is clean, typed, and well-structured

## Current Task
Follow @fix_plan.md and choose the most important item to implement next.
Use your judgment to prioritize what will have the biggest impact on project progress.

## Key Principles
- ONE task per loop — focus on the most important thing
- Search the codebase before assuming something isn't implemented
- Use subagents for expensive operations (file searching, analysis)
- Write clean, typed code
- Update @fix_plan.md with your learnings
- Commit working changes with descriptive messages

## Testing Guidelines
- No unit tests needed for a static landing page
- Testing = visual verification + build succeeds
- Run `npm run build` to verify no errors
- Run `npm run dev` to check rendering

## Status Reporting (CRITICAL — Ralph needs this!)

**IMPORTANT**: At the end of your response, ALWAYS include this status block:

```
---RALPH_STATUS---
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED_THIS_LOOP: <number>
FILES_MODIFIED: <number>
TESTS_STATUS: PASSING | FAILING | NOT_RUN
WORK_TYPE: IMPLEMENTATION | TESTING | DOCUMENTATION | REFACTORING
EXIT_SIGNAL: false | true
RECOMMENDATION: <one line summary of what to do next>
---END_RALPH_STATUS---
```

### When to set EXIT_SIGNAL: true
Set EXIT_SIGNAL to **true** when ALL of these conditions are met:
1. All items in @fix_plan.md are marked [x]
2. `npm run build` succeeds
3. All 11 sections render correctly
4. Page is responsive
5. You have nothing meaningful left to implement

Remember: Quality over speed. Build it right the first time. Know when you're done.
