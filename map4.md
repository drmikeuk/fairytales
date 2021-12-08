---
layout: default
title: "Retelling locations"
strapline: Locations associated with a particular retelling
nav: "yes"
sortTitle: "r"
customjs:
  - /vendor/d3-5.16.0.min.js
  - /vendor/crossfilter-1.5.4.min.js
  - /vendor/topojson-3.0.2.min.js
  - /assets/map4.js
---



<div class="container-fluid clearfix">
  <div class="clearfix">

    <h2>{{page.title}}</h2>
    <p class="strap" style="padding-bottom:1em">{{page.strapline}}</p>

    <div id="sidebar" style="float: left; padding-right: 2em;">
      <h3>Nalo Hopkinson "The Glass Bottle Trick"</h3>
      <ul>
        <li>Origin: France</li>
        <li>Retelling: Jamaica</li>
        <li>Publication: USA</li>
        <li>Author: Canada</li>
        <li>Authors origin: Jamaica</li>
      </ul>
    </div>
    <div id="citiesMap" style="float: left;"></div>

  </div>
  <p id="download"></p>
</div>
