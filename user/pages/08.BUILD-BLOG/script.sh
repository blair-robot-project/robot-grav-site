#!/bin/bash

for value in {11..31}
do
mkdir 2019-01-$value-meeting-report/
cd 2019-01-$value-meeting-report/
touch item.md
cat <<EOT > item.md
---
title: 'Day $(($value - 4)) Meeting Update'
published: true
date: '$value-01-2019 00:00'
body_classes: 'title-h1h2 header-dark'
---

big brain academy $value: electric boogaloo

EOT
cd ..
done
