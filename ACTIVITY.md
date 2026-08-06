# Activity Log

*Version 1.2 — 2026-07-23*

Auto-generated, append-only record of every file added, removed, or changed under `user/pages/` and `user/themes/mod-quark/` on the live server, one section per night — **newest entry at the top**. Written by a dedicated `activity-log.sh` cron — no human edits this file, and nothing in it is curated.

**This repo stays documentation-only.** This file does not re-introduce git-tracking of live site content (that model was retired with the Grav 1.7 → 2.0 migration — see `archive/` for the frozen pre-migration snapshot, and RUNBOOK.md for why). Full-file recovery is Grav's own nightly full-site backup, not this file. What lands here is only the *text of the diff itself* — the same way a changelog entry is text about a change, not the change. The mechanism: a local, unpushed shadow copy of `user/pages/` and `user/themes/mod-quark/` is diffed against the live directories each night, the diff text is inserted at the top of this file, and the shadow is refreshed to match live for tomorrow's comparison. Nothing about the shadow copy or the comparison touches GitHub — only this file's text does.

This is **not** a replacement for `CHANGES.md` or `RUNBOOK.md`. Those stay for deliberate, human-written decisions (structural changes, migrations, fixes worth explaining). This file exists so that a change made by anyone — including a student SSHed in editing a `.twig` file directly, with no admin panel and no expectation they'll describe anything — still shows up somewhere with a real diff behind it. If a night's entry turns out to matter, it's worth writing a proper line in `CHANGES.md` and pointing back here.

Format:

```
### YYYY-MM-DD

<unified diff text, or "added"/"removed" for new or deleted files>
```

Nights with no changes get no entry — this file only grows when something actually changed. New entries are inserted directly below this line, so the top of the file is always the most recent change.

<!-- ACTIVITY-LOG:NEW-ENTRIES-BELOW -->

### 2026-08-06

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md /srv/robot-grav-site/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md
--- /srv/.activity-shadow/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md	2026-07-23 23:03:53.597078651 +0000
+++ /srv/robot-grav-site/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md	2026-08-05 18:50:07.629960749 +0000
@@ -13,7 +13,7 @@
 
 **Find our flyer [here](/media/flyers/fll-flyer-2026/flyer.pdf).**
 
-**Find more details and the application [here](https://forms.gle/c1Hs4XFMk3XrNnyG7). Applications are open until August 1st!** 
+**Applications are now closed.** 
 
 **About FLL:** [FIRST LEGO League](https://www.firstlegoleague.org) is a robotics competition for middle schoolers. Under the guidance of 449 team members, students learn to build and program a robot ([EV3 Mindstorms](https://education.lego.com/en-us/product-resources/mindstorms-ev3/downloads/building-instructions/)) to solve real-world problems. Through this experience, they develop leadership, collaboration, and technical skills!
 
```


### 2026-08-04

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/01.home/06._about/text.md /srv/robot-grav-site/user/pages/01.home/06._about/text.md
--- /srv/.activity-shadow/user/pages/01.home/06._about/text.md	2026-07-28 16:29:21.513612133 +0000
+++ /srv/robot-grav-site/user/pages/01.home/06._about/text.md	2026-08-03 15:34:29.811076241 +0000
@@ -6,7 +6,7 @@
 ---
 
 ## **What’s new**
-**August 1:** Our annual [summer classes](https://robot.mbhs.edu/community/summer-classes) start, free to students in grades K-12. Signups close July 31.
+**August 1:** Our annual [summer classes](https://robot.mbhs.edu/community/summer-classes) start, free to students in grades K-12. Signups closed July 31.
 
 **July 10-12:** We participated in Philly's [RoboJawn](https://www.thebluealliance.com/event/2026paphi1), organized by Teams [321](https://robolancers.com/) and [1218](https://www.sch.org/admissions/learn/robotics)! 
 
diff -ru /srv/.activity-shadow/user/pages/01.home/08._sponsors/feature-images.md /srv/robot-grav-site/user/pages/01.home/08._sponsors/feature-images.md
--- /srv/.activity-shadow/user/pages/01.home/08._sponsors/feature-images.md	2026-07-23 17:14:22.824022183 +0000
+++ /srv/robot-grav-site/user/pages/01.home/08._sponsors/feature-images.md	2026-08-03 21:44:38.459982968 +0000
@@ -8,7 +8,7 @@
     -
         image: logo-magnetFoundation.jpeg
         header: 'Montgomery Blair High School Magnet Foundation'
-        text: 'Diamond & Fiscal Sponsor '
+        text: 'Diamond & Fiscal Sponsor'
         url: 'http://www.mbhsmagnet.org'
     -
         image: dodstem-logo.jpg
diff -ru /srv/.activity-shadow/user/pages/02.about-us/03._menu-about/icon-menu.md /srv/robot-grav-site/user/pages/02.about-us/03._menu-about/icon-menu.md
--- /srv/.activity-shadow/user/pages/02.about-us/03._menu-about/icon-menu.md	2026-07-14 12:23:12.873206612 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/03._menu-about/icon-menu.md	2026-08-03 18:44:33.921600438 +0000
@@ -1,5 +1,5 @@
 ---
-title: 'About Us: Icon-menu: Leaders/Mentors/Programming'
+title: 'About Us: Icon menu'
 menu: 'Icon-menu: top'
 class: standard
 features:
@@ -19,6 +19,11 @@
         text: 'Learn about our programming team.'
         url: /about-us/programming
     -
+        icon: 'fa fa-bar-chart'
+        header: 'Data Science'
+        text: 'Learn about our data science team.'
+        url: /about-us/data-science
+    -
         icon: 'fa fa-history'
         header: History
         text: "Explore our team's history."
Only in /srv/robot-grav-site/user/pages/03.community/02._community-events: bobvolunteer.jpg
Only in /srv/.activity-shadow/user/pages/03.community/02._community-events: makerFaire.png
Only in /srv/.activity-shadow/user/pages/03.community/02._community-events: mkpcSciExpo2018-original.jpg
diff -ru /srv/.activity-shadow/user/pages/03.community/02._community-events/text.md /srv/robot-grav-site/user/pages/03.community/02._community-events/text.md
--- /srv/.activity-shadow/user/pages/03.community/02._community-events/text.md	2026-07-23 21:19:34.629289281 +0000
+++ /srv/robot-grav-site/user/pages/03.community/02._community-events/text.md	2026-08-03 12:35:37.563817406 +0000
@@ -1,7 +1,7 @@
 ---
 title: 'Community: Text: Events, Advocacy'
 image_align: right
-media_order: 'makerFaire.png, mkpcSciExpo2018-original.jpg, stemfair.jpg, betterdemo.jpg, dumbo.jpg'
+media_order: 'stemfair.jpg, betterdemo.jpg, dumbo.jpg, tpff.jpeg, bobvolunteer.jpg'
 menu: 'Text: Community Events'
 alt: 'Team members engaging with young visitors at a community STEM outreach event'
 ---
Only in /srv/robot-grav-site/user/pages/03.community/02._community-events: tpff.jpeg
diff -ru /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md
--- /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md	2026-07-30 19:16:01.086164214 +0000
+++ /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md	2026-08-03 18:34:43.342754430 +0000
@@ -18,7 +18,7 @@
 
 ### Sign up for summer classes! 
 
-Team 449 is dedicated to giving back to our community through education. This summer, we’ll be teaching 4 **free and virtual** classes, running from **August 1 to 23**. Hosted on Google Meet, these classes are available for **all students in grades K-12**, and will be taught by our team’s members, with a dedicated curriculum for each class. More information on each class can be found at the links below. **Signups are due July 31**.
+Team 449 is dedicated to giving back to our community through education. This summer, we’ll be teaching 4 **free and virtual** classes, running from **August 1 to 23**. Hosted on Google Meet, these classes are available for **all students in grades K-12**, and will be taught by our team’s members, with a dedicated curriculum for each class. More information on each class can be found at the links below. **Signups closed July 31**.
 
 [_Algebra 1 Bootcamp:_](https://canva.link/pt4iaq0o51jstny) Math: Introduction to Algebra 1 (generally recommended for students in grades 4-8)
 <br>August 1-22, Saturdays 11 a.m.-noon 
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md	2026-07-30 04:35:44.378488399 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md	2026-08-03 21:18:39.738818575 +0000
@@ -1,13 +1,12 @@
 ---
-arrow: noarrow
 title: 'Bunnybots-2025: Hero'
 menu: Hero
-hero_classes: hero-medium
+hero_classes: 'parallax text-light hero-large overlay-dark'
+hero_image: img_5769.jpg
 published: true
+arrow: noarrow
 ---
 
-[//]: # (NEEDS REVIEW: no hero_image set. Upload a full-resolution 2025 Bunnybots photo here and set hero_image, then add back the 'parallax text-light overlay-dark hero-large' hero classes.)
-
 # **2025 Blair Bunnybots**
 
 
Only in /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/01._top: img_5769.jpg
Only in /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing: BoeingLogo_RGB-original.png
Only in /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing: BoeingLogo_RGB.png
Only in /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing: BoeingLogo_RGB.webp
diff -ru /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing/text.md /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing/text.md
--- /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing/text.md	2026-07-19 13:04:27.704172680 +0000
+++ /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/07._boeing/text.md	2026-08-03 22:12:34.889369763 +0000
@@ -2,10 +2,10 @@
 url: 'https://www.boeing.com/'
 title: _boeing
 image_align: right
-media_order: BoeingLogo_RGB.png
+media_order: BoeingLogo_RGB.webp
 image_height: 120
 alt: 'Boeing logo'
 ---
 
 ### [Boeing](https://www.boeing.com/)
-[Gold Sponsor](/sponsor-information/sponsor-benefits#gold)
\ No newline at end of file
+[Gold Sponsor](/sponsor-information/sponsor-benefits#gold)

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/gallery-banners.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/gallery-banners.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/gallery-banners.html.twig	2026-08-03 02:53:35.392208378 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/gallery-banners.html.twig	2026-08-03 21:37:32.023155720 +0000
@@ -11,10 +11,11 @@
                     <a href="{{ banner_link.url }}"{{ banner_link.url starts with 'http' ? ' target="_blank" rel="noopener"' : '' }}>{{ image.height(400).html(alt_text, alt_text)|raw }}</a>
                 {% else %}
 		    {% if image %}
-		        {% set image = img.width > 1200 ? img.resize(1200).url : img.url %}
-	                {{ image.height(400).html(alt_text, alt_text)|raw }}
+			{% set image = img.width > 1200 ? img.resize(1200).url : img.url %}
+			{% set image = image.format("jpg") %}
+			{{ image.html(alt_text, alt_text)|raw }}
 		    {% endif %}
-	        {% endif %}
+		{% endif %}
             </div>
         {% endfor %}
     </div>
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig	2026-08-03 02:50:45.535834334 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig	2026-08-03 21:36:06.895785886 +0000
@@ -56,15 +56,15 @@
                         {% set image = page.media[image_name] %}
                         {% set _column_w = page.header.image_width|default(600) %}
                         {% if image %}
-			    {% set image = img.width > 1200 ? img.resize(1200).url : img.url %}
                             {% set _ext = image.filename|split('.')|last %}
                             {% set _base = image.basename %}
                             {% set _orig = page.media[_base ~ '-original.' ~ _ext] %}
                             {% set _full = _orig ?: image %}
                             {% set _link = page.header.url ?: _full.url %}
                             {% set _hover = page.media[_base ~ '-hover.' ~ _ext] %}
+			    {% set image = image.width > 1200 ? image.resize(1200) : image %}
                             <a href="{{ _link }}" class="gallery-thumb" target="_blank" rel="noopener" title="{{ _alt }}">
-                                <img src="{{ image.url|absolute_url }}" }}
+                                <img src="{{ image.url|absolute_url }}"
                                     {% if _hover %}
                                         onpointerenter = "this.src='{{ _hover.url|absolute_url }}';"
                                         onpointerleave = "this.src='{{ image.url|absolute_url }}';"
```


### 2026-08-03

```diff

user/pages
Only in /srv/.activity-shadow/user/pages/02.about-us: 20.SCOUTING
Only in /srv/robot-grav-site/user/pages/02.about-us: 20.data-science
Only in /srv/robot-grav-site/user/pages/02.about-us: about-usignore-this
Only in /srv/.activity-shadow/user/pages/02.about-us: data-science
diff -ru /srv/.activity-shadow/user/pages/03.community/_registration/text.md /srv/robot-grav-site/user/pages/03.community/_registration/text.md
--- /srv/.activity-shadow/user/pages/03.community/_registration/text.md	2026-07-23 21:31:51.229905929 +0000
+++ /srv/robot-grav-site/user/pages/03.community/_registration/text.md	2026-08-03 00:22:13.263823970 +0000
@@ -5,7 +5,3 @@
     lastmod: '23-07-2026 17:24'
 ---
 
-
-## Register for our [FLL Team](/community/fll-team) and [summer classes](/community/summer-classes) today! 
----
-

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/gallery-banners.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/gallery-banners.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/gallery-banners.html.twig	2026-07-18 03:43:15.633235429 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/gallery-banners.html.twig	2026-08-03 02:53:35.392208378 +0000
@@ -10,8 +10,11 @@
                 {% if banner_link %}
                     <a href="{{ banner_link.url }}"{{ banner_link.url starts with 'http' ? ' target="_blank" rel="noopener"' : '' }}>{{ image.height(400).html(alt_text, alt_text)|raw }}</a>
                 {% else %}
-                    {{ image.height(400).html(alt_text, alt_text)|raw }}
-                {% endif %}
+		    {% if image %}
+		        {% set image = img.width > 1200 ? img.resize(1200).url : img.url %}
+	                {{ image.height(400).html(alt_text, alt_text)|raw }}
+		    {% endif %}
+	        {% endif %}
             </div>
         {% endfor %}
     </div>
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: gallery-banners.html.twig.bak-20260803-025220
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-31 00:00:36.239535673 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig	2026-08-03 02:50:45.535834334 +0000
@@ -56,6 +56,7 @@
                         {% set image = page.media[image_name] %}
                         {% set _column_w = page.header.image_width|default(600) %}
                         {% if image %}
+			    {% set image = img.width > 1200 ? img.resize(1200).url : img.url %}
                             {% set _ext = image.filename|split('.')|last %}
                             {% set _base = image.basename %}
                             {% set _orig = page.media[_base ~ '-original.' ~ _ext] %}
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: text.html.twig.bak-20260803-024205
```


### 2026-08-01

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/02.about-us/02._mission/text.md /srv/robot-grav-site/user/pages/02.about-us/02._mission/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/02._mission/text.md	2026-06-27 20:56:30.867525281 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/02._mission/text.md	2026-07-31 06:10:21.428095704 +0000
@@ -12,7 +12,7 @@
 
 By competing in FRC, we enable students to **tackle complex technical problems in a collaborative environment**. Our student-led, mentor-guided team keeps students at the forefront of decision-making, project leadership, and execution.  
 
-We also **[work in the community](/community)** to encourage youth to pursue degrees and careers in STEM. 449 members teach practical courses, create and attend outreach events, teach practical courses, mentor teams, and share their knowledge and resources in person and online.
+We also **[work in the community](/community)** to encourage youth to pursue degrees and careers in STEM. 449 members create and attend outreach events, teach practical courses, mentor teams, and share their knowledge and resources in person and online.
 
 ##About ![Logo%20Primary](Logo%20Primary.svg "Logo%20Primary")
 > _[FIRST](https://www.firstinspires.org)_ (For Inspiration and Recognition of Science and Technology) was founded in 1989 to inspire young people to be science and technology leaders and innovators. It fosters mentor-based programs that build science, engineering, and technology skills; inspire innovation; and teach self-confidence, communication, and leadership.
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/05._history-top/text.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/05._history-top/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/05._history-top/text.md	2026-07-14 12:15:01.230237719 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/05._history-top/text.md	2026-07-31 15:01:06.421496161 +0000
@@ -14,4 +14,4 @@
 
 FRC Team 449 first competed in **2000**, and went all the way to the National Championship. We notched our first  event win in **2004**. In **2018**, we hosted our first [Bunnybots](/bunnybots). When COVID-19 ended the **2020** season early, we started Pandemic Programming, offering a full coding curriculum taught by 449 members to K-12 students anywhere. We received a _FIRST_ Impact Award in **2021** (well, it was called Chairman’s Award back then; we’d win another in **2024**). In **2022**, we started our [_FIRST_ Lego League team](/community/fll-team) for elementary and middle schoolers. And in **2025** and **2026**, we became back-to-back winners of the _FIRST_ Chesapeake championship.
 
-Scroll down for more. And find our **[full competition history](https://www.thebluealliance.com/team/449/history)** at The Blue Alliance.
+Scroll down for year-by-year details. And find our **[full competition history](https://www.thebluealliance.com/team/449/history)** at The Blue Alliance.
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/06._historygallery-top/gallery-draggable.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/06._historygallery-top/gallery-draggable.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/06._historygallery-top/gallery-draggable.md	2026-07-14 12:14:22.480750747 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/06._historygallery-top/gallery-draggable.md	2026-07-31 15:18:22.286013817 +0000
@@ -16,4 +16,4 @@
 [//]: # (Add photos in the Page Media box below — drag them in or click to upload. They are resized automatically. Click Save.)
 [//]: # (* To set the display order, use the Page Media box's own Reorder toggle to drag photos into place. Click Save.)
 [//]: # (* To remove a photo, delete it from the Page Media box by clicking its bottom-right "x" button. Click Save.)
-2001's robot  |  Robot and crew, 2003  |  2004's robot at work  |  449's first blue banner
\ No newline at end of file
+Robot, 2001&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Robot and crew, 2003&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Robot at work, 2004&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Our [first blue banner](https://www.thebluealliance.com/event/2004md), 2004
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md
--- /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md	2026-07-31 00:25:02.421136471 +0000
+++ /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md	2026-08-01 01:06:25.140596180 +0000
@@ -9,6 +9,8 @@
 
 Explore Team 449's public [GitHub repositories](https://github.com/blair-robot-project) for our robot code and tools.
 
+Explore our [Electronics Parts Reference](https://docs.google.com/spreadsheets/d/1IpaLFMFgdSNxcpry_hkP5m_wsyTGMwhZ-DhQY5H5RsU/edit?usp=drivesdk).
+
 ##Whitepapers
 
 - [Flywheel Shot Analysis: Correction and
diff -ru /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md
--- /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md	2026-07-24 16:02:55.543364247 +0000
+++ /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md	2026-07-31 18:06:55.363884188 +0000
@@ -11,19 +11,19 @@
         start_date: '08-07-2026 12:00'
         end_date: '02-08-2026 00:01'
         level: blue
-        published: 0
+        published: 1
     -
         title: 'watch the Worlds 2026 video (displays 8/2-8/28)'
         level: blue
         message: 'Have you seen the video about our trip to 2026 Worlds?'
         link: 'https://www.youtube.com/watch?v=ckc5bD1HF1M'
-        start_date: '02-08-2026 00:02'
+        start_date: '2026-08-02 01:00'
         end_date: '28-08-2026 12:00'
     -
         title: 'Summer classes signup (7/23-7/31)'
         message: 'Register for our FLL team and summer classes today!'
         start_date: ''
-        end_date: '2026-07-31 12:00'
+        end_date: '2026-07-31 12:59'
         level: blue
         link: /community
 visible: false
```


### 2026-07-31

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/01.home/03._home_top_text-2/text.md /srv/robot-grav-site/user/pages/01.home/03._home_top_text-2/text.md
--- /srv/.activity-shadow/user/pages/01.home/03._home_top_text-2/text.md	2026-07-10 18:20:19.113659252 +0000
+++ /srv/robot-grav-site/user/pages/01.home/03._home_top_text-2/text.md	2026-07-30 23:23:23.885212557 +0000
@@ -9,5 +9,5 @@
 
 <p style="text-align: center;"><strong><a href="https://www.thebluealliance.com/team/449/history">Nine Worlds appearances</a> | <a href="https://www.thebluealliance.com/team/449/history">Eight District Event victories</a>
     <br><a href="https://www.thebluealliance.com/team/449/history">23 District Awards</a></strong>, including two <strong><a href="https://www.firstinspires.org/resources/library/frc/fia-resources"><em>FIRST</em> Impact/Chairman's Awards</a></strong>
-    <br>One <a href="https://www.woodieflowers.org/">Woodie Flowers Finalist</a> | Three <a href="https://www.firstinspires.org/resources/library/frc/submitted-awards#fla">Dean's List Finalists</a>
+    <br>One <a href="https://www.woodieflowers.org/">Woodie Flowers Finalist</a> | Three <a href="https://www.firstinspires.org/resources/library/frc/submitted-awards#fla">FIRST Leadership Award Finalists</a>
     <br><br><strong>Host of the annual <a href="/bunnybots">Blair Bunnybots</a> | Mentors to <a href="/community/fll-team">FIRST LEGO League Team 57535</a></strong></p>
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/26._frc-2015/text.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/26._frc-2015/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/26._frc-2015/text.md	2026-07-15 07:17:03.245087017 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/26._frc-2015/text.md	2026-07-30 03:23:05.487909156 +0000
@@ -7,6 +7,7 @@
 media_order: '2015-robot-screenshot-2026-07-15-at-3-12-52-am.png, 2015-outreach-cdio743wyaeoaoc.jpeg'
 ---
 
+Read our 2015 FRC [build blog](https://blairrobotproject.wordpress.com/)!
 > **2015 FRC Game** [Recycle Rush](https://firstfrc.blob.core.windows.net/frcarchive/2015/2015-game-manual.pdf)
 
 ## Totedile
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/33._frc-2008/text.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/33._frc-2008/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/33._frc-2008/text.md	2026-07-15 06:32:10.690261188 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/33._frc-2008/text.md	2026-07-30 14:18:17.002216939 +0000
@@ -4,7 +4,7 @@
 menu: frc-2008
 year_bar: 2007-08
 class: year-module
-media_order: 'scissorhands.jpg, 2008-1382289165_bf7c8083f4_m.jpg, 2008-robot-2210501159_cab84bc21d.jpg'
+media_order: 'scissorhands.jpg, 2008-robot-2210501159_cab84bc21d.jpg'
 ---
 
 > **2008 FRC Game** [FIRST Overdrive](https://firstfrc.blob.core.windows.net/frcarchive/2008-game-manual.pdf)
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/33._frc-2008: text.md.bak-20260730-141653
Only in /srv/.activity-shadow/user/pages/02.about-us/21.PROGRAMMING/02._gallery-programming: gallery-draggable.md.bak-20260702-222314
diff -ru /srv/.activity-shadow/user/pages/02.about-us/21.PROGRAMMING/03._programming/text.md /srv/robot-grav-site/user/pages/02.about-us/21.PROGRAMMING/03._programming/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/21.PROGRAMMING/03._programming/text.md	2026-06-27 21:18:48.771541462 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/21.PROGRAMMING/03._programming/text.md	2026-07-31 00:03:07.653421066 +0000
@@ -5,7 +5,7 @@
 menu: 'Text: Top'
 ---
 
-Team 449 is a **leader in FRC programming.** We have pioneered **drivetrain characterization**, writing a 2017 [white paper](https://www.chiefdelphi.com/t/paper-frc-drivetrain-characterization/160915) that has become the standard for robot feedforwards. We have developed **gyroscopically stabilized drive code** and **automatic shifting**. In recent years, we have optimized our robots' movement based on detected game pieces and its current position, and we have developed features such as **auto-alignment**, making driving smooth and efficient. All this has led to **Innovation in Controls awards **in [2012](https://www.thebluealliance.com/event/2012dc#awards), [2017](https://www.thebluealliance.com/event/2017mdbet#awards), [2018](https://www.thebluealliance.com/event/2018mdedg#awards), and [2024](https://www.thebluealliance.com/event/2024mdowi#awards). 
+Team 449 is a **leader in FRC programming.** We have pioneered **drivetrain characterization**, writing a 2017 [white paper](https://www.chiefdelphi.com/t/paper-frc-drivetrain-characterization/160915) that has become the standard for robot feedforwards. We have developed **gyroscopically stabilized drive code** and **automatic shifting**. In recent years, we have optimized our robots' movement based on detected game pieces and its current position, and we have developed features such as **auto-alignment**, making driving smooth and efficient. All this has led to **Innovation in Control** awards in [2012](https://www.thebluealliance.com/event/2012dc#awards), [2017](https://www.thebluealliance.com/event/2017mdbet#awards), [2018](https://www.thebluealliance.com/event/2018mdedg#awards), and [2024](https://www.thebluealliance.com/event/2024mdowi#awards). 
 
 **Check out our code! **Here's our [Github](https://github.com/blair-robot-project). 
 
@@ -13,4 +13,4 @@
 
 During our off-season, **we teach our rookies** Kotlin and robot code through having them program our rookie [Bunnybot](/bunnybots), giving them slideshow lessons and projects that mirror a real FRC season. This allows them to be familiar with FRC code and our codebase before the season even starts. 
 
-We have also **taught programming courses to other students** of all ages. This started with Pandemic Programming in 2020, and has evolved to BlairBytes, an in-person initiative that helps students learn Java, Python, and Scratch. 
\ No newline at end of file
+We have also **[taught programming courses](/community/summer-classes) to other students** of all ages. This started with Pandemic Programming in 2020, and has evolved to BlairBytes, an in-person initiative that helps students learn Java, Python, and Scratch. 
\ No newline at end of file
Only in /srv/.activity-shadow/user/pages/03.community/04.fll-team/03._gallery-draggable-fll: gallery-draggable.md.bak-20260702-222314
diff -ru /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md
--- /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md	2026-07-28 02:39:04.004412302 +0000
+++ /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md	2026-07-30 19:16:01.086164214 +0000
@@ -26,8 +26,8 @@
 [_Python PROgramming:_](https://canva.link/547xxkg3dhrrjin) Python: general programming for complete beginners
 <br>August 1-22, Saturdays 2-3 p.m.
 
-[_CAD Basics:_](https://canva.link/lp7iar9pjqf36ki) Computer-Aided Design (CAD) Onshape for beginners
+[_CAD Basics:_](https://canva.link/b3gfysayt4yo5ju) Computer-Aided Design (CAD) Onshape for beginners
 <br>August 2-23, Sundays 11 a.m.-noon
 
-[_Scratch Simplified:_](https://canva.link/b3gfysayt4yo5ju) Scratch: block-based visual programming for complete beginners
+[_Scratch Simplified:_](https://canva.link/lp7iar9pjqf36ki) Scratch: block-based visual programming for complete beginners
 <br>August 2-23, Sundays 2-3 p.m.
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/02._bunnybots-intro/text.md /srv/robot-grav-site/user/pages/04.bunnybots/02._bunnybots-intro/text.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/02._bunnybots-intro/text.md	2026-06-27 21:01:52.788074494 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/02._bunnybots-intro/text.md	2026-07-30 21:57:33.631484086 +0000
@@ -7,4 +7,6 @@
 
 **Blair Bunnybots**, our annual off-season FRC-style event, is designed to welcome new members of teams into the _FIRST_ community and to help them develop their skills. The 3-month build season ends with a day of competition that allows new members to show off their work and have fun at an event just for them. The 2025-26 event—our eighth—drew 18 teams from across the Chesapeake region. 
 
-With Blair Bunnybots, we aim to exemplify a culture of healthy competition, kindness, and cooperation. The event embodies the spirit of [Gracious Professionalism](https://ftc-docs.firstinspires.org/en/latest/gracious_professionalism/gp.html) while recognizing the value in teamwork and community. Perhaps most importantly, in demonstrating first-hand the excitement of competition robotics, Blair Bunnybots lights and fuels a lasting passion in participating youth so they keep coming back for more robotics and STEM learning.
\ No newline at end of file
+With Blair Bunnybots, we aim to exemplify a culture of healthy competition, kindness, and cooperation. The event embodies the spirit of [Gracious Professionalism](https://ftc-docs.firstinspires.org/en/latest/gracious_professionalism/gp.html) while recognizing the value in teamwork and community. Perhaps most importantly, in demonstrating first-hand the excitement of competition robotics, Blair Bunnybots lights and fuels a lasting passion in participating youth so they keep coming back for more robotics and STEM learning.
+
+See our 2025 Bunnybots page [here](/bunnybots/bunnybots-2025).
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/04._register/icon-menu.md /srv/robot-grav-site/user/pages/04.bunnybots/04._register/icon-menu.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/04._register/icon-menu.md	2026-07-28 19:14:53.106376650 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/04._register/icon-menu.md	2026-07-30 06:11:45.489186437 +0000
@@ -8,16 +8,20 @@
 menu: 'Text: 2025 Bunnybots'
 ---
 
-[Game Manual v1.0 - Coming Soon](/bunnybots?classes=nounderline,disabled,button,btn-block)
+[2026 Game Manual v1.0 - Coming Soon](/bunnybots?classes=nounderline,disabled,button,btn-block)
 
-#2026 Registration
 ---
+
+##2026 Registration
+
 [Team Registration - Opening Soon](/bunnybots?classes=nounderline,disabled,button,btn-block) <br>
 [Volunteer Registration - Opening Soon](/bunnybots?classes=nounderline,disabled,button,btn-block)
 
+---
+
 ### Participants
 Paid & Confirmed Teams in **Bold** <br>
 
-**[FRC 449](/) - The Blair Robot Project (2 robots)** <br>
+**[FRC 449](/): The Blair Robot Project (2 robots)** <br>
 
 ---
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md	2026-07-30 02:51:30.621908761 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/01._top/hero.md	2026-07-30 04:35:44.378488399 +0000
@@ -6,7 +6,7 @@
 published: true
 ---
 
-[//]: # (NEEDS REVIEW: no hero_image set. The only confirmed 2025-event photos on the server are the four 600px images in /bunnybots/_bunnybots_gallery -- too small for a hero background. The high-res photos in /bunnybots/_top are EXIF-dated 2024-12-07 and 2021-12-18, so they are NOT from this event. To finish: upload a full-resolution 2025 Bunnybots photo here and set hero_image, then add back the 'parallax text-light overlay-dark' hero classes.)
+[//]: # (NEEDS REVIEW: no hero_image set. Upload a full-resolution 2025 Bunnybots photo here and set hero_image, then add back the 'parallax text-light overlay-dark hero-large' hero classes.)
 
 # **2025 Blair Bunnybots**
 
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/02._text/text.md /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/02._text/text.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/06.bunnybots-2025/02._text/text.md	2026-07-30 03:02:56.043246748 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/06.bunnybots-2025/02._text/text.md	2026-07-30 17:44:48.904919382 +0000
@@ -6,7 +6,7 @@
 published: true
 ---
 
-[//]: # (Restored verbatim 2026-07-29 from the pre-deletion version of /bunnybots/_register, EXCEPT for 5 participant links: FRC 5115, 5338, 5549, 8726 and 9033 originally pointed at team sites that are now dead -- wheatonrobotics.com, team5338.org, frc5549.org, cryptohawks8726.com all NXDOMAIN, ocebots.com fails TLS -- and were swapped for thebluealliance.com/team/NNNN on 2026-07-29, matching the pattern already used for 2988, 5353 and 8230. All 5 team numbers and nicknames were verified against the TBA API v3 first. See CHANGELOG.)
+[//]: # (Restored verbatim 2026-07-29 from the pre-deletion version of /bunnybots/_register. Some missing team websites updated; others replaced with TBA profiles.)
 
 ## 2025 Bunnybots 
 [plugin:youtube](https://youtu.be/8z1tBnxV6zw)
@@ -28,13 +28,13 @@
 [FRC 4821](https://cyberus4821.weebly.com/): CyberUs<br>
 [FRC 5115](https://www.thebluealliance.com/team/5115): Knight Riders<br>
 [FRC 5243](https://centrevillerobotics.com/aegis-robotics): AEGIS<br>
-[FRC 5338](https://www.thebluealliance.com/team/5338): RoboLoCo<br>
-[FRC 5353](https://www.thebluealliance.com/team/5353): ACL Raptors<br>
-[FRC 5549](https://www.thebluealliance.com/team/5549): Gryphon Robotics<br>
+[FRC 5338](https://blogs.lcps.org/roboloco/): RoboLoCo<br>
+[FRC 5353](https://blogs.lcps.org/roboloco/): ACL Raptors<br>
+[FRC 5549](https://frc5549.squarespace.com/): Gryphon Robotics<br>
 [FRC 5587](https://www.frc5587.org/): Titan Robotics<br>
-[FRC 8230](https://www.thebluealliance.com/team/8230): KoiBots<br>
+[FRC 8230](https://koibots.com/): KoiBots<br>
 [FRC 8592](https://frc8592.novalabsrobotics.org/): Newton Squared<br>
-[FRC 8726](https://www.thebluealliance.com/team/8726): CryptoHawks<br>
+[FRC 8726](https://frc8726.org/index.html): CryptoHawks<br>
 [FRC 9033](https://www.thebluealliance.com/team/9033): Ocebots
 
 ---
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md
--- /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md	2026-07-23 22:54:26.238731005 +0000
+++ /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md	2026-07-31 00:25:02.421136471 +0000
@@ -5,8 +5,20 @@
 menu: 'Text: top'
 ---
 
+##Code and tools
+
 Explore Team 449's public [GitHub repositories](https://github.com/blair-robot-project) for our robot code and tools.
 
-Read our [2026 Flywheel Calculations Whitepaper](/media/whitepapers/2026/flywheel-calculations-latest.pdf).
+##Whitepapers
 
-Read the [whitepaper written by our Data Science team](https://www.chiefdelphi.com/t/introducing-prior-ridge-regularization-for-frc-rating/519531) on pRidge.
\ No newline at end of file
+- [Flywheel Shot Analysis: Correction and
+Extension](https://www.chiefdelphi.com/t/flywheel-shot-analysis-correction-and-extension/520270), [PDF](/media/whitepapers/2026/flywheel-calculations-latest.pdf) (Rafi Pedersen, 2026)
+- [Introducing Prior Ridge: Regularization for FRC Rating](https://www.chiefdelphi.com/t/introducing-prior-ridge-regularization-for-frc-rating/519531) (Data Science Team, 2026)
+- [PSA: Your Motor Curves Are Still Wrong (A Correction To A Whitepaper About Current Limits)](https://www.chiefdelphi.com/t/psa-your-motor-curves-are-still-wrong-a-correction-to-a-whitepaper-about-current-limits/504706) (Rafi Pedersen, 2025)
+- [Trapezoidal-Exponential Motion Profiling](https://www.chiefdelphi.com/t/whitepaper-trapezoidal-exponential-motion-profiling/443468) (Rafi Pedersen, 2023)
+- [Two Jointed Arm Dynamics](https://www.chiefdelphi.com/t/whitepaper-two-jointed-arm-dynamics/423060) (Rafi Pedersen, 2023)
+- [Swerve Drive Skew and Second Order Kinematics](https://www.chiefdelphi.com/t/whitepaper-swerve-drive-skew-and-second-order-kinematics/416964) (Rafi Pedersen, 2022)
+- [Drivetrain Simulation using Characterization Constants](https://www.chiefdelphi.com/t/drivetrain-simulation-using-characterization-constants/369088) (Rafi Pedersen, 2020)
+- [Presenting the YamlBot Framework and Team 449’s Steamworks Code](https://www.chiefdelphi.com/t/presenting-the-yamlbot-framework-and-team-449s-steamworks-code/160276) (Programming Team, 2017)
+- [FRC Drivetrain Characterization](https://www.chiefdelphi.com/t/paper-frc-drivetrain-characterization/160915) (Noah Gleason and Eli Barnett, 2017).
+    - Cited in WPILib's [official FRC documentation](https://docs.wpilib.org/en/2020/docs/software/wpilib-tools/robot-characterization/introduction.html) as the reference for the motor feedforward equation behind the robot characterization toolsuite, the predecessor of today's [SysId](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html) tool.
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/08._genehaas/text.md /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/08._genehaas/text.md
--- /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/08._genehaas/text.md	2026-07-19 13:04:31.000300708 +0000
+++ /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/08._genehaas/text.md	2026-07-30 22:14:02.342136512 +0000
@@ -2,11 +2,11 @@
 url: 'https://ghf-inc.com/'
 title: _haas
 image_align: right
-media_order: 'GHF.png?'
+media_order: GHF.png
 published: true
 image_height: 120
 alt: 'Gene Haas Foundation logo'
 ---
 
-### [Gene Haas Foundation](https://ghf-inc.com/)
+### [Gene Haas Foundation](https://www.ghaasfoundation.org/)
 [Gold Sponsor](/sponsor-information/sponsor-benefits#gold)
\ No newline at end of file

user/themes/mod-quark
Only in /srv/.activity-shadow/user/themes/mod-quark/blueprints/modular: gallery-draggable.yaml.bak-20260702-222314
Only in /srv/.activity-shadow/user/themes/mod-quark/templates/modular: gallery-draggable.html.twig.bak-20260702-222314
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-29 16:59:18.045882862 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-31 00:00:36.239535673 +0000
@@ -50,23 +50,27 @@
             <div class="column col-6 col-md-12">
                 {% if image %}
                     {% set _alt = page.header.alt|default(page.header.title) %}
-                    {% for image_name in page.header.media_order|split(',') %}
+                    {% set _names = page.header.media_order ? page.header.media_order|split(',') : page.media.images|keys %}
+                    {% for image_name in _names %}
                         {% set image_name = image_name|trim %}
                         {% set image = page.media[image_name] %}
-                        {% set _ext = image.filename|split('.')|last %}
-                        {% set _base = image.basename %}
-                        {% set _orig = page.media[_base ~ '-original.' ~ _ext] %}
-                        {% set _full = _orig ?: image %}
-                        {% set _link = page.header.url ?: _full.url %}
-                        {% set _hover = page.media[_base ~ '-hover.' ~ _ext] %}
-                        <a href="{{ _link }}" class="gallery-thumb" target="_blank" rel="noopener" title="{{ _alt }}">
-                            <img src="{{ image.url|absolute_url }}"
-                                {% if _hover %}
-                                    onpointerenter = "this.src='{{ _hover.url|absolute_url }}';"
-                                    onpointerleave = "this.src='{{ image.url|absolute_url }}';"
-                                {% endif %}
-                                alt = "{{ _alt }}">
-                        </a>
+                        {% set _column_w = page.header.image_width|default(600) %}
+                        {% if image %}
+                            {% set _ext = image.filename|split('.')|last %}
+                            {% set _base = image.basename %}
+                            {% set _orig = page.media[_base ~ '-original.' ~ _ext] %}
+                            {% set _full = _orig ?: image %}
+                            {% set _link = page.header.url ?: _full.url %}
+                            {% set _hover = page.media[_base ~ '-hover.' ~ _ext] %}
+                            <a href="{{ _link }}" class="gallery-thumb" target="_blank" rel="noopener" title="{{ _alt }}">
+                                <img src="{{ image.url|absolute_url }}" }}
+                                    {% if _hover %}
+                                        onpointerenter = "this.src='{{ _hover.url|absolute_url }}';"
+                                        onpointerleave = "this.src='{{ image.url|absolute_url }}';"
+                                    {% endif %}
+                                    alt = "{{ _alt }}">
+                            </a>
+                        {% endif %}
                     {% endfor %}
                 {% endif %}
             </div>
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: text.html.twig.bak-20260730-141132
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: text.html.twig.bak-20260730-141653
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: text.html.twig.bak-20260730-214357
```


### 2026-07-30

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/08._history-jump-index/text.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/08._history-jump-index/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/08._history-jump-index/text.md	2026-07-14 12:14:48.137735130 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/08._history-jump-index/text.md	2026-07-29 17:18:31.926975661 +0000
@@ -5,4 +5,4 @@
 class: year-index
 ---
 
-[1999](#history-1999) | [1999-00](#frc-2000) | [2000-01](#frc-2001) | [2001-02](#frc-2002) | [2002-03](#frc-2003) | [2003-04](#frc-2004) | [2005-06](#frc-2006) | [2006-07](#frc-2007) | [2007-08](#frc-2008) | [2008-09](#frc-2009) | [2009-10](#frc-2010) | [2010-11](#frc-2011) | [2011-12](#frc-2012) | [2012-13](#frc-2013) | [2013-14](#frc-2014) | [2014-15](#frc-2015) | [2015-16](#frc-2016) | [2016-17](#frc-2017) | [2017-18](#frc-2018) | [2018-19](#frc-2019) | [2019-20](#frc-2020) | [2021-22](#frc-2022) | [2022-23](#frc-2023) | [2023-24](#frc-2024) | [2024-25](#frc-2025) | [2025-26](#frc-2026)
\ No newline at end of file
+[2025-26](#frc-2026) | [2024-25](#frc-2025) | [2023-24](#frc-2024) | [2022-23](#frc-2023) | [2021-22](#frc-2022) | [2019-20](#frc-2020) | [2018-19](#frc-2019) | [2017-18](#frc-2018) | [2016-17](#frc-2017) | [2015-16](#frc-2016) | [2014-15](#frc-2015) | [2013-14](#frc-2014) | [2012-13](#frc-2013) | [2011-12](#frc-2012) | [2010-11](#frc-2011) | [2009-10](#frc-2010) | [2008-09](#frc-2009) | [2007-08](#frc-2008) | [2006-07](#frc-2007) | [2005-06](#frc-2006) | [2003-04](#frc-2004) | [2002-03](#frc-2003) | [2001-02](#frc-2002) | [2000-01](#frc-2001) | [1999-00](#frc-2000) | [1999](#history-1999)
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/10._frc-2026/text.md /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/17.HISTORY/10._frc-2026/text.md	2026-07-23 16:48:33.783743174 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026/text.md	2026-07-29 16:38:24.152836751 +0000
@@ -7,7 +7,7 @@
 menu: frc-2026
 year_bar: 2025-26
 class: year-module
-media_order: 'screenshot-2026-07-12-at-11-43-11-pm.png, img_7565.jpeg, 449-2026-group.jpg'
+media_order: 'tumbleweed_1.jpg, img_7565.jpeg, 449-2026-group.jpg'
 image_height: 100
 ---
 
@@ -19,8 +19,6 @@
 
 Tumbleweed has a horizontally extending hopper, a double shooter, and can drive under the trench.
 
-[//]: # (NEEDS REVIEW: this page's only photo is a screenshot file, not a proper robot photo -- worth replacing with an actual photo when one is available)
-
 > **Record** 49-15-0 (W-L-T) in official play
 
 > **CHS District - Alexandria VA** [Rank 7](https://www.thebluealliance.com/event/2026vaale), 11-5-0, [FIRST Leadership Award Semi-Finalist](https://www.thebluealliance.com/event/2026vaale#awards) (Allison Z)
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover-0.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover-1.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover-2.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover-3.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover-orig.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1-hover.jpg
Only in /srv/robot-grav-site/user/pages/02.about-us/17.HISTORY/10._frc-2026: tumbleweed_1.jpg
Only in /srv/robot-grav-site/user/pages/04.bunnybots: 06.bunnybots-2025

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-23 23:51:12.179984913 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-29 16:59:18.045882862 +0000
@@ -50,13 +50,23 @@
             <div class="column col-6 col-md-12">
                 {% if image %}
                     {% set _alt = page.header.alt|default(page.header.title) %}
-                    {% for image in page.media.images %}
-                        {% set _ext = image.basename|split('.')|last %}
-                        {% set _base = image.basename|slice(0, image.basename|length - _ext|length - 1) %}
+                    {% for image_name in page.header.media_order|split(',') %}
+                        {% set image_name = image_name|trim %}
+                        {% set image = page.media[image_name] %}
+                        {% set _ext = image.filename|split('.')|last %}
+                        {% set _base = image.basename %}
                         {% set _orig = page.media[_base ~ '-original.' ~ _ext] %}
                         {% set _full = _orig ?: image %}
                         {% set _link = page.header.url ?: _full.url %}
-                        <a href="{{ _link }}" class="gallery-thumb" target="_blank" rel="noopener" title="{{ _alt }}">{{ image.html(_alt, _alt)|raw }}</a>
+                        {% set _hover = page.media[_base ~ '-hover.' ~ _ext] %}
+                        <a href="{{ _link }}" class="gallery-thumb" target="_blank" rel="noopener" title="{{ _alt }}">
+                            <img src="{{ image.url|absolute_url }}"
+                                {% if _hover %}
+                                    onpointerenter = "this.src='{{ _hover.url|absolute_url }}';"
+                                    onpointerleave = "this.src='{{ image.url|absolute_url }}';"
+                                {% endif %}
+                                alt = "{{ _alt }}">
+                        </a>
                     {% endfor %}
                 {% endif %}
             </div>
```


### 2026-07-29

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/01.home/06._about/text.md /srv/robot-grav-site/user/pages/01.home/06._about/text.md
--- /srv/.activity-shadow/user/pages/01.home/06._about/text.md	2026-07-14 14:26:27.637527924 +0000
+++ /srv/robot-grav-site/user/pages/01.home/06._about/text.md	2026-07-28 16:29:21.513612133 +0000
@@ -6,8 +6,12 @@
 ---
 
 ## **What’s new**
+**August 1:** Our annual [summer classes](https://robot.mbhs.edu/community/summer-classes) start, free to students in grades K-12. Signups close July 31.
+
 **July 10-12:** We participated in Philly's [RoboJawn](https://www.thebluealliance.com/event/2026paphi1), organized by Teams [321](https://robolancers.com/) and [1218](https://www.sch.org/admissions/learn/robotics)! 
 
+**June 30:** Team 449 participated in the 2026 FDA Family Day.
+
 **June 27:** Applications are open for the 2026-27 season of our FIRST LEGO League team! Apply by July 20 [here](https://forms.gle/c1Hs4XFMk3XrNnyG7)!
 
 **June 6:** Teams 449 and [4821](https://cyberus4821.weebly.com/) hosted [FRC Team Development Conference](https://www.instagram.com/p/DYQmhUPsiaO/), welcoming members of 10 teams from around the DMV for a [day of speakers, workshops, and networking](https://www.instagram.com/p/DZSSViBDjnk/?img_index=10).
Only in /srv/robot-grav-site/user/pages/02.about-us: data-science
diff -ru /srv/.activity-shadow/user/pages/04.bunnybots/04._register/icon-menu.md /srv/robot-grav-site/user/pages/04.bunnybots/04._register/icon-menu.md
--- /srv/.activity-shadow/user/pages/04.bunnybots/04._register/icon-menu.md	2026-06-27 21:02:33.177648728 +0000
+++ /srv/robot-grav-site/user/pages/04.bunnybots/04._register/icon-menu.md	2026-07-28 19:14:53.106376650 +0000
@@ -1,5 +1,5 @@
 ---
-title: 'Bunnybots: Text: 2025 Bunnybots'
+title: 'Bunnybots: Text: Registration'
 media_order: 'BlairBunnybots2025GameManualv1.pdf,BlairBunnybotsTeamUpdate00.pdf'
 published: true
 class: small
@@ -8,33 +8,16 @@
 menu: 'Text: 2025 Bunnybots'
 ---
 
-## 2025 Bunnybots 
-[plugin:youtube](https://youtu.be/8z1tBnxV6zw)
+[Game Manual v1.0 - Coming Soon](/bunnybots?classes=nounderline,disabled,button,btn-block)
 
-For the 2025 season, 449 sought to design a game that would teach skills particularly desired by _FIRST_ Chesapeake teams, so we asked prospective participants to suggest skills to focus on. The game rules were released on September 1, and team registration closed on November 1.
-
-[Game Manual v1.2](https://drive.google.com/file/d/1D44qccFE0jz7-Ch-WYBXTt9G4z2JJTo3/view) (Updated 11/1/2025. See Revision History section for Team Update 02)
-
-[Bunnybots Shinyapp](https://mitchell-ghosty33.shinyapps.io/bunnybots_scouting_2025_shinyapp/): (Updated to Match 15. The data presented in the app should not be taken as true; quite a few inaccuracies skew results.)
+#2026 Registration
+---
+[Team Registration - Opening Soon](/bunnybots?classes=nounderline,disabled,button,btn-block) <br>
+[Volunteer Registration - Opening Soon](/bunnybots?classes=nounderline,disabled,button,btn-block)
 
 ### Participants
-**FRC 449 - The Blair Robot Project (2 robots)** <br>
-[FRC 611](https://www.saxonrobotics.org/): Saxons (2 robots)<br>
-[FRC 686](https://bovineintervention.org/): Bovine Intervention<br>
-[FRC 1915](https://www.mckinleyfirebirds.com/): Firebird Robotics<br>
-[FRC 2537](https://team2537.com/): Space RAIDers<br>
-[FRC 2988](https://www.thebluealliance.com/team/2988): RoboRiot<br>
-[FRC 4638](https://jagbots4638.com/): Jagbots<br>
-[FRC 4821](https://cyberus4821.weebly.com/): CyberUs<br>
-[FRC 5115](https://www.wheatonrobotics.com/): Knight Riders<br>
-[FRC 5243](https://centrevillerobotics.com/aegis-robotics): AEGIS<br>
-[FRC 5338](https://www.team5338.org/): RoboLoCo<br>
-[FRC 5353](https://www.thebluealliance.com/team/5353): ACL Raptors<br>
-[FRC 5549](https://www.frc5549.org/): Gryphon Robotics<br>
-[FRC 5587](https://www.frc5587.org/): Titan Robotics<br>
-[FRC 8230](https://www.thebluealliance.com/team/8230): KoiBots<br>
-[FRC 8592](https://frc8592.novalabsrobotics.org/): Newton Squared<br>
-[FRC 8726](https://www.cryptohawks8726.com/): CryptoHawks<br>
-[FRC 9033](https://ocebots.com): Ocebots
+Paid & Confirmed Teams in **Bold** <br>
+
+**[FRC 449](/) - The Blair Robot Project (2 robots)** <br>
 
 ---
\ No newline at end of file
Only in /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS: 05._dowstem
Only in /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS: 05._google
```


### 2026-07-28

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md
--- /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md	2026-07-24 00:54:24.575159160 +0000
+++ /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md	2026-07-28 02:39:04.004412302 +0000
@@ -20,14 +20,14 @@
 
 Team 449 is dedicated to giving back to our community through education. This summer, we’ll be teaching 4 **free and virtual** classes, running from **August 1 to 23**. Hosted on Google Meet, these classes are available for **all students in grades K-12**, and will be taught by our team’s members, with a dedicated curriculum for each class. More information on each class can be found at the links below. **Signups are due July 31**.
 
-[_Algebra 1 Bootcamp:_](https://docs.google.com/forms/d/e/1FAIpQLScYXokYeYmHDFhwBQyKfj44WqlBLTYRyFjrRuAmBQncw33vKg/viewform) Math: Introduction to Algebra 1 (generally recommended for students in grades 4-8)
+[_Algebra 1 Bootcamp:_](https://canva.link/pt4iaq0o51jstny) Math: Introduction to Algebra 1 (generally recommended for students in grades 4-8)
 <br>August 1-22, Saturdays 11 a.m.-noon 
 
-[_Python PROgramming:_](https://docs.google.com/forms/d/e/1FAIpQLSeuM5_z1_L32aykdMXssF83LMSMWI2RZ_rc256pWCCeD8RfDw/viewform) Python: general programming for complete beginners
+[_Python PROgramming:_](https://canva.link/547xxkg3dhrrjin) Python: general programming for complete beginners
 <br>August 1-22, Saturdays 2-3 p.m.
 
-[_CAD Basics:_](https://docs.google.com/forms/d/e/1FAIpQLSd-AFnm7gSYDcH8MFdhobilZ9QoSqVfI3Otv11_56Upcj2slg/viewform) Computer-Aided Design (CAD) Onshape for beginners
+[_CAD Basics:_](https://canva.link/lp7iar9pjqf36ki) Computer-Aided Design (CAD) Onshape for beginners
 <br>August 2-23, Sundays 11 a.m.-noon
 
-[_Scratch Simplified:_](https://docs.google.com/forms/d/e/1FAIpQLSfXfMJhcCq6bfMVrPZh2OwJE5TbCmXtrx8e0-lxEV0FlkV0qA/viewform) Scratch: block-based visual programming for complete beginners
+[_Scratch Simplified:_](https://canva.link/b3gfysayt4yo5ju) Scratch: block-based visual programming for complete beginners
 <br>August 2-23, Sundays 2-3 p.m.
\ No newline at end of file
```


### 2026-07-27

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/02.about-us/20.SCOUTING/modular.md /srv/robot-grav-site/user/pages/02.about-us/20.SCOUTING/modular.md
--- /srv/.activity-shadow/user/pages/02.about-us/20.SCOUTING/modular.md	2026-06-26 17:56:50.728232819 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/20.SCOUTING/modular.md	2026-07-26 21:46:27.084410202 +0000
@@ -8,7 +8,6 @@
 underconstruction: false
 published: false
 metadata:
-  description: 'Scouting at FRC Team 449, the Blair Robot Project — how we gather and analyze match data to drive strategy at FIRST Robotics Competitions.'
-
+    description: 'Scouting at FRC Team 449, the Blair Robot Project — how we gather and analyze match data to drive strategy at FIRST Robotics Competitions.'
 ---
 
```


### 2026-07-25

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md
--- /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md	2026-07-24 00:56:52.476913312 +0000
+++ /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md	2026-07-24 16:02:55.543364247 +0000
@@ -21,7 +21,7 @@
         end_date: '28-08-2026 12:00'
     -
         title: 'Summer classes signup (7/23-7/31)'
-        message: 'Register for our summer programs now! FLL by Aug. 1 or summer math and programming classes by July 31'
+        message: 'Register for our FLL team and summer classes today!'
         start_date: ''
         end_date: '2026-07-31 12:00'
         level: blue
```


### 2026-07-24

```diff

user/pages
diff -ru /srv/.activity-shadow/user/pages/02.about-us/18.LEADERSHIP/09._past-presidents/text.md /srv/robot-grav-site/user/pages/02.about-us/18.LEADERSHIP/09._past-presidents/text.md
--- /srv/.activity-shadow/user/pages/02.about-us/18.LEADERSHIP/09._past-presidents/text.md	2026-07-23 16:44:53.783179917 +0000
+++ /srv/robot-grav-site/user/pages/02.about-us/18.LEADERSHIP/09._past-presidents/text.md	2026-07-23 22:56:24.935348541 +0000
@@ -10,25 +10,25 @@
 ---
 
 ## Past Presidents
-* **2007-2008** Katherine Bertaut
-* **2008-2009** Ben Shaya
-* **2009-2010** Ben Shaya
-* **2010-2011** [Aaron Tucker](https://www.thebluealliance.com/event/2011nc#awards)
+* **2007-2008** Katherine B
+* **2008-2009** Ben S
+* **2009-2010** Ben S
+* **2010-2011** [Aaron T](https://www.thebluealliance.com/event/2011nc#awards)
 * **2011-2012** Eric H
-* **2012-2013** Sagarika Das
-* **2013-2014** Alex Epstein
-* **2014-2015** Harrison Zheng
-* **2015-2016** Karina Chang
-* **2016-2017** Urjita Das
-* **2017-2018** Laura Espinoza
-* **2018-2019** Rye Gleason
-* **2019-2020** Nate Klein
-* **2020-2021** Peter Nesin
-* **2021-2022** Jade Lilian
-* **2022-2023** [Sean Li](https://www.instagram.com/p/CiOvoZmuRHf/?img_index=1)
-* **2023-2024** [Akiva Rosenzweig](https://www.instagram.com/p/Cw-4_b9uyyj/?img_index=1)
-* **2024-2025** [Matthew Nam](https://www.instagram.com/p/C_siSTJR_6b/?img_index=1)
-* **2025-2026** [Oliver Wang](https://www.instagram.com/p/DNVMRKjOjiM/?img_index=1)
+* **2012-2013** Sagarika D
+* **2013-2014** Alex E
+* **2014-2015** Harrison Z
+* **2015-2016** Karina C
+* **2016-2017** Urjita D
+* **2017-2018** Laura E
+* **2018-2019** Rye G
+* **2019-2020** Nate K
+* **2020-2021** Peter N
+* **2021-2022** Jade L
+* **2022-2023** [Sean L](https://www.instagram.com/p/CiOvoZmuRHf/?img_index=1)
+* **2023-2024** [Akiva R](https://www.instagram.com/p/Cw-4_b9uyyj/?img_index=1)
+* **2024-2025** [Matthew N](https://www.instagram.com/p/C_siSTJR_6b/?img_index=1)
+* **2025-2026** [Oliver W](https://www.instagram.com/p/DNVMRKjOjiM/?img_index=1)
 * **2026-2027** [Roman S](https://www.instagram.com/p/DZEParXloUt/?img_index=1) (current)
 
 *Other notable members can be found [here](https://docs.google.com/document/d/1yVYtR1NqEdWcrjKYWmex5kS7q9y_iVc72FNdw-WKk9k/edit?tab=t.0).*
Only in /srv/robot-grav-site/user/pages/03.community/02._community-events: betterdemo.jpg
Only in /srv/robot-grav-site/user/pages/03.community/02._community-events: dumbo.jpg
Only in /srv/robot-grav-site/user/pages/03.community/02._community-events: stemfair.jpg
diff -ru /srv/.activity-shadow/user/pages/03.community/02._community-events/text.md /srv/robot-grav-site/user/pages/03.community/02._community-events/text.md
--- /srv/.activity-shadow/user/pages/03.community/02._community-events/text.md	2026-07-19 13:05:19.426181720 +0000
+++ /srv/robot-grav-site/user/pages/03.community/02._community-events/text.md	2026-07-23 21:19:34.629289281 +0000
@@ -1,7 +1,7 @@
 ---
 title: 'Community: Text: Events, Advocacy'
 image_align: right
-media_order: 'makerFaire.png, mkpcSciExpo2018-original.jpg'
+media_order: 'makerFaire.png, mkpcSciExpo2018-original.jpg, stemfair.jpg, betterdemo.jpg, dumbo.jpg'
 menu: 'Text: Community Events'
 alt: 'Team members engaging with young visitors at a community STEM outreach event'
 ---
@@ -9,21 +9,30 @@
 Our team members come from many backgrounds and cultures. We are dedicated to giving back our diverse community and the world at large, inspiring and preparing students for careers in STEM through outreach events, workshops, and long-term parnerships.
 
 ## Appearances
-We give talks and robot demos at such community events as:  
-* Takoma Park Middle School STEAM Night
-* Robert Frost Middle School STEM Night
-* USA Science & Engineering Festival
+We give talks and robot demos at such community events as: 
+* Takoma Park Folk Festival
 * Rockville Science Day
-* Montgomery Knolls/Pine Crest Elementary School STEM Fair
-* The Montgomery County Public Schools STEM Showcase
-* KID Museum Robotics Day
-* KIDFest
-* Maryland Robotics Alliance Education Day
-* Every Girl Can STEAM Conference
-* Savvy STEM Girl Mini Camp
-* Females in Science and Technology Conference  
-
-## Advocacy
-We advocate for robotics legislature and STEM education with:  
-* [MocoRobo](https://www.instagram.com/moco_robotics/)
-* [National Advocacy Conference](https://mysasa.org/national-advocacy-conference/)
\ No newline at end of file
+* KID Museum Invent the Future Expo
+* GBTLA Learning Academy
+* FDA Family Day
+
+## STEM Fairs
+We visit underserved schools throughout our community to provide students with unique, hands-on STEM experiences and education. Here are some of the schools we've visited: 
+* Rolling Terrace ES
+* Bethesda ES
+* Charles Drew ES
+
+## STEM Nights
+STEM Nights are our schoolwide, one-night demos where we let kids drive our outreach robot, Dumbo, which was made specifically for these events! This year, we've visited these schools: 
+* Silver Creek MS
+* Tilden MS
+* Burnt Mills ES
+* East Silver Spring ES
+* Viers Mill ES
+* Montgomery Blair HS
+
+## FLL Tournament
+This year, our second year hosting our FLL Tournament (The Blazers Beltway Blast), we saw 25 teams attending and had over 60 volunteers participate, which is almost double the amount of volunteers since last year! 
+
+## Volunteering
+We love helping out at FIRST events! This past year, 10 team members volunteered at the Battle of Baltimore, totalling 119 hours. 
\ No newline at end of file
diff -ru /srv/.activity-shadow/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md /srv/robot-grav-site/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md
--- /srv/.activity-shadow/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md	2026-07-17 19:46:01.802023688 +0000
+++ /srv/robot-grav-site/user/pages/03.community/04.fll-team/02._java-programming-class-body/text.md	2026-07-23 23:03:53.597078651 +0000
@@ -11,7 +11,9 @@
 
 All students in grades 5-8 are invited to apply. The season starts in September and runs into the new year. (Just how far into the year depends on the team's performance in early-2027 tournaments.)
 
-**Find more details and the application [here](https://forms.gle/c1Hs4XFMk3XrNnyG7). Applications are open until July 20!** 
+**Find our flyer [here](/media/flyers/fll-flyer-2026/flyer.pdf).**
+
+**Find more details and the application [here](https://forms.gle/c1Hs4XFMk3XrNnyG7). Applications are open until August 1st!** 
 
 **About FLL:** [FIRST LEGO League](https://www.firstlegoleague.org) is a robotics competition for middle schoolers. Under the guidance of 449 team members, students learn to build and program a robot ([EV3 Mindstorms](https://education.lego.com/en-us/product-resources/mindstorms-ev3/downloads/building-instructions/)) to solve real-world problems. Through this experience, they develop leadership, collaboration, and technical skills!
 
diff -ru /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md
--- /srv/.activity-shadow/user/pages/03.community/07.summer-classes/default.md	2026-07-23 17:09:58.785748165 +0000
+++ /srv/robot-grav-site/user/pages/03.community/07.summer-classes/default.md	2026-07-24 00:54:24.575159160 +0000
@@ -18,16 +18,16 @@
 
 ### Sign up for summer classes! 
 
-449 is dedicated to giving back to our community through education. This summer, we’ll be teaching 4 **free and virtual** classes, running from **August 1st & 2nd to August 22nd & 23rd**. These classes are available for **all students K-12**, and will be taught by our team’s members, with dedicated curriculums for each class. More information on each class can be found in the links below. **Signups are due July 31st**.
+Team 449 is dedicated to giving back to our community through education. This summer, we’ll be teaching 4 **free and virtual** classes, running from **August 1 to 23**. Hosted on Google Meet, these classes are available for **all students in grades K-12**, and will be taught by our team’s members, with a dedicated curriculum for each class. More information on each class can be found at the links below. **Signups are due July 31**.
 
-[_Algebra 1 Bootcamp:_](https://docs.google.com/forms/d/e/1FAIpQLScYXokYeYmHDFhwBQyKfj44WqlBLTYRyFjrRuAmBQncw33vKg/viewform) An introduction to Algebra 1 math
-August 1st - 22nd, 11:00 AM - 12:00 PM, Saturdays
+[_Algebra 1 Bootcamp:_](https://docs.google.com/forms/d/e/1FAIpQLScYXokYeYmHDFhwBQyKfj44WqlBLTYRyFjrRuAmBQncw33vKg/viewform) Math: Introduction to Algebra 1 (generally recommended for students in grades 4-8)
+<br>August 1-22, Saturdays 11 a.m.-noon 
 
-[_Python PROgramming:_](https://docs.google.com/forms/d/e/1FAIpQLSeuM5_z1_L32aykdMXssF83LMSMWI2RZ_rc256pWCCeD8RfDw/viewform) Python, general programming, for complete beginners
-August 1st - 22nd, 2:00 PM - 3:00 PM, Saturdays
-
-[_Scratch Simplified:_](https://docs.google.com/forms/d/e/1FAIpQLSfXfMJhcCq6bfMVrPZh2OwJE5TbCmXtrx8e0-lxEV0FlkV0qA/viewform) Scratch, block-based visual programming, for complete beginners
-August 2nd - 23rd, 11:00 AM - 12:00 PM, Sundays
+[_Python PROgramming:_](https://docs.google.com/forms/d/e/1FAIpQLSeuM5_z1_L32aykdMXssF83LMSMWI2RZ_rc256pWCCeD8RfDw/viewform) Python: general programming for complete beginners
+<br>August 1-22, Saturdays 2-3 p.m.
 
 [_CAD Basics:_](https://docs.google.com/forms/d/e/1FAIpQLSd-AFnm7gSYDcH8MFdhobilZ9QoSqVfI3Otv11_56Upcj2slg/viewform) Computer-Aided Design (CAD) Onshape for beginners
-August 2nd - 23rd, 2:00 PM - 3:00 PM, Sundays
+<br>August 2-23, Sundays 11 a.m.-noon
+
+[_Scratch Simplified:_](https://docs.google.com/forms/d/e/1FAIpQLSfXfMJhcCq6bfMVrPZh2OwJE5TbCmXtrx8e0-lxEV0FlkV0qA/viewform) Scratch: block-based visual programming for complete beginners
+<br>August 2-23, Sundays 2-3 p.m.
\ No newline at end of file
Only in /srv/robot-grav-site/user/pages/03.community: _registration
diff -ru /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md
--- /srv/.activity-shadow/user/pages/05.resources/02._text-top/text.md	2026-07-10 23:14:15.615286845 +0000
+++ /srv/robot-grav-site/user/pages/05.resources/02._text-top/text.md	2026-07-23 22:54:26.238731005 +0000
@@ -8,3 +8,5 @@
 Explore Team 449's public [GitHub repositories](https://github.com/blair-robot-project) for our robot code and tools.
 
 Read our [2026 Flywheel Calculations Whitepaper](/media/whitepapers/2026/flywheel-calculations-latest.pdf).
+
+Read the [whitepaper written by our Data Science team](https://www.chiefdelphi.com/t/introducing-prior-ridge-regularization-for-frc-rating/519531) on pRidge.
\ No newline at end of file
Only in /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google: DoDSTEM logo-Revised with space.png
Only in /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google: full_color_dowstem_logo.png
diff -ru /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google/text.md /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google/text.md
--- /srv/.activity-shadow/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google/text.md	2026-07-23 17:15:39.719014234 +0000
+++ /srv/robot-grav-site/user/pages/05.sponsor-information/01.CURRENT-SPONSORS/05._google/text.md	2026-07-24 01:03:07.135489997 +0000
@@ -1,11 +1,11 @@
 ---
 url: 'https://dodstem.us/'
-title: _dodstem
-media_order: 'DoDSTEM logo-Revised with space.png'
+title: _dowstem
+media_order: full_color_dowstem_logo.png
 image_align: right
 image_height: 120
 alt: 'DoD STEM logo'
 ---
 
-### [DoD STEM](https://dodstem.us/)
+### [DoW STEM](https://dowstem.us/)
 Diamond Sponsor
\ No newline at end of file
Only in /srv/robot-grav-site/user/pages/05.sponsor-information/02.SPONSOR-BENEFITS/08._sponsorship-levels: style.css
diff -ru /srv/.activity-shadow/user/pages/05.sponsor-information/02.SPONSOR-BENEFITS/08._sponsorship-levels/text.md /srv/robot-grav-site/user/pages/05.sponsor-information/02.SPONSOR-BENEFITS/08._sponsorship-levels/text.md
--- /srv/.activity-shadow/user/pages/05.sponsor-information/02.SPONSOR-BENEFITS/08._sponsorship-levels/text.md	2026-07-17 20:17:11.255709009 +0000
+++ /srv/robot-grav-site/user/pages/05.sponsor-information/02.SPONSOR-BENEFITS/08._sponsorship-levels/text.md	2026-07-23 23:57:22.430419888 +0000
@@ -11,18 +11,6 @@
 **Your name and logo will travel** with one of the region's most visible robotics programs. We can display it on our robot and team apparel at multi-day district competitions, on our Bunnybots livestream, and across the schools and community events we reach throughout the year. 
 
 <a id="levels"></a><a id="bronze"></a><a id="silver"></a><a id="gold"></a><a id="diamond"></a>
-<style>
-.tiers{display:flex;flex-direction:column;gap:12px;margin:1.25rem 0}
-.tier{background:#fff;border:1px solid #e6e6e6;border-left-width:4px;border-radius:10px;padding:.95rem 1.2rem}
-.tier-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
-.tier-name{font-size:18px;font-weight:700}
-.tier-price{font-size:22px;font-weight:700;white-space:nowrap}
-.tier-sub{font-size:13px;color:#6b6b6b;margin-top:3px}
-.tier-benes{list-style:none;margin:10px 0 0;padding:0}
-.tier-benes li{display:flex;align-items:flex-start;gap:9px;font-size:15px;line-height:1.5;margin:6px 0}
-.tier-benes .fa{margin-top:3px}
-.tier-flag{display:inline-block;font-size:11px;font-weight:700;color:#fff;background:#a7000a;padding:1px 9px;border-radius:999px;margin-left:9px;letter-spacing:.03em;vertical-align:middle}
-</style>
 
 <div class="tiers">
   <div class="tier" style="border-left-color:#b0773e">
@@ -61,7 +49,7 @@
     <div class="tier-head"><span class="tier-name" style="color:#a7000a">Title Sponsor<span class="tier-flag">Flagship</span></span><span class="tier-price">$6,000</span></div>
     <div class="tier-sub">includes Diamond, plus:</div>
     <ul class="tier-benes">
-      <li><i class="fa fa-check" style="color:#a7000a" aria-hidden="true"></i>Title sponsorship of <a href="/bunnybots">Blair Bunnybots</a> or our _FIRST_ LEGO League tournament tournament</li>
+      <li><i class="fa fa-check" style="color:#a7000a" aria-hidden="true"></i>Title sponsorship of <a href="/bunnybots">Blair Bunnybots</a> or our <i>FIRST</i> LEGO League tournament</li>
       <li><i class="fa fa-check" style="color:#a7000a" aria-hidden="true"></i>Limited to one per event</li>
     </ul>
   </div>
diff -ru /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md
--- /srv/.activity-shadow/user/pages/09.announcements-data/announcements-data.md	2026-07-23 15:50:47.176912631 +0000
+++ /srv/robot-grav-site/user/pages/09.announcements-data/announcements-data.md	2026-07-24 00:56:52.476913312 +0000
@@ -11,6 +11,7 @@
         start_date: '08-07-2026 12:00'
         end_date: '02-08-2026 00:01'
         level: blue
+        published: 0
     -
         title: 'watch the Worlds 2026 video (displays 8/2-8/28)'
         level: blue
@@ -20,10 +21,11 @@
         end_date: '28-08-2026 12:00'
     -
         title: 'Summer classes signup (7/23-7/31)'
-        message: 'Registration for summer classes is now open until July 31st! '
+        message: 'Register for our summer programs now! FLL by Aug. 1 or summer math and programming classes by July 31'
         start_date: ''
         end_date: '2026-07-31 12:00'
-        level: yellow
+        level: blue
+        link: /community
 visible: false
 ---
 
diff -ru /srv/.activity-shadow/user/pages/11.error/error.md /srv/robot-grav-site/user/pages/11.error/error.md
--- /srv/.activity-shadow/user/pages/11.error/error.md	2026-07-10 14:25:40.692123929 +0000
+++ /srv/robot-grav-site/user/pages/11.error/error.md	2026-07-23 23:00:04.647988101 +0000
@@ -10,4 +10,4 @@
 #This page is
 ![screenshot-2026-06-09-at-2-43-33-pm](screenshot-2026-06-09-at-2-43-33-pm.png "screenshot-2026-06-09-at-2-43-33-pm")
 
-We're sorry about that! (Shout-out to our friends at [Team 404](https://www.argsrobotics.org/) in Petersburg, Va.)
\ No newline at end of file
+We're sorry about that! (Shout-out to our friends at [Team 404](https://www.argsrobotics.org/) in Petersburg, VA!)
\ No newline at end of file
Only in /srv/robot-grav-site/user/pages/12.media: flyers

user/themes/mod-quark
Only in /srv/robot-grav-site/user/themes/mod-quark/css: sponsorship-levels.css
diff -ru /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig
--- /srv/.activity-shadow/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-23 17:24:18.419854271 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/templates/modular/text.html.twig	2026-07-23 23:51:12.179984913 +0000
@@ -18,6 +18,8 @@
     {% set post_html = content_parts[0] %}
 {% endif %}
 
+<link rel="stylesheet" href="{{ url('theme://css/sponsorship-levels.css') }}">
+
 <section class="section modular-text {{ page.header.class}} bg-gray">
     <section class="container {{ grid_size }}" style="text-align: {{ page.header.text_align|default('left') }}">
         {% if page.header.year_bar %}
Only in /srv/robot-grav-site/user/themes/mod-quark/templates/modular: text.html.twig.bak-20260723-234656
```


### 2026-07-23

```diff

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/css/custom.css /srv/robot-grav-site/user/themes/mod-quark/css/custom.css
--- /srv/.activity-shadow/user/themes/mod-quark/css/custom.css	2026-07-23 19:08:10.350362438 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/css/custom.css	2026-07-23 19:08:20.614767436 +0000
@@ -498,4 +498,3 @@
 .year-index p a:hover {
     text-decoration: underline;
 }
-/* activity-log.sh top-insert test 2026-07-23b, safe to remove */
```


### 2026-07-23

```diff

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/css/custom.css /srv/robot-grav-site/user/themes/mod-quark/css/custom.css
--- /srv/.activity-shadow/user/themes/mod-quark/css/custom.css	2026-07-23 18:24:22.888609195 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/css/custom.css	2026-07-23 19:08:10.350362438 +0000
@@ -498,3 +498,4 @@
 .year-index p a:hover {
     text-decoration: underline;
 }
+/* activity-log.sh top-insert test 2026-07-23b, safe to remove */
```


### 2026-07-23

```diff

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/css/custom.css /srv/robot-grav-site/user/themes/mod-quark/css/custom.css
--- /srv/.activity-shadow/user/themes/mod-quark/css/custom.css	2026-07-23 18:24:10.416122764 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/css/custom.css	2026-07-23 18:24:22.888609195 +0000
@@ -498,4 +498,3 @@
 .year-index p a:hover {
     text-decoration: underline;
 }
-/* activity-log.sh test edit 2026-07-23, safe to remove */
```

### 2026-07-23

```diff

user/themes/mod-quark
diff -ru /srv/.activity-shadow/user/themes/mod-quark/css/custom.css /srv/robot-grav-site/user/themes/mod-quark/css/custom.css
--- /srv/.activity-shadow/user/themes/mod-quark/css/custom.css	2026-07-22 21:17:47.230813479 +0000
+++ /srv/robot-grav-site/user/themes/mod-quark/css/custom.css	2026-07-23 18:24:10.416122764 +0000
@@ -498,3 +498,4 @@
 .year-index p a:hover {
     text-decoration: underline;
 }
+/* activity-log.sh test edit 2026-07-23, safe to remove */
```
