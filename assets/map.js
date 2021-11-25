// d3: draw simple world map from topojson
// =======================================

var width = 700,
    height = 300;

var svg = d3.select("#citiesMap").append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geoMercator()
    .scale(280)                             // zoom in
    .center([-25, 30 ]);                    // center to focus on EU + US

var path = d3.geoPath()
    .projection(projection);


var mapurl = '/fairytales/assets/countries-110m.topojson.json';
var placesurl = '/fairytales/assets/places.csv';       // just copy off google maps
Promise.all([d3.json(mapurl), d3.csv(placesurl)]).then(function(data) {
    //if (error) throw error;

    var world = data[0];
    var places = data[1];

    // draw map
    svg.selectAll("path")
       .data(topojson.feature(world,world.objects.countries).features)
       .enter().append("path")
       .attr("fill", "#d6dadd")
       //.attr("stroke", "white")
       .attr("d", path);

    // draw bubbles for places
    svg.selectAll("circle")
       	.data(places)
        .enter()
       	.append("circle")
       	.attr("r", 7)                                           //  (fixed size)
       	.attr("cx", function(d) {	return projection([d.lng, d.lat])[0]; })
       	.attr("cy", function(d) {	return projection([d.lng, d.lat])[1]; })
       	.attr("fill", "darkgreen")
       	.attr("opacity", 0.5)

    // TEST calc svg x,y from lat,lng
    places.forEach(place => {
      //console.log(place);
      console.log("place: ", place["place"], ", x:", projection([place["lng"], place["lat"]])[0], ", y:", projection([place["lng"], place["lat"]])[1]);
      //console.log(projection( [place["lng"], place["lat"]] ));  // note  longitude, latitude]
    });


    // DOWNLOAD SVG button
    // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    var svgData = document.getElementById("svg").outerHTML;
    var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.id = 'downloadLink';
    downloadLink.href = svgUrl;
    downloadLink.download = "map.svg";
    var linkText = document.createTextNode("Download as SVG");
    downloadLink.appendChild(linkText);
    document.getElementById("download").appendChild(downloadLink);
});


// dc.js: draw bubble map & use projections from above
// ===================================================

// based on canadian crime example https://dc-js.github.io/dc.js/crime/index.html
// https://dc-js.github.io/dc.js/docs/html/dc.bubbleOverlay.html

// points
// d3 takes lat/lng and uses projection to calc x/y
// NB labels must match dataset / dimensions
/*
 place:  UK , x: 593.7011580148329 , y: 90.0672519264674
​ place:  France , x: 613.8484123119217 , y: 141.79739908072804
​ place:  Germany , x: 652.9636724418285 , y: 114.16237354022093
​ place:  Spain , x: 584.6183982649428 , y: 188.36157370457815
​ place:  USA , x: 124.62615199517643 , y: 194.03809326387977
*/


// colours from from https://medialab.github.io/iwanthue/
var colours = ["#5ba965","#ba5fb2","#a6973e","#6a7fcf","#cd6c39","#cc566a"];
var colours = ["#934acc","#559348","#b74c8e","#a37832","#6574be","#c44c44"]; // pimp
var colours = ["#daecca","#88aee1","#dbc4a4","#8bd0eb","#e7b8b7","#87c7c0","#d6bee2","#abcaa4","#aeb9d5","#baeae5","#a9beaf","#bad7e4"]; // pastel
var colours1 = ["#a57b87","#d642bc","#e5b6ca","#e545a2","#8f5260","#e03b6f","#aa7796","#b23d84","#de8095","#9b5080","#e386c0","#ad4261"]; // red roses
var colours2= ["#656d50","#92e63f","#a9ae87","#d9d934","#5e8b54","#5dcf51","#656a26","#97dd89","#a09c3f","#d8dfa9","#4f9437","#c8d766"];  // mint
var colours3 =  ["#8f7040","#e28c23","#6b4c33","#e1b340","#766949","#e6c392","#705110","#d69a55","#85644a","#a27b1d","#ad906c","#a06829"]; // yellow lime
var colours4 = ["#ff4f8a","#007e19","#6263ff","#abb13d","#800078","#e37f00","#00a6f0","#c1006e","#aea3e2","#771224","#d18f7c","#6a3557"]; // pimp


// CREATE OBJECTS & TIE TO HTML ie match to div IDs in the html
var dataCount = dc.dataCount("#datacount"),
    countryRowChart = dc.rowChart("#chart-row-country");

var ndx;            // NB now paginating need to define outside of load data

// LOAD DATA
// =========
// NB  special chars so try this? https://stackoverflow.com/questions/38304384/d3-js-read-csv-file-with-special-characters-%C3%A9-%C3%A0-%C3%BC-%C3%A8
d3.csv('/fairytales/assets/fairytalesMapDummy.csv').then(data => {

  // CREATE CROSSFILTER DIMENSIONS AND GROUPS
	ndx = crossfilter(data),
    taleDim = ndx.dimension(d => d.Tale),
    taleSearchDim = ndx.dimension(d => d.Tale),
    countryDim = ndx.dimension(d => d.FirstPublicationLocation),
		yearDim = ndx.dimension(d => d.Date),
		all = ndx.groupAll(),
    taleGroup = taleDim.group(),
    taleSearchGroup = taleSearchDim.group(),
    countryGroup = countryDim.group().reduceCount(),
    yearGroup = yearDim.group().reduceCount();


	// CONFIGURE DATA COUNT (x out of y records shown)
	dataCount.dimension(ndx)
	    .group(all)
	    .html({
	    	some: '<span class="filter-count">%filter-count</span> out of <span class="total-count">%total-count</span> retellings selected. <a href="javascript:dc.filterAll(); dc.renderAll();">View all retellings</a>',
     		all: 'All retellings selected. Click on charts to filter...'
		});


	// CONFIGURE CHART ATTRIBUTES
  countryRowChart.width(400).height(250)
      .dimension(countryDim)
      .group(countryGroup)
      .ordinalColors(colours4) 	         // my range of colours
      .ordering(d => d.key)              // order by name
      .gap(2)
      .elasticX(true)
      .xAxis().ticks(5);                 // --> less ticks! setter so can't chain ie must be last!
      // NB elastic means rescale axis; may want to turn this off

      // RENDERING
    	dc.renderAll();

}); /* close load data */













//
