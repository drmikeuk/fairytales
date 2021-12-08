---
layout: home
title: "Fairy Tale Literature and the World"
description: "A database of global literary rewritings of folk and fairy tales"
header-img: World_Map_Grayscale.png
---

This site contains a set of **prototypes** with dummy data to begin to explore the data and how it might be displayed.
It doesn't reflect the final site design, colours, etc.

We are interested in _patterns_ in the data, in time & space.

The key research questions the database should be able to answer are:

- are literary fairy tale retellings a British / North American phenomenon, or are writers reworking fairy tales all over the world?
- how has a particular fairy tale (such as Beauty and the Beast) travelled globally across time?
- compare the number of texts associated with a specific tale published in different countries and different languages
- identify literary texts that _combine_ different fairy tales to ascertain patterns and connections between tales



## Prototypes
<ul>
  {% comment %} pages  in nav{% endcomment %}
  {% assign pages = site.pages | where: "nav", "yes" | sort: "sortTitle"  %}
  {% for page in pages %}
  <li><a href="{{ page.url | prepend: site.baseurl }}">{{ page.title }}</a> &mdash; <em>{{ page.strapline }}</em></li>
  {% endfor %}
</ul>
