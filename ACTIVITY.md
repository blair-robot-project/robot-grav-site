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
