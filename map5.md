---
layout: default
title: "Connected places"
strapline: "Show locations connected to a particular place"
nav: "yes"
sortTitle: "s"
customjs:
  - /vendor/d3-5.16.0.min.js
  - /vendor/crossfilter-1.5.4.min.js
  - /vendor/topojson-3.0.2.min.js
  - /assets/map5.js
---



<div class="container-fluid clearfix">
  <div class="clearfix">

    <h2>{{page.title}}</h2>
    <p class="strap" style="padding-bottom:1em">{{page.strapline}}</p>

    <div id="sidebar" style="float: left; padding-right: 2em;">
      <h3>Places connected to: London</h3>
    </div>

    <div id="citiesMap" style="float: left;"></div>

  </div>
  <p id="download"></p>
</div>
