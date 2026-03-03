# Fix Plan — Design Polish & Structure Improvements

## DESIGN DIRECTION: Boldness & Clarity
High contrast, dramatic negative space, confident typography. The copy is anti-BS ("These are not demos. No sales funnel gymnastics.") — the design must match that energy. Pure neutrals foundation (true grays, black, white). No decorative color. Depth via surface color shifts, not shadows.

---

## Priority 1: Remove Placeholder Images from Agent Cards

The huge gray "Screenshot placeholder" boxes make the page look unfinished and bloat the cards. Remove them entirely. Agent cards should be compact: icon + name + description. That's it.

- [x] In `PublicAgents.tsx`: Remove the `aspect-[16/9] bg-[#f0f0f0]` placeholder image div from each card
- [x] In `PrivateAgents.tsx`: Remove the `aspect-[16/9] bg-[#f0f0f0]` placeholder image div from each card
- [x] In `Portfolio.tsx`: Remove the `aspect-[16/10] bg-[#f0f0f0]` placeholder image div — keep just name + description + link
- [x] Agent cards become compact: `p-8`, icon top, name, description. No image. Height should be natural (auto), not stretched.

---

## Priority 2: Differentiate Public vs Private Agents Visually

Both sections look identical (white cards on white panel). They need different visual treatments.

- [x] **Public Agents** section: Keep white panel bg. Cards get a subtle `border border-[#e0e0e0]` with `hover:border-black transition-colors` to show they're interactive/hireable. Add a small "Available" pill badge in green-ish gray (`bg-[#e8f5e8] text-[#2d6a2d] text-xs px-2 py-0.5 rounded-full`) next to each agent name.
- [x] **Private Agents** section: Change the outer section bg to `bg-[#eaeaea]` (the slightly darker gray). Cards stay white. Add a "By request" pill badge in neutral gray (`bg-[#f0f0f0] text-[#666] text-xs px-2 py-0.5 rounded-full`).
- [x] This creates visual separation: Public = white-on-white with borders, Private = white-on-gray.

---

## Priority 3: Redesign "How It Works" Section

The 5 numbered circles in a row feel generic. Make this section more dynamic.

- [x] Change from 5-column grid to a **horizontal flow/timeline** layout:
  - Each step is connected by a thin horizontal line (`border-t border-[#dedede]`)
  - Numbers are small and inline with the step text, not in circles
  - Layout: `flex items-start` with connecting lines between items
- [x] Alternative simpler approach: Make it a **vertical list** on the left side of a white panel, with the steps as clean numbered items:
  ```
  1 — You send an email
  2 — The agent understands context
  3 — It interacts with your systems
  4 — It does the work
  5 — You stay in control
  ```
  Each step: `text-[18px]` with the number in monospace (`font-mono text-[#979797]`), separated by `border-b border-[#f0f0f0]` dividers, `py-4` each.
- [x] Left-align the list, max-w-[500px], inside the white panel. The closing quote ("No please upload a CSV...") stays centered below.

---

## Priority 4: Strengthen the StandaloneProducts Section

Currently just floating centered text — needs visual weight.

- [x] Add a subtle left border accent: `border-l-2 border-black pl-8` on the text container
- [x] Left-align instead of center. The bold closing line should feel like a statement.
- [x] Wrap in white panel but make it compact — `py-12 px-16` not `p-16`
- [x] The closing line "If an agent deserves a company, we build it one." should be `text-[28px] font-normal tracking-[-0.5px]` — make it feel like a pull quote

---

## Priority 5: Improve Typography Hierarchy

Section labels, titles, and body text lack contrast between levels.

- [x] **Section labels** (e.g. "Hire instantly", "Available on request"): Change to `text-[13px] font-mono uppercase tracking-[0.1em] text-[#999]` — monospace uppercase creates stronger differentiation from body text
- [x] **Section titles**: Keep at `text-[30px]` but change to `font-semibold` (600 weight, not 400) for more authority
- [x] **Agent card titles**: `text-[16px] font-semibold` (not 18px — slightly smaller to create better hierarchy under section titles)
- [x] **The "No dashboards required." / "Same tech. Different deployment." taglines**: Change to `font-mono text-[14px] text-[#999] tracking-wide` — monospace makes these feel like system messages, which matches the tone
- [x] Update SectionHeader.tsx with these changes

---

## Priority 6: Improve Card Design Consistency

Cards need more craft — consistent padding, better hover states, proper depth strategy.

- [x] Card.tsx: Use `border border-transparent hover:border-[#dedede] transition-colors duration-150` instead of hover shadow
- [x] Card padding: standardize at `p-6` (24px) not `p-8` (32px) — tighter padding feels more professional
- [x] Remove `rounded-xl` if still present — keep all panels sharp (no border-radius)
- [x] Portfolio cards: add `group` class, make "Visit →" arrow animate on hover: `group-hover:translate-x-1 transition-transform`

---

## Priority 7: Add Visual Rhythm Between Sections

The page is a series of white panels on gray with no connecting visual elements.

- [x] Add thin divider lines between major sections: `<div className="max-w-[1280px] mx-auto"><hr className="border-t border-[#e0e0e0]" /></div>` between:
  - AgenticPrinciples → PublicAgents
  - PublicAgents → PrivateAgents
  - HowItWorks → Integrations
  - Integrations → Portfolio
- [x] NOT between every section — only where two similar-looking sections are adjacent
- [x] The ManifestoBlock (black) and CTABar (black) already create natural breaks — don't add dividers near them

---

## Priority 8: Fix ManifestoBlock Design

The manifesto block works conceptually but could be more impactful.

- [x] Make "These are not demos." and "These are not chatbots." even larger: `text-[40px] md:text-[48px] font-normal leading-[1.1]` — these should dominate
- [x] Add a thin horizontal rule between the bold statements and the paragraph text: `<hr className="border-t border-white/20 max-w-[120px] mx-auto my-10" />`
- [x] The paragraph text should be `text-[16px]` not `text-[18px]` — smaller to create more contrast with the bold headlines
- [x] Increase padding: `py-[120px]` for more dramatic negative space

---

## Priority 9: Fix CTABar/CTA Section

The CTA button currently looks secondary (white bg on black).

- [x] Change button style: keep white bg + black text but make it larger — `px-10 py-4 text-[18px]`
- [x] Add subtle border: `border border-white/20`
- [x] The 3 options list: make each item start with a dash or bullet, `text-left` not centered, and style as `font-mono text-[14px] text-white/70`
- [x] Center the options list block but left-align the text within it
- [x] Increase vertical spacing between the subtitle and options list: `mt-10`

---

## Priority 10: Improve Integrations Section

The icon grid is functional but could feel more polished.

- [x] Give each integration item a white card bg: `bg-white p-4` with no border-radius
- [x] Make the grid `gap-3` instead of `gap-6` — tighter grid feels more technical
- [x] Icons should be slightly larger: `w-6 h-6` (24px) → `w-7 h-7` (28px)
- [x] The section bg stays at `bg-[#eaeaea]`

---

## Priority 11: Fix Navbar Polish

- [x] Make the logo "utxo AG" slightly heavier: `font-bold` instead of `font-semibold`
- [x] Add a subtle bottom border that only appears on scroll: Currently no border — add `border-b border-transparent` that transitions to `border-[#e0e0e0]` when scrolled. This requires making Navbar track scroll position with a `useEffect`.
- [x] The "Email the Agent" button in nav should be smaller/lighter: `text-sm px-4 py-1.5` — it currently competes too much with the hero CTA

---

## Priority 12: Final Build & Verify

- [x] `npm run build` — no errors
- [x] Visual check: distinct sections, no huge gray placeholder boxes
- [x] Public vs Private agents look visually different
- [x] Typography hierarchy is clear (labels < titles < hero)
- [x] Monospace accents on labels and taglines
- [x] Cards are compact and consistent
- [x] ManifestoBlock feels impactful
- [x] CTA button feels primary/important

---

## Design System Reference (for consistency)

### Spacing (4px grid)
- Card padding: 24px (p-6)
- Section padding: 60-80px vertical, 48-80px horizontal
- Between sections: 24-32px gap (the gray bg creates this naturally)

### Depth Strategy: Surface Color Shifts
- Page bg: #f4f4f4
- Card/panel bg: #ffffff (white on gray = natural elevation)
- Darker sections: #eaeaea (Private Agents, Integrations)
- Black sections: ManifestoBlock, CTABar
- NO box-shadows for depth. Borders only when interactive.

### Typography
- Headings: Inter, semibold (600), tight tracking
- Body: Inter, regular (400)
- Labels & taglines: JetBrains Mono, uppercase, small, tracked
- Data/numbers: JetBrains Mono, tabular-nums

### Color
- Primary: #000000
- Secondary: #666666
- Muted: #999999
- Faint: #cccccc
- Borders: #e0e0e0
- Accent: None. Gray builds structure. This is a monochrome site.
