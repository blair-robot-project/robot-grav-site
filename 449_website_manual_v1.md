# FRC 449 Website — Teammate Instruction Manual

**Version 1.0 · Last updated 2026-06-11**

This manual is in two parts:

- **Part 1 — For Everyone** covers everything you can do through the **admin panel** in a web browser: understanding how the site is built, and updating **text** and **images**.
- **Part 2 — For Power Users** covers the things you can only do with **SSH and CSS**, and how our custom theme ("Mod Quark") differs from stock Quark.

> **Two sites, never confuse them.**
> - **Staging (practice/sandbox):** `http://navybook.com/449` — a full clone where we try changes safely. **Do your experimenting here.**
> - **Live (real site):** `https://robot.mbhs.edu` — the public site. Only apply changes here after they're validated on staging.
> The admin panels are at `…/admin` on each (e.g. `http://navybook.com/449/admin`).

---

# Part 1 — For Everyone

## 1. Site basics

Our site runs on **[Grav](https://getgrav.org/)**. Unlike some CMSes, there is no database — the entire website is just files and folders. That makes it simple and very backup-friendly.

Three words you'll hear constantly:

- **Folder** — the container on disk. Can be either:
  - **Page** — a folder that Grav turns into a web address (URL). The folder `02.ABOUT-US` becomes the page at `/about-us`. Inside it is a markdown file (e.g. `default.md`, `modular.md`) that holds the content.
  - **Module** — a "building block" that is **not** its own web address. Modules are stacked to build a page (a **modular page**). Our Home and About Us pages are modular pages: the hero banner, each text block, each photo menu, the gallery — those are all separate modules assembled into one page. Their names begin with a **leading underscore** (like `_mission`).
  

**Why this matters:** when you want to edit "the mission statement on the About Us page," you're really editing the **`_mission` module** *inside* the About Us page — not the About Us page itself. In the admin Pages list, click the parent page to expand it and you'll see its modules underneath.

**Labels in the admin panel**: Each item has an icon (page for a Page, Lego brick for a module), a title in **bold**, and a filename in small roman. Set the title on the Advanced tab at Overrides/Menu; you can change it. *Note: Don't change it for Pages that are in the top navbar*; the Menu field controls how the page shows up in the navbar. 

### Logging in
Go to `http://navybook.com/449/admin` (staging) or `https://robot.mbhs.edu/admin` (live) and sign in. On the left you'll see **Pages**, **Configuration**, **Plugins**, **Themes**, etc. You'll spend almost all your time in **Pages**.

> Your access level (Editor / Onboarder / Admin) controls what you can do. Most people should be **Editor**. Ask Brad or Rafi if you need more.

## 2. Text

1. In the admin, click **Pages**.
2. Navigate to the page. For a **modular page** (Home, About Us…), click it to expand and find the **module** that holds the text you want (e.g. `_mission`, `_2025-26`).
3. Click the module to open it. Edit the **Content** box.
4. Click **Save** (top right).

The Content box uses **Markdown** — a simple way to format text:

| You type | You get |
|---|---|
| `## Heading` | A heading (more `#` = smaller) |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `* item` (line start) | a bullet point |
| `[click here](/about-us)` | a link |
| `<br>` | a line break |

You can also use HTML; that's often the best way to achieve a certain effect in a single module. (See, e.g. the Content in [_home_top_text](https://navybook.com/449/admin/pages/home/_home_top_text))

**Leaving notes for other editors:** type `[//]: # (your note here)` in the Content box. It shows for editors but never appears on the public page. (We use this — e.g., the Footer and [home/gallery](https://navybook.com/449/admin/pages/home/_gallery) modules have notes explaining how they work.)

> **Don't use the `</>` button** in the editor toolbar — it's broken in our admin and does nothing. Just type in the normal editor.

## 3. Images

Images live in a few places depending on what they are. Here's how to find each:

### a) An image next to a block of text
Open the module. Scroll to **Page Media** (below the Content box). **Drag a new image in** to upload, or delete the old one. The **first image** listed is the one shown next to the content.

### b) Hero images (the big image behind a page title)
The hero image is set in the module's **frontmatter** (a settings block), not Page Media — so it usually needs a Power User (Part 2). Upload the new image to the module's Page Media, then ask someone to point the hero at it.

### c) The icon/photo "menus"
These are **icon-menu** modules (Font-Awesome icon menus) or **feature-images** modules (photo menus). The list of items lives in **frontmatter** — see Part 2. You *can* upload the images via Page Media, but wiring them into the menu is a Power-User step.

### d) The home-page photo gallery
Open the **gallery** module (Home → expand → gallery). It uses the **`gallery-draggable`** template, which shows **every** image in its Page Media in the **order they appear there** — so:
- **Add a photo:** drag it into **Page Media**.
- **Remove a photo:** delete it from Page Media.
- **Reorder:** drag the thumbnails in Page Media into the order you want.

No need to pre-shrink or rename — `image-intake` auto-resizes and sanitizes on upload.
- **Caption:** any normal text you type in the gallery's **Content** box appears as a caption centered below the photos. (The `[//]: #` notes already in there don't show — only your own text does.)

### Image uploads are auto-handled (the `image-intake` plugin)
Every image you upload is automatically **resized** to a sensible max width for its context (gallery 1200 px, hero 2560 px, sponsor/mentor grids 800 px, else 2000 px) and its **filename sanitized** (spaces/odd characters → hyphens, lowercased) — the giant original is discarded. So you can drag in full-size photos with messy names and it just works. *(On staging now; rolling out to live.)*

## 4. Creating a page or module

1. In [Pages (Admin)](https://navybook.com/449/admin/pages), navigate to where you want the new thing to go. (You can move it later if you don't get it right.)  In the top navbar, click the down-arrow next to "Add" and pick Folder/Page/Module.
2. A pop-up window will appear. Type the title: [Template-type]: [one- or two-word description]
3. Try to pick the right Page or Parent Page.
4. Choose a template.
5. The new thing's setting panel will appear. Change "Advanced/Ordering/Folder Numeric Prefix" to "Enabled". Check "Advanced/Overrides/Menu" and add a display title in the field. Hit Save.
6. Add whatever Content or Features you want. Hit Save.

## 5. Gotchas everyone should know

- **The `</>` source toggle is broken.** Don't use it.
- **You can't create new modules from the admin.** The "Add" button can make ordinary pages but not the modular building blocks (text/hero/icon-menu/gallery). Adding a module is a Power-User (SSH) task.
- **Ignore "update available" prompts** for plugins and themes. Updating has broken the site before. Leave them alone unless Rafi says otherwise.
- **Frontmatter isn't editable in the normal editor.** Settings like image alignment, hero images, and menu/gallery item lists live in "frontmatter," which the broken `</>` button can't reach. Those are Part 2.
- **Work on staging first.** Never make a change directly on the live site that hasn't been tried on `navybook.com/449`.

---

# Part 2 — For Power Users (SSH + CSS)

This part assumes you're comfortable with a command line and basic CSS. It covers what you **can't** do through the admin.

## 5. Getting in and where things live

**SSH:**
- Staging: `ssh USER@navybook.com` — Grav root: `~/navybook.com/449/`
- Live: `ssh <you>@robot.mbhs.edu` — Grav root: `/srv/robot-grav-site/`

**Key paths** (relative to the Grav root):

| What | Path |
|---|---|
| All page content | `user/pages/` |
| Active theme | `user/themes/mod-quark/` |
| Custom CSS | `user/themes/mod-quark/css/custom.css` |
| Base HTML template | `user/themes/mod-quark/templates/partials/base.html.twig` |
| Module templates | `user/themes/mod-quark/templates/modular/` |
| System config | `user/config/system.yaml` |

A page on disk: `user/pages/02.ABOUT-US/05._2025-26/text.md`. The `---` block at the top of a `.md` file is the **frontmatter** (YAML settings); below it is the **content** (Markdown).

## 6. Things you can only do over SSH

### Edit frontmatter
Anything not in the admin form lives here: `image_align`, `hero_image`, gallery `items:`, `features:`, redirects, etc. Edit the `.md` file directly. For multi-line edits over SSH, **use Python, not `sed`** (sed doesn't do multi-line reliably):
```bash
cat << 'EOF' | ssh USER@navybook.com python3
p='/home/USER/navybook.com/449/user/pages/.../text.md'
c=open(p).read()
c=c.replace('old','new')
open(p,'w').write(c)
EOF
```

### Create a new module
The admin can't do this. **Clone an existing module folder** and edit it:
```bash
cd ~/navybook.com/449/user/pages/01.HOME
cp -r 02._highlights 04._newthing      # copy a similar module
# edit 04._newthing/*.md ; renumber the prefix to set order
```
The result is a normal module you can then edit in the admin. (Folders starting with `_` after the number prefix are modules; the `.md` filename = the template it uses.)

### Edit CSS — and clear BOTH caches
All custom styling goes in **`custom.css`**. After editing CSS you must do **two** things or you won't see your change:
1. **Clear Grav's cache:** `rm -rf ~/navybook.com/449/cache/*`
2. **Bust the browser cache:** bump the version number in `base.html.twig` — find `custom.css?v=NN` and increment `NN`.

Verify with `curl` to tell the two caches apart:
```bash
curl -s "https://navybook.com/449/user/themes/mod-quark/css/custom.css?v=NN" | grep <your-rule>
```
If curl shows the new value but your browser doesn't, it's *browser* cache — bump `?v=`.

### Edit templates / partials
Layout and structure live in `templates/`. The footer, header, and how modules render are here. Back up before editing: `cp file file.bak-$(date +%Y%m%d)`.

## 7. CSS & asset conventions (important quirks)

- **Put all CSS in `custom.css`.** Don't scatter `<style>` blocks.
- **A module's own injected CSS does NOT reach the page.** Stock Quark modules sometimes add CSS via `assets.addInlineCss(...)` at render time, but our custom `base.html.twig` outputs the `<head>` *before* module content runs, so that CSS is dropped. (This bit us with the gallery — its grid CSS never loaded.) **Fix: move that CSS into `custom.css`.**
- **Frontmatter URLs are not auto-base-prefixed.** See §8.

## 8. Round-trip-safe linking (staging ↔ live)

Staging lives under a subfolder (`/449`); live is at the root (`/`). Any path that hardcodes the **domain**, the **`/449`**, or a **folder number** will break on one side. Rules:

- **Internal links:** root-relative, no domain — `[text](/about-us/leadership)`. Never `https://robot.mbhs.edu/...`, never `/449/...`.
- **Page images in Markdown:** `![](filename.jpg)` (just the filename) — Grav resolves it correctly on both sites.
- **Shared images in Markdown:** `![](/user/images/x.jpg)` — Grav auto-adds the base. **But raw HTML `<img src="/...">` is NOT rewritten** — for raw HTML, add `process: { twig: true }` to the page and use `src="{{ base_url }}/user/images/x.jpg"`.
- **Frontmatter URLs rendered by a template** (e.g. menu item `url:` values) are **not** auto-prefixed either — the template must prepend `{{ base_url }}`. Our `icon-menu` and `feature-images` templates were patched to do this.

> **Porting to live:** remember that theme files (CSS, templates, partials) and content (pages) are separate. A fix in a template won't take effect on live unless you carry the template over too.

## 9. How Mod Quark differs from regular Quark

Our theme **Mod Quark** (`user/themes/mod-quark/`) is a **custom child of Quark** (`user/themes/quark/`). Key differences:

- **It is hand-managed, NOT installed through Grav's package manager.** **Do not run `bin/gpm update` on it** — manage it manually via SSH / the team GitHub repo. Because it's hand-managed, it can **drift** from a clean Quark release (files can be missing — see the gallery note below).
- **Custom module types: `icon-menu` and `feature-images`.** Quark's stock `features` (a grid of Font-Awesome icons) is customized and **renamed `icon-menu`** in our theme (its links were patched to be base-path-safe). We also added **`feature-images`** — the same idea but with **photos** (Sponsors, Mentors, Robots, etc.); its image resolution uses Grav page media so it survives folder renumbering and the staging↔live move.
- **Custom `base.html.twig`.** Our base template is a full override of Quark's, with our own header markup, our `custom.css` include (with the `?v=` cache-bust), and our own asset handling. (This override is also why injected module CSS doesn't reach the page — see §7.)
- **The footer is a custom partial + an editable page.** Stock Quark's footer is a throwaway credit line. Ours is `partials/footer.html.twig` (structure + logo) that pulls its content from a hidden, admin-editable `/footer` page (title = heading; modules `_contact` / `_resources` = the columns). Edit footer *text/links* in the admin; edit footer *layout* in the partial.
- **Some stock Quark pieces are missing.** Example: Quark's **gallery** template is present but its required `partials/lightbox.html.twig` (+ the glightbox library) was never carried over, so we supplied a minimal no-JS `lightbox.html.twig`. Expect to occasionally find a stock feature that needs a missing dependency supplied.

## 10. Backups, rollback, and hard limits

- **Backups:** before any risky edit, copy the file: `cp file file.bak-$(date +%Y%m%d-%H%M%S)`. The live site also has a **daily automated backup to the team GitHub** (fastest rollback), plus point-in-time zip/tar backups.
- **Clear the cache** after most changes: `rm -rf <gravroot>/cache/*`.
- **🔴 Never update PHP, nginx, Ubuntu, or OS packages** on either server without Rafi. A past PHP upgrade broke the live site and needed expert recovery. This is the one category that can't be safely rolled back through Grav.
- **Staging → test → live**, always in that order.

---

## Appendix: Template reference

### Modular templates (the section building blocks)
The module's `.md` filename selects its template. These are what you assemble modular pages (Home, About Us…) from.

| Template | What it does | 449-custom? | Admin-selectable* |
|---|---|---|---|
| `text` | A text block, optionally with one image beside it (left/right). | modified | ✅ |
| `hero` | Full-width banner: background image + big title (top of a page). | stock Quark | ✅ |
| `icon-menu` | Grid of Font Awesome **icon** links — e.g. Leadership / Mentors / Programming. | custom | ✅ |
| `feature-images` | Grid of **photo** links — Sponsors, Mentor headshots, Robots, T-shirts. | custom | ✅ |
| `gallery-draggable` | Photo grid in **Page-Media drag order** (no list to edit). Shows in admin as "Gallery (drag to reorder)". | custom | ✅ |
| `gallery` | Lightbox photo grid from a hand-listed `items:` list in frontmatter. | stock Quark | ⚠️ no blueprint |
| `footer-col` | Internal helper: outputs only its content (used for the footer's columns). | custom | — |

\* Selectable **and** survives admin saves only if the template has a blueprint (`blueprints/modular/NAME.yaml`).

### Page templates (whole-page types)
Set the type of a *top-level* page.

| Template | What it does |
|---|---|
| `default` | A standard single content page. |
| `modular` | A page assembled by stacking the modular templates above (Home, About Us). |
| `item` | A single blog post / article page. |
| `blog` | A blog index / listing page. |
| `error` | The 404 / error page. |
| `comments` | Stock Quark comments listing — effectively unused. |

**Remember:** the admin can't *create* modules (SSH-clone an existing one), and a custom modular template needs a blueprint or the admin reverts it on save.

---

*Questions: Brad (comms@navybook.com). Server/infrastructure: Rafi Pedersen. See also `CHANGELOG.md` (the change history) and `RUNBOOK.md` (deeper ops detail and gotchas) at the repo root.*
