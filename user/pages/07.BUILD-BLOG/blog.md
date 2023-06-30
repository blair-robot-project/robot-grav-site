---
title: 'Build Blog'
published: true
body_classes: 'title-h1h2 header-dark header-transparent'
hero_classes: 'parallax text-light overlay-dark hero-medium'
hero_image: IMG_2704.JPG
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

# **Build Blog**