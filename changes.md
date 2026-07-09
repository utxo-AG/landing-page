# Changes

## caveman-session — 2026-07-09 UTC

- Fixed "biten" typo to "bieten"
- Fixed stray "user" to "unser"
- Capitalized formal "Ihre" in hero
- Capitalized formal "Ihr" in banner
- Added comma to "agents" hero h1
- Added period to "agents" hero copy

## f8eddc4d-274b-47d2-93dc-34e2fc9bdfe7 — 2026-07-09 UTC

- Hero image luma fades in slowly

## 9ceb4775-9291-45a6-99be-d26dc3ff7696 — 2026-07-09 20:33 UTC

- Added LCX NMKR rstdsl to marquee
- Bumped marquee duration to 40s
- Matched RST card layout to others
- Swapped RST card image to rsthaus
- Added rstdsl logo to RST card
- Rewrote RST card copy
- Sized RST logo 1.5x
- Swapped Sokosumi card image
- Sokosumi image container bg white
- Shortened Sokosumi card copy
- "how" heading text left aligned
- "how" case walkthrough now row layout
- Connector line now horizontal
- Capability pills moved right of card
- Pills scattered in circle formation
- Fixed reveal transform wiping position
- Pills now even right semicircle
- Pills randomly scattered right of card
- Clamped pill vertical scatter to card height
- Fixed pill scatter true card height 348px
- Pills straighten rotation on hover
- Re-scattered pills within same bounds
- Re-scattered pills again same bounds
- Re-scattered pills third time same bounds
- Re-scattered pills fourth time same bounds
- Unscattered pills into two column grid
- Centered each pill column vertically
- Pills shrink to text centered in column
- Reverted pill column centering

## hero-banner-link — 2026-07-09 UTC

- Removed button from hero banner
- Whole banner now links to "agents.html"
- Added arrow at end of banner text

## hero-banner-added — 2026-07-09 UTC

- Added black banner above "index.html" hero
- Banner text "Braucht ihr Unternehmen KI?"
- Banner button links to "agents.html"

## compliance-hover-removed — 2026-07-09 UTC

- Scoped security card hover to "sec-grid" only
- Compliance bullet list no longer gets hover

## eyebrows-removed — 2026-07-09 UTC

- Removed 6 section eyebrow labels
- "team" "stories" "how" "process" sections
- "security" "pricing" sections too

## team-dots-removed — 2026-07-09 UTC

- Removed colored dots from "team" cards

## nmkr-logo-card — 2026-07-09 UTC

- Second "stories" card icon swapped for NMKR logo
- Second card now matches first card layout pattern
- NMKR logo absolute top-right dropped eyebrow icon box
- Second card width matched to first card's 66.666%
- First card bg matched to others' "bg-secondary"
- NMKR logo enlarged 32px to 56px height
- NMKR logo 4x again now 224px height
- NMKR logo halved now 112px height
- NMKR logo now width fixed height auto
- NMKR logo 3x again now 336px width
- NMKR logo set to 200px width
- Second card image swapped to "resources/Projects/NMKR"
- Carousel arrow buttons font-size bumped to 24px
- Project cards scroll-snap-align changed to center
- Carousel goTo and scroll detect now center active slide
- Added spacer before first card fixes centering clamp
- Track scrollLeft initialized to center first card
- Non active project cards now dim to 50 opacity

## pixelgrid-noise-range — 2026-07-09 UTC

- Reverted black pixel opacity floor
- Pixelgrid noise now adds "-0.2" to "0.2"
- Noise no longer scaled by luma so black areas show grain

## pixelgrid-shim-black — 2026-07-09 UTC

- Removed noise from pixelgrid entirely
- Shim no longer scaled by luma lifts black areas

## pixelgrid-shim-intensity — 2026-07-09 UTC

- Shim weight lowered "0.5" to "0.25"
- Shim weight lowered again "0.25" to "0.1"
- Shim weight now scales with luma "0.1" to "0.5"

## hero-opacity-agents — 2026-07-09 UTC

- "agents.html" hero max-opacity raised 0.4 to 0.65

## prose-line-height — 2026-07-09 UTC

- "p" line-height set to 1.4 in style.css
- Inline "p" line-height 1.13 replaced to 1.4

## team-copy-human — 2026-07-09 UTC

- "team" heading now "Die Menschen dahinter"
- "team" intro text describe human team not AI hiring

## hero-tile-scale-index — 2026-07-09 UTC

- Added "data-tile-scale" attribute to pixelgrid
- Set "index.html" tiles 4x bigger via scale 4

## hero-spotlight-index — 2026-07-09 UTC

- Tile alpha now darker 90 to 0 range
- Tile color pure black not grey
- "index.html" hero now uses spotlight only
- Added "data-spotlight-only" flag on its canvas
- "agents.html" hero animation unchanged image-based

## hero-invert-white — 2026-07-09 UTC

- Inverted "top" hero bg to white on both pages
- Flipped hero text button colors to match
- Inverted pixel-grid tile colors for light bg
- Changed pixel-grid tiles from blue tint to grey

## hero-single-image — 2026-07-09 UTC

- Hero grid now uses only "head_1_crop.webp"
- Removed moving spotlight gaussian falloff

## typography-brand-kit — 2026-07-09 UTC

- Confirmed fonts already match brand kit Manrope IBM Plex Sans
- H1 hero now 64px Semibold per brand scale
- H2 section headers now 48px Medium per brand scale
- Heading line-height 100 percent letter-spacing -2.8 percent
- Body paragraph line-height tightened to 113 percent
- Added responsive H1 scale 36px tablet 24px mobile
- Removed stale fixed width height on "30 Tagen" heading

## hero-pill-remove — 2026-07-09 UTC

- Removed pill above hero heading "index.html"

## de-translation — 2026-07-09 UTC

- Translated "index.html" all copy German
- Translated "agents.html" all copy German
- Updated "partials/header.html" nav German
- Updated "partials/footer.html" links German
- Set html lang attribute "de" both pages
- Swapped DE EN toggle DE now active
- Translated titles meta descriptions German

## hero-tile-res — 2026-07-07 UTC

- Hero grid tile resolution up 10 percent
- Hero grid tile resolution up 10 more
- Hero grid divisor set to 8
- Hero grid tile res reset original

## project-card-masumi — 2026-07-07 UTC

- Replaced first "stories" project card
- Now shows Masumi Sokosumi Serviceplan story
- Swapped image for Masumi wordmark logo
- Reverted white bg dual logo change
- Renamed Sokosumi resource add png ext
- Card image now Sokosumi product screenshot
- Symbol above heading now Serviceplan logo
- Rewrote description from Masumi Sokosumi sites
- Removed pill Serviceplan logo now bare svg
- Serviceplan logo aligned left not centered
- Masumi card now dark bg white text
- Serviceplan logo inverted white on dark card
- Rewrote description Serviceplan noticed shift
- Serviceplan logo now colored not inverted
- Card background changed black to dark grey
- Card background lightened to medium grey
- Card background now white text reverted
- Serviceplan logo moved top right absolute
- Narrowed text column max-width 42ch
- Card width reduced to two thirds slide
- Swapped Sokosumi image for dark version

## security-compliance — 2026-07-07 UTC

- Added new "compliance" section agents.html
- Placed between "security" and "pricing"
- Added EU AI Act GDPR ISMS checklist
- Added badge icon top-right compliance heading
- Compliance cards now vertical list
- Removed borders backgrounds compliance items
- Single big badge symbol right side
- Removed top-right heading badge icon
- Compliance list rows made compact
- Compliance heading shortened one line
- Swapped symbol left list right
- Shortened compliance item descriptions
- Pushed compliance list further right
- Compliance list now real bullet list
- Merged guideline name text one line
- Widened compliance list shift left
- Removed heading compliance section
- Darkened compliance symbol fill color
- Matched compliance text size security
- Merged compliance into "security" bottom
- Removed standalone "compliance" section
- Reduced compliance list text size again
- More padding above compliance info block
- Doubled that padding above compliance

## hero-image-grid — 2026-07-07 UTC

- Renamed hero anim images .webp
- Hero grid driven by images
- Removed Gaussian spotlight hero grid
- Grid density quadrupled hero canvas
- Restored spotlight multiplied with image luma
- Hero cycle uses all 4 images
- Doubled hero spotlight size

## pricing-grants-remove — 2026-07-07 UTC

- Removed "Eligible for grants" line pricing

## hero-trim — 2026-07-07 UTC

- Removed "Enterprise AI" badge hero
- Removed "See how it works" link hero
- Removed "EU/CH HOSTING" strip hero

## security-cards-trim — 2026-07-07 UTC

- Removed small cards "security" section
- Removed sub headline "security" section

## team-final-five — 2026-07-07 UTC

- Added Sascha Faizan Francis Peter Shreya cards
- Used "Rectangle" torso-fixed photos for 3
- Used direct "sasha.png" "shreya.png" for other 2

## team-torso-outpaint — 2026-07-07 UTC

- Restored torsos on 3 circle-cropped "Team" photos
- Used "google/gemini-2.5-flash-image" via OpenRouter
- Outpainted "Peter" "Faizan" "Franzis" to rectangles
- Saved results to "resources/Team/Rectangle"

## nmkr-team-import — 2026-07-07 UTC

- Replaced fictional "team" cards with real NMKR staff
- Sourced names roles from nmkr.io/about
- Used 10 confirmed photos from "resources/Team"
- Removed "Illustrative team" badge
- Made "team" grid scroll sideways one row
- Hid scrollbar on "data-team-grid" row
- Dropped mobile 1-col override for "team"
- Gave "team" photo frames grey background
- Added floating prev next buttons for "team"
- Added "_initTeamScroll" cycle logic to main.js
- Moved "Projects" prev next to floating buttons
- Centered dot indicator above "Projects" cards
- Moved dot indicator below "Projects" cards

## historical — prior to this session

- Removed "coworker" section
- Removed stat band
- Removed "team" section
- Removed "why" section
- Removed "background" section
- Removed "work" section
- Removed "stories" section
- Removed related nav links

## 389a844d-5747-4ab3-963f-29908c549ef3 — 2026-07-07 UTC (cont. 4)

- Moved carousel nav above cards
- Aligned nav top-right beside heading
- Re-scoped "data-carousel" to fit new layout

## 389a844d-5747-4ab3-963f-29908c549ef3 — 2026-07-07 UTC (cont. 3)

- Swapped "scrollIntoView" for explicit "scrollTo"
- Made carousel dots update instantly on click
- Hid vertical overflow on carousel track
- Verified carousel in headless Chromium Firefox

## 389a844d-5747-4ab3-963f-29908c549ef3 — 2026-07-07 UTC (cont. 2)

- Changed "Projects" h2 to "Projects"
- Removed subheading paragraph "Projects"
- Doubled carousel slide min-height
- Added left image per carousel slide
- Moved logo above heading in slides
- Compressed slide body text

## 389a844d-5747-4ab3-963f-29908c549ef3 — 2026-07-07 UTC (cont.)

- Renamed "stories" heading to "Projects"
- Renamed "Stories" nav links to "Projects"
- Replaced "stories" tiles with carousel
- Added logo badge per carousel slide
- Condensed challenge solution outcome text
- Added carousel prev next dot controls
- Added "_initCarousel" to main.js
- Hid carousel track scrollbar in CSS

## 389a844d-5747-4ab3-963f-29908c549ef3 — 2026-07-07 UTC

- Renamed "index.html" to "agents.html"
- Created new "index.html" main page
- Moved "partners" section to main page
- Moved "team" section to main page
- Moved "stories" section to main page
- New hero links main page to "agents.html"
- Split header nav per page
- Split footer nav per page
- Logo on "agents.html" links home
- Synced partials with "agents.html" nav
- Updated CLAUDE.md for two-page structure

## cab0c157-cce2-416e-b64f-9c87d48b3721 — 2026-07-07 11:45 UTC

- Trimmed "how" section content
- Added change tracking rule
- Trimmed "security" section content
- Moved "Cost check" own section
- Inverted "cost-check" section colors
- Removed "one-time investment" box
- Removed "cost-check" section
- Restored "team" section before "how"
- Swapped team photos for stock images
- Re-added "team" nav links everywhere
- Changed "team" heading to "Our team"
- Added "partners" logo marquee section
- Renamed "Test run" to "Test & review"
- Renamed "Go-live & review" to "Go-live"
- Restored "stories" section after "how"
- Re-added "stories" nav links everywhere
