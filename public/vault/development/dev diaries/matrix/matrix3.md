---
title: rehauling matrix
date: 2008-01-15
tags:
  - dev-diary
  - matrix
number: 0
hide: true
description: a major update
---
slightly more than a year ago, i created matrix. i proceeded to post a few times in the next month or so, and then not at all for about a year. but then, during preparation for my a-levels, i suddenly felt like writing again. and that was when all the issues with matrix became apparent.

for starters, the data storage system was horrible. everytime i wanted to make an edit, even a minor one, i would have to upload the whole drive onto the vercel blob, which is okay to do once in a while, but sometimes i would feel like making quick edits, or i would have to figure out how to accommodate potential design features on the website (which is what i did for [the melbourne post](melbourne.md)), and my operations would quickly rack up. to avoid hitting the limit, i decided to rehaul the system in a way that would allow me to only reupload whatever was necessary.