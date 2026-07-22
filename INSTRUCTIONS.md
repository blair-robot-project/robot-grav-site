# FRC 449 Website — Teammate Instruction Manual
*Last updated: 2026-07-19 · Version 2.4*

The site gets a full automatic backup every night, and traffic is low enough that a mistake is easy to fix and low-stakes. Just be reasonably careful, and use the nightly backup as your safety net.

This manual is in two parts:

- **Part 1 — For Everyone.** Explains how to update **text**, **images**, and **modules** via [`https://robot.mbhs.edu/admin`](https://robot.mbhs.edu/admin). Includes suggestions for an **update schedule**.
- **Part 2 — For Power Users.** Covers things you can only do with **SSH and CSS**, including inventing new module types.
---

# Part 1 — For Everyone

## 1. Site basics

Our site runs on **[Grav](https://getgrav.org/)**. Unlike some CMSes, there is no database; the entire website is just backup-friendly files and folders.

Three words you'll hear constantly:

- **Folder** — the container on disk. Can be either:
  - a **Page** — a folder that Grav turns into a web address (URL). The folder `02.ABOUT-US` becomes the page at `/about-us`.
  - a **Module** — a "building block" that is **not** its own web address. Modules are stacked to build a page (a **modular page**). Our Home and About Us pages are modular pages: the hero banner, each text block, each photo menu, the gallery — those are all separate modules assembled into one page. Their names begin with a **leading underscore** (like `_mission`).

**Why this matters:** when you want to edit "the top text statement on the About Us page," you're really editing the [`_mission` module](https://robot.mbhs.edu/admin/pages/edit/about-us/_mission) *inside* the About Us page — not the About Us page itself. In the admin's Pages list, expand the parent page and you'll see its modules underneath.

### Logging in
Go to [`https://robot.mbhs.edu/admin`](https://robot.mbhs.edu/admin) and sign in. The admin interface — **Admin Next** — has Pages, Configuration, Plugins, Themes, and Tools sections in the left sidebar. You'll spend almost all your time in **Pages**.

> Your access level (Editor / Onboarder / Admin) controls what you can do. Most people should be **Editor**. Ask Brad or Rafi if you need more.

## 2. Text

1. In the admin, click **Pages**.
2. Navigate to the page. For a **modular page** (Home, About Us…), expand it and find the **module** that holds the text you want.
3. Click the module to open it. Edit the **Content** box.
4. Click **Save**.

The Content box uses **Markdown**:

| You type | You get |
|---|---|
| `## Heading` | A heading (more `#` = smaller) |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `* item` (line start) | a bullet point |
| `[click here](/about-us)` | a link |
| `<br>` | a line break |

> Here's a [full guide](https://learn.getgrav.org/17/content/markdown) to using Markdown in Grav.

You can also use HTML for effects Markdown can't do easily.

**Leaving notes for other editors:** type `[//]: # (your note here)` in the Content box. It shows for editors but never appears on the public page. 
> Each new folder, page, and module starts with a `[//]: # CommentsGoHere` in the Content box; use that to leave helpful documentation.

**Editing frontmatter (advanced settings):** every module/page has a **Normal / Expert** toggle in the top bar. Normal shows the friendly form; **Expert shows the raw settings file directly, and you can edit it there** — this is how you change things like hero images, gallery order, and menu item lists without needing SSH. Be careful in Expert mode: it's real file content, and a typo can break the page. If you're not sure, ask a Power User first.

## 3. Images

Every image you upload is automatically **resized** to a sensible max width for its context (gallery 1200px, hero 2560px, sponsor/mentor grids 800px, else 2000px) and its **filename sanitized**. Drag in full-size photos with messy names — it just works.

### a) Images next to a block of text
In the module, drag one or more new images into the Page Media field to upload them. The images appear on the web page in the order they appear in the Page Media box. There's a button that toggles drag-to-reorder just above the box.

### b) Rows of images
To create one or more rows of four images on a page, create a module with type _gallery-draggable_. Then drag images onto the Page Media field. You can reorder them by dragging the faint icon on the top right of each image. 
- **Caption:** any text you type in the gallery's **Content** box appears centered below the photos.

## 4. Creating a page or module

1. On the **[Pages](https://robot.mbhs.edu/admin/pages)** page, click **Add** and choose **Page**, **Folder**, or **Module**.
2. Give it a title and pick a **template** from the dropdown — for a module, this list shows every module type our theme already supports (Text, Hero, Icon-menu, Feature-images, Gallery-draggable, Footer-col, and a few unused stock ones).
3. Set its position under **Order** (or drag it into place in the Pages list).
4. Click **Continue**, then add your Content, Save.

> **This only works for module *types* that already exist.** If you need an entirely new kind of module — one that doesn't behave like any of the templates in that dropdown — that's a Power User task (Part 2, §10).

## 5. Announcements

The homepage — or any other page you choose — can show a dismissible announcement (e.g. "Registration closes June 21") without any developer work. Unlike other content, announcements aren't a module you add to a specific page; they live in one central place and you tell each announcement which page(s) to appear on.

*(Called "Announcements" to distinguish this from the unrelated **Blue Banners** photo gallery on the homepage — same everyday word, two different features; renamed 2026-07-19.)*

**To add or edit an announcement:**
1. In the admin, go to **Pages → [Announcements Data](https://robot.mbhs.edu/admin/pages/edit/announcements-data)**.
2. Click the **Announcements** tab. Click **Add item** for a new announcement, or click an existing announcement's row to expand it (rows load collapsed to keep the list scannable as it grows).
3. Fill in:
   - **Internal Title** — for your own reference only, never shown on the site. Since the collapsed row just shows this text, it's worth including the date range here too, e.g. "FLL Registration — Jul 8–21".
   - **Message** — the actual text shown to visitors.
   - **Link (optional)** — where it goes if clicked: an internal page like `/community/fll-team`, or a full `https://` URL. Leave blank for a plain, non-clickable announcement.
   - **Color / Urgency** — yellow, red, blue, or green.
   - **Show on Pages** — comma-separated page routes, e.g. `/, /community/fll-team`. Leave blank to show on the homepage only.
   - **Start showing** / **Stop showing** — it appears and disappears automatically on these dates — no need to remember to take it down.
4. Click **Save**.

A visitor can dismiss an announcement with its **×** button; it stays hidden for that visit but reappears the next time they come back. Multiple announcements can be active (and shown on the same page) at once.

## 6. Update Schedule

All of these are suggestions to keep the site useful and not stale; the site can always be redesigned if the update burden is too much.

### Year-round: "What's new"
- Keep the homepage ["What's new"](https://robot.mbhs.edu/admin/pages/edit/home/_about) module current with match results, community outreach, and other notable events.

### End of FRC season
- Update the [homepage top text](https://robot.mbhs.edu/admin/pages/edit/home/_home_top_text).

### Registration-based programs: FLL, Bunnybots, Summer Programming
Each of these requires two changes a year to the ["What's new"](https://robot.mbhs.edu/admin/pages/edit/home/_about) module and to the program's own page:
1. When registrations open, add a line like "Applications are open [here] for the 2026-27 season!". You might also consider updating the page with the season's specifics; even if most participants find out through social media — parents in particular still check the open web, and it's the one place that's always there regardless of which platform is currently popular. Consider also adding a time-limited [announcement](#5-announcements) for extra visibility while registration is open.
2. When registrations close, add a line like "Check back in \[when?\] for program registration." 

**Notes.** If desired, the team can update the **Bunnybots** page once a year to describe the most recent season. **Summer Programming** is currently dormant.

### Annual
1. **Team History** — write up the just-ended season in a new module for the season under `_history-top` (About Us).
2. **New Leaders** — update the Leadership page after elections in May.
3. **Mentors** — fix any "Joined 20??" placeholders; add new mentors.
4. **Members of Note** — update if desired.
5. **Sponsors** — update logos/roster; exact cadence left for the team to figure out.
6. **T-Shirt Designs** — upload each year's design.

### Currently dormant — update only if revived, no schedule otherwise
- Blog, Newsletter, Build Blog
- Scouting 

## 7. Gotchas everyone should know

- **Frontmatter (Expert mode) is real file content.** A typo can break the page — if you're not confident editing it directly, ask a Power User.
- **You can't invent a brand-new module type from the admin.** You can add another instance of an *existing* type (Text, Hero, Icon-menu, etc.) freely — inventing a new type entirely requires SSH (Part 2, §10).
- **Reordering pages can accidentally expose others in the navbar.** Dragging a page to a new spot in the Pages list doesn't just renumber the ones you moved — it can hand out a numeric order prefix to *every* sibling page, including ones (like Announcements Data, 404, Media, Images) that were deliberately left off the navbar. In Grav, a page with a numeric order prefix defaults to **visible** in the nav unless told otherwise. **To force a page off the navbar regardless of its order prefix:** open it, switch to **Expert mode** (§2), and add `visible: false` to its frontmatter — that's how Announcements Data, 404/Error, Media, and Images stay hidden today.
- **Ignore "update available" prompts** for plugins and themes. Updating has broken the site before. Leave them alone unless Rafi says otherwise.
- **There's a nightly backup, so mistakes are recoverable.** Still, make risky changes carefully — double-check before saving, and ask a Power User if you're unsure.

---

# Part 2 — For Power Users (SSH + CSS)

This part assumes you're comfortable with a command line and basic CSS. It covers what you **can't** do through the admin.

## 8. Getting in and where things live

**SSH:** `ssh <you>@robot.mbhs.edu` — Grav root: `/srv/robot-grav-site/`

**Key paths** (relative to the Grav root):

| What | Path |
|---|---|
| All page content | `user/pages/` |
| Active theme | `user/themes/mod-quark/` |
| Custom CSS | `user/themes/mod-quark/css/custom.css` |
| Base HTML template | `user/themes/mod-quark/templates/partials/base.html.twig` |
| Module templates | `user/themes/mod-quark/templates/modular/` |
| Module blueprints | `user/themes/mod-quark/blueprints/modular/` |
| System config | `user/config/system.yaml` |

A page on disk: `user/pages/02.ABOUT-US/05._2025-26/text.md`. The `---` block at the top of a `.md` file is the **frontmatter** (YAML settings); below it is the **content** (Markdown).

## 9. Things you can only do over SSH

### Edit frontmatter directly (for multi-line or scripted edits)
The admin's Expert mode (Part 1, §2) handles most frontmatter edits fine. For scripted, multi-line, or bulk changes, edit the `.md` file directly. For multi-line edits over SSH, **use Python, not `sed`** (sed doesn't do multi-line reliably):
```bash
cat << 'PYEOF' | ssh USER@robot.mbhs.edu python3
p='/srv/robot-grav-site/user/pages/.../text.md'
c=open(p).read()
c=c.replace('old','new')
open(p,'w').write(c)
PYEOF
```

### Create a module using a custom one-off variant of an existing template
For the common case — adding another instance of an existing module type (another `text`, another `gallery-draggable`, etc.) — use the admin's Add → Module flow (Part 1, §4); no SSH needed anymore. SSH is still useful if you want to hand-clone an existing module folder as a starting point for heavy customization:
```bash
cd /srv/robot-grav-site/user/pages/01.HOME
sudo -u grav cp -r 02._highlights 04._newthing
# edit 04._newthing/*.md; renumber the prefix to set order
```

### Create a brand-new file (not editing an existing one)
Site files are owned `grav:editor`; your own account normally can't create a *new* file in a theme directory even if you can edit files that already exist there (the directories themselves aren't group-writable — only individual files that have been explicitly loosened to `664`). To create a new file as `grav` in one step:
```bash
sudo -u grav touch /path/to/new/file
sudo chmod 664 /path/to/new/file
```
After that, you (or an automated tool acting as you) can write its content over plain SSH/SCP with no further `sudo` needed. This came up building the announcements feature (§5) — its three new theme files were created this way.

### Edit CSS — and clear BOTH caches
All custom styling goes in **`custom.css`**. After editing CSS you must do **two** things or you won't see your change:
1. **Clear Grav's cache:** via the admin's Tools → Cache panel, or `rm -rf <gravroot>/cache/*` over SSH.
2. **Bust the browser cache:** bump the version number in `base.html.twig` — find `custom.css?v=NN` and increment `NN`.

Verify with `curl` to tell the two caches apart:
```bash
curl -s "https://robot.mbhs.edu/user/themes/mod-quark/css/custom.css?v=NN" | grep YOUR_RULE
```
If curl shows the new value but your browser doesn't, it's *browser* cache — bump `?v=`.

### Edit templates / partials
Layout and structure live in `templates/`. The footer, header, and how modules render are here. Back up before editing: `cp file file.bak-$(date +%Y%m%d)`.

## 10. Create a new module template (a genuinely new type)

Adding another instance of an *existing* template (Text, Hero, Icon-menu, etc.) is now an admin-only task — see Part 1, §4. This section is for when you need a module that behaves in a way **none** of the existing templates do.

**Two files, both required:**
1. **The Twig template** — `user/themes/mod-quark/templates/modular/YOURNAME.html.twig`. This is the actual HTML/Twig markup for the module.
2. **A matching blueprint** — `user/themes/mod-quark/blueprints/modular/YOURNAME.yaml`. This tells the admin what fields to show for this module type, and **must** `@extends: default` at minimum.

**Why the blueprint is mandatory, not optional:** if you create the `.twig` template without a matching blueprint, the module will render once — but the **admin silently reverts it to a stock template type** the next time anyone saves it. This is the single most common mistake when adding a new module type. Look at `icon-menu.yaml`, `feature-images.yaml`, or `gallery-draggable.yaml` in the blueprints folder for real, working examples to copy from — all three of our existing custom module types followed exactly this pattern.

**Steps:**
1. Pick an existing custom template closest to what you want (icon-menu, feature-images, and gallery-draggable are the three real precedents) and copy both its `.twig` file and its `.yaml` blueprint as a starting point.
2. Rename both to your new module's name — the two filenames (minus extension) must match.
3. Edit the `.twig` file's markup to do what you actually want.
4. Edit the `.yaml` blueprint's fields to match whatever settings your new template actually needs.
5. Clear the cache. Test by adding a module of your new type via the admin (Part 1, §4) — it should now appear in the template dropdown.

**If what you actually need is an admin-editable *list* of things (not a one-off module)** — like the announcements in §5 — a plain module isn't the right shape. The working pattern instead is a single hidden page with a repeating **list** field in its blueprint (`type: list`), the same way `announcements-data` and `sponsors-data` work: fully editable through the normal Pages UI, no new module type needed. Note that the admin's list-field rows have no built-in way to color-code by a field value or combine multiple fields into the collapsed summary — the summary is always just "whatever's in the first text field" — so if you want a specific field visible at a glance, put it in that first field directly (as §5 does with dates in the title).

## 11. CSS & asset conventions (important quirks)

- **Put all CSS in `custom.css`.** Don't scatter `<style>` blocks.
- **Comment non-obvious rules inline, right above them** — not in a separate doc. If a rule's effect isn't clear from its selector/properties alone (it depends on a specific frontmatter field, it's working around a framework quirk, it only matters in combination with another rule elsewhere), say so in a `/* ... */` block right there. A comment living next to the code it explains stays accurate; a separate reference doc drifts out of sync with the code silently. The `.year-module` blockquote/flex-order block and the header-color rules at the top of `custom.css` are worked examples — both took real reverse-engineering time to figure out during the 2026-07-22 Quark 2 migration audit before they got comments.
- **A module's own injected CSS does NOT reach the page.** Stock Quark modules sometimes add CSS via `assets.addInlineCss(...)` at render time, but our custom `base.html.twig` outputs the `<head>` *before* module content runs, so that CSS is dropped. **Fix: move that CSS into `custom.css`.**
- **Frontmatter URLs are not auto-base-prefixed.** See §12.
- **Anything you insert into `base.html.twig` between the header and the hero block needs its own positioning** — don't just drop it into normal document flow. The fixed navbar (`position: fixed`) relies on the hero rendering directly behind it (for its see-through look); pushing the hero down to make room for new content breaks that. Give new content `position: absolute` with an explicit `top` offset instead (matching the header's height plus a bit of gap) so it floats over the hero rather than displacing it, and give it a `z-index` *below* the header's so the header still shows on top while scrolling past. The `site-announcement` CSS (§5) is a working example.

## 12. Portable linking conventions

Any path that hardcodes the **domain** or a **folder number** can break if a folder gets renumbered or the site ever moves hosts. Rules:

- **Internal links:** root-relative, no domain — `[text](/about-us/leadership)`. Never the full domain.
- **Page images in Markdown:** `![](filename.jpg)` (just the filename) — Grav resolves it correctly on both sites.
- **Shared images in Markdown:** `![](/user/images/x.jpg)` — Grav auto-adds the base. **But raw HTML `<img src="/...">` is NOT rewritten** — for raw HTML, add `process: { twig: true }` to the page and use `src="{{ base_url }}/user/images/x.jpg"`.
- **Frontmatter URLs rendered by a template** (e.g. menu item `url:` values, or an announcement's `link:` value) are **not** auto-prefixed either — the template must prepend `{{ base_url }}`. Our `icon-menu`, `feature-images`, and `announcements` templates were all written to do this.

## 13. How Mod Quark differs from regular Quark

Our theme **Mod Quark** (`user/themes/mod-quark/`) is a **custom child of Quark** (`user/themes/quark/`). Key differences:

- **It is hand-managed, NOT installed through Grav's package manager.** **Do not run `bin/gpm update` on it** — manage it manually via SSH / the team GitHub repo.
- **Custom module types: `icon-menu` and `feature-images`.** Quark's stock `features` (a grid of Font-Awesome icons) is customized and **renamed `icon-menu`** in our theme (its links were patched to be base-path-safe). We also added **`feature-images`** — the same idea but with **photos** (Sponsors, Mentors, Robots, etc.); its image resolution uses Grav page media so it survives folder renumbering.
- **Custom `base.html.twig`.** Our base template is a full override of Quark's, with our own header markup, our `custom.css` include (with the `?v=` cache-bust), and our own asset handling.
- **The footer is a custom partial + an editable page.** Stock Quark's footer is a throwaway credit line. Ours is `partials/footer.html.twig` (structure + logo) that pulls its content from a hidden, admin-editable `/footer` page.
- **The site-wide announcement bar is a partial, not a module.** `partials/announcements.html.twig` is included once from `base.html.twig` and reads from a hidden `announcements-data` page — see §5 and §10.
- **Some stock Quark pieces are missing.** Example: Quark's **gallery** template is present but its required `partials/lightbox.html.twig` (+ the glightbox library) was never carried over, so we supplied a minimal no-JS `lightbox.html.twig`.

## 14. Backups, rollback, and hard limits

- **Backups:** before any risky edit, copy the file: `cp file file.bak-$(date +%Y%m%d-%H%M%S)`. The live site's primary backup is Grav's own **nightly scheduled full-site backup** (7-copy rotation), run automatically via the Grav scheduler.
- **Clear the cache** after most changes: via the admin's Tools → Cache panel, or `rm -rf <gravroot>/cache/*`.
- **🔴 Never update PHP, nginx, Ubuntu, or OS packages** on either server without Rafi. A past PHP upgrade broke the live site and needed expert recovery. This is the one category that can't be safely rolled back through Grav.

---

## Appendix: Template reference

### Modular templates (the section building blocks)
The module's `.md` filename selects its template. These are what you assemble modular pages (Home, About Us…) from.

| Template | What it does | 449-custom? | Admin-selectable* |
|---|---|---|---|
| `text` | A text block, optionally with one image beside it. Also powers the Team History year-modules — see below. | modified | ✅ |
| `hero` | Full-width banner: background image + big title (top of a page). | stock Quark | ✅ |
| `icon-menu` | Grid of Font Awesome **icon** links — e.g. Leadership / Mentors / Programming. Icon values are full two-part FA classes (e.g. `fa-solid fa-users`, or `fa-brands fa-android` for logos) — the icon picker field stores whatever you pick as-is; if an icon doesn't render, the class name is probably wrong for the FA version this theme loads. | custom | ✅ |
| `feature-images` | Grid of **photo** links — Sponsors, Mentor headshots, Robots, T-shirts. `separate_links: true` makes the image link to a full-size `-original` companion file (if one exists in the page folder) while the header/caption link elsewhere instead. | custom | ✅ |
| `gallery-draggable` | Photo grid in **Page-Media drag order** (no list to edit), click-to-zoom via the no-JS lightbox partial. | custom | ✅ |
| `gallery-banners` | Single shrink-to-fit row of images, no lightbox, no titles — the homepage's Blue Alliance trophy history. Same Page-Media drag order as `gallery-draggable`. Optional per-image links via `banner_links` (matched by filename). | custom | ✅ |
| `gallery` | Lightbox photo grid from a hand-listed `items:` list in frontmatter. | stock Quark | ⚠️ no blueprint |
| `footer-col` | Internal helper: outputs only its content (used for the footer's columns). | custom | — |

\* Selectable **and** survives admin saves only if the template has a blueprint (`blueprints/modular/NAME.yaml`) — see §10.

**`text` module fields worth knowing:**
- `image_align: left` / `right` — **mostly cosmetic today.** It only shifts the text column's left padding by 30px; there's no CSS rule that actually swaps which side the image renders on. Not a bug worth chasing unless someone wants to finish the feature — just don't expect picking "left" to visibly move the image.
- `year_bar: '2025-26'` + `class: year-module` (both frontmatter-only, set together) — turns the module into a Team History year entry: a big year label + "Back to top" link + rule above the content, and the module's `<blockquote>`s render as label:value stat rows (`**Record:**` etc.) instead of plain quotes. The image/text side-by-side layout for these specifically comes from CSS flex `order`, not from `image_align` — see the comment block above `.year-module` in `custom.css`. Look at any page under `about-us/history/` for a working example.

### Page templates (whole-page types)
Set the type of a *top-level* page.

| Template | What it does |
|---|---|
| `default` | A standard single content page. |
| `modular` | A page assembled by stacking the modular templates above (Home, About Us). |
| `item` | A single blog post / article page. |
| `blog` | A blog index / listing page. |
| `error` | The 404 / error page. Content is a real custom page (`user/pages/11.error/`) with a photo and a "Team 404" joke, not Grav's generic error text — edit that page's content directly to change it. |
| `comments` | Stock Quark comments listing — effectively unused. |
| `announcements-data` | Not a visible page — a hidden data store for the announcements (§5), edited via its own **Announcements** tab rather than normal content fields. |

---

*Questions: Brad (brad at navybook.com). Server/infrastructure: Rafi Pedersen. See also `CHANGELOG.md` (the change history) and `RUNBOOK.md` (deeper ops detail and gotchas) at the repo root.*
