---
title: 'Build Blog'
published: true
body_classes: 'title-h1h2 header-dark header-transparent'
hero_classes: 'parallax text-light overlay-dark hero-tiny'
hero_image: flag-picture-01.jpg
show_breadcrumbs: true
content:
    items:
        - '@self.children'
    limit: 64
    order:
        by: date
        dir: desc
    pagination: true
    url_taxonomy_filters: true
access:
    admin.login: true
---

