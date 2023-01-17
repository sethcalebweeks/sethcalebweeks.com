---
title: "TIL: Analytics, Jekyll, Open Graph"
date: 2023-01-14T16:40:00
layout: post
---

- I've been trying to get my personal website and blog cleaned up as my primary content publication location, but there are three main issues I need to solve:
  - Analytics
  - Notify subscribers
  - Distribution to broader community
  
  To solve the first issue, I've added [GoatCounter](https://www.goatcounter.com/) to my website, which is built in Jekyll
- When sharing my posts on social media, I'd like to include an image and preview text. Many platforms will automatically create a "social card" when pasting a link, but it wasn't working for my website. I installed the `jekyll-seo-tag` plugin and added the necessary meta data (description and image), and now it's working!
- I wanted to keep my posts organized, since they were all in a single `_posts` folder in the root directory. I found out that I can organize them into folders, with the added benefit of the posts being automatically categorized by the names of the folders.
- I came across the wonderful site [devhints.io](devhints.io). This is where I learned a bit more about Jekyll. I'll definitely be using this more.
- I needed a simple spell checker that works in VSCode. I went with [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), and it has been serving me well so far. It would be cool to have a [LanguageTool](https://languagetool.org/) extension that works with code.
