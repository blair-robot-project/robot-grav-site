---
title: 'Build Blog'
published: true
body_classes: 'title-h1h2 header-dark header-transparent'
hero_classes: 'parallax text-light overlay-dark'
access:
    admin.login: true
content:
    items:
        - '@self.children'
    limit: 10
    order:
        by: date
        dir: desc
    pagination: true
    url_taxonomy_filters: true
---

