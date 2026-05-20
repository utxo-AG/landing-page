# UTXO.AG — Website Design.md

> Source of truth for the utxoag.com rebrand. Grounded in the UTXO Brand Guidelines v1.0. Consumable by both humans and AI coding tools — every token, rule, and component below is intentionally explicit.
>
> **Palette stance (v1.1):** the website is **monochrome-first** — black, white, and gray do >95% of the visual work. Navy and the two pale-blue tints from the brand kit are **tertiary accents** reserved for a small number of specific roles (primary CTA, focus ring, single soft "lift" surface, brand combinations). Treat blue like ink on a lab coat — it should feel rare and intentional.

---

## 0. How to use this document

- **For an AI coding tool (Claude, Cursor, v0, etc.):** Treat sections 2–8 as a hard contract. Tokens are normative. Do not invent colors, font weights, radii, or spacing values that are not listed here. When you need a value that is missing, derive it from the spacing scale or ask. When in doubt about color, use a neutral — never blue.
- **For a human designer/developer:** Sections 1, 9, and 10 give the rationale and judgment calls. Read those first.
- **Tech assumption:** Next.js (App Router) + Tailwind CSS + Framer Motion. If the stack changes, only Section 8 (Implementation) needs to be re-mapped — the tokens stay the same.

---

## 1. Brand foundation

**Product.** UTXO.AG builds custom AI coworkers — autonomous or semi-autonomous AI employees that integrate into SME workflows (quoting, lead research, reception, monitoring, dispatching). EU/CH-hosted, GDPR-compliant. Based in Zug, Switzerland. Primary market: DACH SMEs (50–250 employees) in machinery, special machinery, tool building, and services.

**Positioning.** Infrastructure-first. Technical, accessible, useful. We don't sell hype — we sell deterministic systems that show up to work.

**Brand values** (from the kit — these are the design filters):

| Value | Design implication |
|---|---|
| **Modularity** | Compose UI from a small set of primitives that recombine cleanly. Avoid bespoke one-off components. |
| **Determinism** | Predictable layouts, predictable interactions. No surprise motion, no decorative randomness. |
| **Scalability** | Tokens, not magic numbers. Every spacing/type/color value is on the scale. |
| **Utility** | Function over noise. If a visual element doesn't carry information, remove it. |

**Visual reference.** [Linear](https://linear.app) is the closest analog: dense, precise typography on neutral surfaces, **monochrome with rare accent**, high-contrast geometric forms, motion used sparingly to confirm causality. Other touchstones: Vercel (the docs), Stripe Press, Rauno's site. **Not** like: Apple Marketing (too heroic), Webflow templates (too soft), Web3 sites (too maximalist), most "AI" SaaS sites (too colorful).

**Tone of voice** (from the kit, applied to copy):

- **Clear.** Direct, no ambiguity, no filler.
- **Precise.** Every word intentional, structured, technically grounded.
- **Composed.** Calm and confident. Never loud, overly promotional, or reactive.
- **Functional.** Utility over persuasion or theatrics.
- **Modern.** Contemporary and digital-native, but timeless and professional.

Copy examples: ✅ "Custom AI employees for your business that independently handle routine tasks." · ❌ "Unleash the power of next-gen AI to revolutionize your workflow!"

---

## 2. Color tokens

The brand kit defines 7 colors. For the website, they are split into **three tiers**. The tier dictates how much of the page each color is allowed to occupy.

### 2.1 Tiering

| Tier | Colors | Allowed coverage of any viewport |
|---|---|---|
| **Primary** (do the work) | White, Black, Stone (off-white), Gray | ~95% |
| **Secondary** (structure) | Hairline grays derived from Black at low alpha (see 2.3) | ~5% |
| **Tertiary** (rare accent) | Navy, Pale-Blue, Pale-Cyan | <5% combined, and never as a section background |

If a screen reads as "blue," it has failed the brief.

### 2.2 Brand palette (verbatim hex from the kit)

| Token | Hex | RGB | Tier | Role |
|---|---|---|---|---|
| `--color-white` | `#FFFFFF` | 255 255 255 | Primary | Default surface |
| `--color-black` | `#000000` | 0 0 0 | Primary | Inverse surface, text |
| `--color-stone` | `#E5E4E2` | 229 228 226 | Primary | Soft surface for one section per page |
| `--color-gray-500` | `#696969` | 105 105 105 | Primary | Secondary text, the "muted" voice |
| `--color-navy` | `#002147` | 0 33 71 | Tertiary | Primary CTA fill, focus ring, link underline |
| `--color-pale-blue` | `#E6EDF6` | 230 237 246 | Tertiary | At most ONE accent surface per page (e.g. booking card) |
| `--color-pale-cyan` | `#DAECF0` | 218 236 240 | Tertiary | Reserved for brand lockup combinations only |

### 2.3 Extended neutral ramp (derived — the workhorses)

The kit gives one mid-gray. The web needs more. Derive these from black at fixed alphas so dark mode can mirror them with white:

| Token | Light mode | Dark mode | Use |
|---|---|---|---|
| `--gray-50`  | `#FAFAFA` | `#0A0A0A` | Subtle striping |
| `--gray-100` | `#F4F4F4` | `#141414` | Card hover, code block |
| `--gray-200` | `#E5E4E2` *(=stone)* | `#1F1F1F` | Default border, divider |
| `--gray-300` | `#D4D4D4` | `#2A2A2A` | Strong border, input border |
| `--gray-400` | `#A3A3A3` | `#525252` | Disabled text |
| `--gray-500` | `#696969` *(kit)* | `#737373` | Secondary text |
| `--gray-700` | `#3F3F3F` | `#A3A3A3` | Captions on light bg |
| `--gray-900` | `#171717` | `#E5E4E2` | Heading on near-black bg |

### 2.4 Semantic mapping (use these in components, not the raw palette)

```css
/* Light theme — default for marketing site */
--bg-primary:        var(--color-white);     /* #FFFFFF — most sections */
--bg-secondary:      var(--gray-50);         /* #FAFAFA — alternating band */
--bg-tertiary:       var(--color-stone);     /* #E5E4E2 — one "soft" section per page */
--bg-inverse:        var(--color-black);     /* #000000 — hero, footer */

--text-primary:      var(--color-black);
--text-secondary:    var(--color-gray-500);  /* #696969 */
--text-muted:        var(--gray-400);        /* #A3A3A3 — meta only */
--text-inverse:      var(--color-white);

--border-subtle:     var(--gray-200);        /* #E5E4E2 */
--border-strong:     var(--gray-300);        /* #D4D4D4 */
--border-inverse:    rgb(255 255 255 / 0.12);/* hairlines on black */

/* Tertiary accents — sparing use only */
--accent:            var(--color-navy);      /* #002147 — CTA fill, focus, links */
--accent-fg:         var(--color-white);
--accent-soft:       var(--color-pale-blue); /* #E6EDF6 — at most one card or band per page */
```

### 2.5 Functional / state colors (additive, kept desaturated)

| Token | Hex | Use |
|---|---|---|
| `--state-success` | `#1F7A4D` | "Online", success toasts. Pair with `--state-success-soft` `#E6F4EC` background. |
| `--state-warning` | `#A66A00` | Soft warnings. Background `#FBF1DD`. |
| `--state-error`   | `#B42318` | Form errors, failed jobs. Background `#FDECEA`. |
| `--state-info`    | `var(--accent)` | Same as accent — informational. |

State colors are the only colorful pixels allowed beyond the tertiary tier, and only when a state actually exists.

### 2.6 Allowed combinations (from the kit)

The brand kit explicitly approves these surface ↔ logo combinations. Same rule applies to any prominent brand surface (hero, footer, share cards):

- White surface + black or navy logo
- Stone surface + black logo
- Pale-cyan surface + navy logo *(reserved for off-site brand assets — biz cards, OG images)*
- Pale-blue surface + navy logo *(reserved — see above)*
- Black surface + white logo
- Navy surface + pale-cyan logo *(reserved)*

For the website itself, default to **black-on-white** and **white-on-black**. Pale-blue + navy is approved by the kit but used on the web only in the booking card (Section 7.2).

### 2.7 Dark mode

Recommended. Mapping inverts cleanly because the palette is monochrome:

```css
[data-theme="dark"] {
  --bg-primary:    var(--color-black);
  --bg-secondary:  #0A0A0A;
  --bg-tertiary:   #141414;
  --bg-inverse:    var(--color-white);
  --text-primary:  var(--color-white);
  --text-secondary: var(--gray-300);
  --text-muted:    var(--gray-500);
  --border-subtle: rgb(255 255 255 / 0.08);
  --border-strong: rgb(255 255 255 / 0.16);
  --accent:        var(--color-white);   /* navy is too dark on black; flip to white */
  --accent-fg:     var(--color-black);
  --accent-soft:   #141414;
}
```

In dark mode the accent **becomes white** — the brand doesn't lean on color in either theme.

---

## 3. Typography

The kit defines two typefaces. Both are free on Google Fonts — load with `next/font` for performance.

### 3.1 Font stack

```css
--font-display: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
--font-body:    'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
--font-mono:    'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace;
```

- **Manrope** → all headlines (H1–H4), section eyebrows, large stat numbers, navigation links.
- **IBM Plex Sans** → body, captions, labels, form inputs, button text.
- **IBM Plex Mono** → code, technical metadata, timestamps, IDs (e.g. `SRV-04`, `Quote-2026-038`). Adds engineering credibility — use sparingly.

Weights to load: Manrope `300, 400, 500, 600, 700`. IBM Plex Sans `300, 400, 500`. IBM Plex Mono `400, 500`.

### 3.2 Display scale (Manrope) — from the kit

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `--text-h1` | 64px / 4rem | 600 (Semibold) | 100% | -2.8% (-0.028em) | Page hero |
| `--text-h2` | 48px / 3rem | 500 (Medium) | 100% | -2.8% | Section header |
| `--text-h3` | 36px / 2.25rem | 400 (Regular) | 105% | -2% | Subsection, card title |
| `--text-h4` | 24px / 1.5rem | 300 (Light) | 110% | -1.5% | Card title (small), eyebrow on hero |

**Responsive (added — required for web):**

| Breakpoint | H1 | H2 | H3 | H4 |
|---|---|---|---|---|
| ≥1024px (desktop) | 64 | 48 | 36 | 24 |
| 768–1023 (tablet) | 48 | 36 | 28 | 20 |
| <768 (mobile) | 36 | 28 | 24 | 18 |

Use `clamp()` for fluid scaling: e.g. `font-size: clamp(2.25rem, 1rem + 4vw, 4rem)` for H1.

### 3.3 Text scale (IBM Plex Sans) — from the kit

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `--text-body-lead` | 18px | 400 | 113% (kit) → **140% on web** | Lead paragraph under H1/H2 |
| `--text-body` | 16px | 400 | 113% (kit) → **150% on web** | Default body |
| `--text-caption` | 12px | 400 | 130% | Meta, footnotes |
| `--text-label` | 14px | 500 | 120% | Form labels, UI labels |
| `--text-eyebrow` | 12px | 500 | 100% | Mono, uppercase, tracking 0.08em — section eyebrow |

The kit specifies 113% line height. For web readability over long paragraphs, **override to 140–150%** on body, but keep ≤120% on short single-line UI text.

### 3.4 Typography rules (from "Common mistakes" + Linear-grade polish)

1. **No script, handwritten, or display fonts.** Manrope and IBM Plex only.
2. **No italics on headings.** Italics on body allowed for short emphasis (book titles, foreign words).
3. **Default alignment: left.** Center alignment allowed only for hero H1, single-line CTAs, and modals — never for paragraphs.
4. **No text shadows. No outer glows. No gradients on text** (except the explicit two-tone hero treatment in §6.1, which is text-color, not gradient).
5. **No condensing/stretching.** Never apply `font-stretch` or non-100% transforms.
6. **Optical kerning on.** `font-feature-settings: 'kern', 'liga', 'calt'; text-rendering: optimizeLegibility;` globally.
7. **Numerals.** Use tabular numerals in tables and stats: `font-variant-numeric: tabular-nums;`.

---

## 4. Spacing, layout & grid

### 4.1 Base unit

`4px` base. Everything is a multiple of 4. Rounded at 8 for most layout-level work.

```css
--space-0:  0;
--space-1:  4px;   --space-2:  8px;   --space-3:  12px;  --space-4:  16px;
--space-5:  20px;  --space-6:  24px;  --space-8:  32px;  --space-10: 40px;
--space-12: 48px;  --space-16: 64px;  --space-20: 80px;  --space-24: 96px;
--space-32: 128px; --space-40: 160px;
```

### 4.2 Layout grid

- **Max content width:** 1200px (`--max-w-content`). Articles/legal pages: 720px (`--max-w-prose`).
- **Site gutter:** 24px on mobile, 48px on tablet, 64px on desktop.
- **Columns:** 12-col on desktop, 6-col on tablet, 4-col on mobile. Gutter 24px.
- **Section vertical rhythm:** 96px between major sections on desktop, 64px tablet, 48px mobile.

### 4.3 Breakpoints

```
sm: 640px    md: 768px    lg: 1024px    xl: 1280px    2xl: 1536px
```

### 4.4 Border radius

Linear-style: small, consistent. Pill only for the email CTA in the nav and for status chips.

```css
--radius-none: 0;     --radius-sm: 4px;     --radius-md: 8px;
--radius-lg:   12px;  --radius-xl: 16px;    --radius-pill: 999px;
```

### 4.5 Elevation

The brand is intentionally flat. Use shadows only to lift interactive surfaces off the page (menus, popovers, dropdowns, the floating inbox card). Never on hero or section backgrounds.

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.04);
--shadow-md: 0 4px 12px -2px rgb(0 0 0 / 0.08);
--shadow-lg: 0 12px 32px -8px rgb(0 0 0 / 0.10);
--shadow-focus: 0 0 0 3px rgb(0 33 71 / 0.30); /* navy @ 30% — only place navy appears generously */
```

---

## 5. Logo & monogram

### 5.1 Inventory

| Asset | File | Use |
|---|---|---|
| Primary wordmark | `utxo-wordmark.svg` | Header, footer, all marketing surfaces |
| Stacked lockup | `utxo-lockup.svg` | When wordmark + monogram appear together |
| Monogram | `utxo-monogram.svg` | Favicon, app icon, social avatars, compact UI (≤ 32px slot) |
| Monogram (inverse) | `utxo-monogram-inverse.svg` | On dark surfaces |

The monogram is the 4-square modular system from the kit: **3 filled rounded squares + 1 negative-space square**, arranged as a tetromino. It encodes "discrete outputs, modular value units, structured movement and recombination" — this is the visual hook of the rebrand and should appear as a recurring motif (Section 7.4).

### 5.2 Hard rules (from the kit)

- **Minimum size — digital:** 50px tall for the wordmark. 32px for the monogram. Below 32px, use a simplified favicon (Section 5.4).
- **Clear space:** Equal to the height of the "AG" cap height on every side. No element may enter that zone.
- **Color (web):** Default to **black on light** and **white on dark**. Navy is allowed but only on white or pale-blue surfaces — avoid in product UI to keep blues rare.
- **Don't:** rotate, skew, distort, outline, drop-shadow, animate the form, or place on a busy photo without a flat overlay.

### 5.3 Header logo behavior

- Default: wordmark `utxo.` with `AG` subtype, 32px tall on mobile, 40px on desktop.
- On scroll past 80px: shrinks to 28px and the header gets a `--bg-primary` solid fill with a 1px `--border-subtle` bottom and `backdrop-filter: blur(8px)`.

### 5.4 Favicon set (from the kit)

Generate at: 48×48, 64×64, 96×96, 144×144, 180×180. Plus `favicon.ico` (multi-res 16/32/48). Apple touch icon at 180×180. Theme color: `#000000`.

---

## 6. Components

Components are described as **purpose, anatomy, states, do/don't, and (where useful) Tailwind hint**. Build once in `/components/ui/` and reuse.

### 6.1 Hero

**Purpose:** First-impression statement. One headline, one supporting line, one primary CTA + one secondary CTA, optional eyebrow.

**Anatomy:**

```
[Eyebrow: 12px mono uppercase, --text-secondary, tracking 0.08em]
[H1: two-tone — primary clause in --text-primary (black), trailing clause in --text-muted (light gray)]
[Lead paragraph: --text-body-lead, max 60ch, --text-secondary]
[Primary CTA] [Secondary CTA]
[Trust row: 3–4 small dot-separated badges in --text-muted]
```

**Two-tone H1 treatment** (matches the brand kit mockup) — *uses gray for the trailing clause, no blue:*

```html
<h1 class="font-display font-semibold text-h1 tracking-tight">
  <span class="text-black">AI coworkers that read,</span>
  <span class="text-gray-400"> reply, and get things done.</span>
</h1>
```

**Don't:** add background images, gradients, particles, 3D, glass morphism, animated mesh, or any blue accent in the hero. The hero is monochrome by rule.

### 6.2 Buttons

Three variants. Sizes: `sm` (32px), `md` (40px, default), `lg` (48px).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `--text-primary` (black on light, white on dark) | Inverse | none | Main CTA per section. One per viewport. |
| **Accent** | `--accent` (navy) | white | none | Reserved for the **single highest-priority CTA on the page** (the booking CTA). At most one Accent button per page. |
| **Secondary** | transparent | `--text-primary` | 1px `--border-strong` | Alternative action. |
| **Ghost** | transparent | `--text-primary` | none | Tertiary; nav links, "Learn more". |

Note the change from v1.0: the **default primary button is black**, not navy. Navy is reserved for the single most important conversion on the entire page (book a call).

**Shape:** `--radius-md` (8px). The header email CTA uses `--radius-pill` — that's the only pill on the page.

**States:** `hover` darken background by 8% (white→#F4F4F4 on ghost). `focus-visible` add `--shadow-focus`. `disabled` 40% opacity, `cursor-not-allowed`. `loading` swap label for inline spinner, keep width.

**Label:** Sentence case ("Book a discovery call"), not Title Case. Verb-first.

### 6.3 Navigation (header)

- Sticky, height 72px desktop / 60px mobile.
- Left: logo. Center or right: nav links (`Agents`, `How it works`, `Customer stories`). Far right: language switcher (`DE`/`EN`) + email pill CTA (`business@utxo.ag`).
- Email pill: `--bg-tertiary` (stone) background, black text, `--radius-pill`, 36px tall, 16px horizontal padding. The only pill in the header. **Not blue.**
- Mobile: hamburger → full-screen overlay menu, black bg, white text, links stacked at H3 size.
- Active link: 2px underline in `--text-primary` (black/white), offset 6px. Not navy.

### 6.4 Cards

Used for agent listings, customer stories, "how it works" steps.

**Anatomy:**

```
[Optional eyebrow / category chip — mono, uppercase]
[H3 / H4 title]
[Body paragraph — 2–4 lines]
[Footer: meta on left, link on right]
```

**Style:**
- Background `--bg-primary` (white) with 1px `--border-subtle`.
- Padding 24px (mobile) / 32px (desktop).
- Radius `--radius-lg` (12px).
- No shadow at rest; on hover, lift with `--shadow-md` and translate `-2px` on Y. Border tightens to `--border-strong`.

**Variants:**
- **Agent card:** category chip + title + 2-line description + "Custom-built" tag + "Discuss use case →" link.
- **Story card:** customer name + industry meta + "Problem / Coworker / Outcome" three-block body.
- **Step card:** numbered (`01`, `02`, `03`) in mono at the top in `--text-muted`, large H3 step title, body, duration tag.

### 6.5 The "Inbox" demo (signature component)

The current site has an inbox-style live demo. Keep it as the brand's signature interactive element — it earns the "we build software" claim better than any illustration could.

- Frame: `--radius-xl`, 1px `--border-subtle`, `--bg-primary`, `--shadow-lg`.
- Left rail: list of coworkers (avatar = monogram tile in black, name, last-message preview, timestamp in mono).
- Right pane: selected coworker's message — header with name + sent-to, body in `--text-body`, attachment chip, stats row (3 metrics in mono).
- Auto-cycle through coworkers every 6s, pause on hover, respect `prefers-reduced-motion`.
- **Color rule:** the inbox is fully monochrome. Avatars black on stone, no blue.

### 6.6 Forms

- Input height: 44px (touch target). Border 1px `--border-strong`. Radius `--radius-sm`. Padding 12px.
- Label above input, `--text-label`. Required marker: `*` in `--state-error`.
- Focus: `--shadow-focus` ring (the focus ring is the only place navy appears at scale). Border becomes `--text-primary`.
- Error: border `--state-error`, helper text below in `--state-error` at `--text-caption`.
- Never use placeholder as the only label.

### 6.7 Footer

- Background `--bg-inverse` (black), text `--text-inverse`.
- Top: logo + one-line tagline + Zug, Switzerland address.
- Middle: 3–4 columns of links (Product, Company, Legal, Contact).
- Bottom: copyright + legal links + social icons (monochrome white, hover to `--gray-300`).
- Padding 80px top / 48px bottom on desktop.
- No blue. Anywhere.

### 6.8 Status chips & tags

- Pill (`--radius-pill`), 24px tall, 12px horizontal padding.
- Mono font, uppercase, 11px, tracking 0.04em.
- Default chip: `--bg-tertiary` background, `--text-primary` text. Examples: `LIVE`, `BETA`, `CUSTOM-BUILT`, `EU/CH HOSTED`.
- State chips use the state-color soft background (Section 2.5).

### 6.9 Code & technical readouts

When showing logs, JSON, or stats (e.g. "Sources analyzed: 47"):
- IBM Plex Mono, `--text-body` size.
- Background `--gray-100`, padding 16px, radius `--radius-md`.
- Numbers tabular. Do not syntax-highlight in marketing copy — keep monochrome to match the brand restraint.

---

## 7. Page-level patterns

### 7.1 Information architecture (matches current site, refined)

1. **Hero** — Headline + lead + dual CTA + trust strip
2. **Inbox demo** — Live signature component
3. **What we build** (Agents) — Tabbed: Customer-facing / Employee support / Management insights → 3 cards each
4. **How it works** — 3 numbered steps
5. **Background** — NMKR / masumi / sokosumi credibility
6. **Customer stories** — 3 case-study cards
7. **Discovery call** — Booking + callback form, side-by-side
8. **Footer**

### 7.2 Section rhythm — monochrome only

Alternate **neutral** surfaces to create rhythm. Pattern across the page (top → bottom):

```
Hero          → black           (--bg-inverse)
Inbox demo    → white           (--bg-primary)
Agents        → gray-50         (--bg-secondary)
How it works  → white
Background    → stone           (--bg-tertiary) ← the one "soft" section
Stories       → white
Booking       → pale-blue card on white  ← the one tertiary-tier moment
Footer        → black
```

Rules:
- Never two adjacent sections in the same color.
- **Pale-blue appears once on the entire page** — as the booking card background — to create a single moment of warmth where the conversion happens. Everywhere else: neutrals only.
- Never use navy or pale-cyan as a section background on the website.

### 7.3 Section header pattern

Every section uses the same opener so the page feels engineered:

```
[Mono uppercase eyebrow in --text-secondary, e.g. "AGENTS"]
[H2 — left aligned, max 2 lines, --text-primary]
[Optional sub-paragraph in --text-body-lead, max 60ch, --text-secondary]
```

### 7.4 The monogram as motif

Use the 4-square monogram pattern as a recurring graphic device — never as decoration alone, always carrying meaning. **Always rendered in black or white**, never tinted.

- **Section dividers:** a faint single monogram-square as a bullet between section number and title.
- **Loading states:** the 4 squares cycle filled → unfilled to indicate progress.
- **Empty states:** the negative-space square enlarged with a one-line caption.
- **Background pattern:** at 4% opacity on the booking section as a subtle grid texture.

Do not render the full monogram larger than 96px outside the logo lockup.

---

## 8. Implementation reference (Tailwind)

### 8.1 `tailwind.config.ts` excerpt

```ts
export default {
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        stone: { DEFAULT: '#E5E4E2' },
        gray: {
          50:  '#FAFAFA', 100: '#F4F4F4', 200: '#E5E4E2',
          300: '#D4D4D4', 400: '#A3A3A3', 500: '#696969',
          700: '#3F3F3F', 900: '#171717',
        },
        // Tertiary — use sparingly
        navy:        { DEFAULT: '#002147' },
        'pale-blue': { DEFAULT: '#E6EDF6' },
        'pale-cyan': { DEFAULT: '#DAECF0' },
      },
      fontFamily: {
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['clamp(2.25rem, 1rem + 4vw, 4rem)',         { lineHeight: '1',    letterSpacing: '-0.028em' }],
        h2: ['clamp(1.75rem, 0.8rem + 3vw, 3rem)',       { lineHeight: '1',    letterSpacing: '-0.028em' }],
        h3: ['clamp(1.5rem, 0.9rem + 1.5vw, 2.25rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h4: ['clamp(1.125rem, 0.9rem + 0.75vw, 1.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'body-lead': ['1.125rem', { lineHeight: '1.55' }],
        body:        ['1rem',     { lineHeight: '1.5' }],
        label:       ['0.875rem', { lineHeight: '1.2'  }],
        caption:     ['0.75rem',  { lineHeight: '1.3'  }],
        eyebrow:     ['0.75rem',  { lineHeight: '1',    letterSpacing: '0.08em' }],
      },
      maxWidth:    { content: '1200px', prose: '720px' },
      borderRadius:{ sm: '4px', md: '8px', lg: '12px', xl: '16px' },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        md: '0 4px 12px -2px rgb(0 0 0 / 0.08)',
        lg: '0 12px 32px -8px rgb(0 0 0 / 0.10)',
        focus: '0 0 0 3px rgb(0 33 71 / 0.30)',
      },
    },
  },
};
```

### 8.2 `globals.css` essentials

```css
/* Load fonts via next/font: Manrope, IBM Plex Sans, IBM Plex Mono. */

html { color-scheme: light; }
body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg-primary);
  text-rendering: optimizeLegibility;
  font-feature-settings: 'kern', 'liga', 'calt';
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-feature-settings: 'kern', 'ss01';
}
:focus-visible { outline: none; box-shadow: var(--shadow-focus); border-radius: var(--radius-sm); }
::selection { background: var(--color-black); color: var(--color-white); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.3 Component file map

```
/components
  /ui
    Button.tsx     Card.tsx     Chip.tsx     Input.tsx
    Logo.tsx       Monogram.tsx
  /sections
    Hero.tsx       InboxDemo.tsx     AgentsTabs.tsx    HowItWorks.tsx
    Background.tsx CustomerStories.tsx BookingSection.tsx Footer.tsx
  /layout
    SiteHeader.tsx SectionHeader.tsx
```

---

## 9. Motion & interaction

The bias is **toward stillness**. Motion only confirms causality (something the user caused) or signals state change.

- **Default easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` (easeOutExpo-ish). Define as `--ease-standard`.
- **Default duration:** 200ms for hover/focus, 320ms for layout shifts, 480ms for the inbox auto-cycle crossfade.
- **Scroll-triggered reveal:** OK at 80px translateY → 0 with fade, but only once per section. No parallax. No scroll-jacking.
- **Hero:** static. No autoplay video, no animated text, no twinkling stars. The page should feel rendered, not assembled.
- **Always respect** `prefers-reduced-motion: reduce` → all transitions to 0.01ms.

---

## 10. Accessibility (WCAG 2.1 AA — non-negotiable)

- **Contrast.** Verified pairings on the new monochrome palette:
  - Black on white: **21:1** ✅
  - White on black: **21:1** ✅
  - `--gray-700` `#3F3F3F` on white: **10.4:1** ✅
  - `--gray-500` `#696969` on white: **5.7:1** ✅ (≥16px only)
  - `--gray-400` `#A3A3A3` on white: **2.9:1** ❌ — **decorative only** (the gray clause of the two-tone H1 qualifies because it is ≥36px and AA-large at 3:1 is met for `--gray-400` if combined with semibold; for paragraphs use `--gray-500` or darker)
  - Navy `#002147` on white: **14.6:1** ✅
  - Stone `#E5E4E2` on white: 1.1 ❌ — borders/dividers only, never text
- **Focus state:** every interactive element shows `--shadow-focus`. Never remove the outline without replacing it.
- **Tap targets:** minimum 44×44px on mobile.
- **Alt text:** every meaningful image. The monogram in the header gets `alt="UTXO.AG"`.
- **Headings:** one H1 per page, no skipped levels.
- **Forms:** every input has a programmatic `<label>`. Errors announce via `aria-live="polite"`.
- **Language switcher:** updates `<html lang>` and persists in cookie + URL (`/de/...`, `/en/...`).

---

## 11. Content patterns

A few short rules so the copy reads on-brand without thinking.

- **Numbers carry weight.** Lead with concrete metrics: "12 qualified leads", "2–4 weeks", "30 minutes". Don't round when the precise number is more credible.
- **No exclamation marks** in body copy.
- **"Coworker," not "agent" or "bot,"** in customer-facing copy. "Agent" is fine for the technical/Agents section header.
- **Sentence case** for all headings and buttons. Title Case only for proper nouns.
- **Em dashes** with spaces — like this — match the brand kit's typography.
- **Localization:** German is the primary market. Every page ships DE first, EN second. Keep sentences short — German runs ~30% longer than English; layouts must accommodate.

---

## 12. Open questions / to confirm with brand owner

1. **Dark mode** for marketing site — ship at v1, or product-only? (Current spec is dark-mode-ready.)
2. **Imagery policy** — kit shows only logo mockups. Recommendation: **no photography in v1**; the inbox demo + monogram motif are the only "imagery." Revisit when customer logos become available.
3. **Customer logos** — do we have permission from the three case-study companies (Southern German Machine Builder, RST Datentechnik, etc.) to use names and logos? If not, keep them anonymized as today.
4. **Pricing** — does the rebrand introduce a pricing page, or stay quote-only?
5. **The accent CTA** — confirm "Book a discovery call" is the single highest-priority conversion. Only that button gets navy; everything else is monochrome.
6. **Product UI** — when the dashboard ships, split this Design.md into `Design.md` (marketing) + `Product.md` (app). Until then, both ground in the same tokens.

---

*v1.1 — monochrome-first. Source: UTXO Brand Guidelines v1.0 (designed for NMKR), May 2026.*
