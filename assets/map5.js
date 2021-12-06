// d3: draw simple world map from topojson
// =======================================

var colours = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00'];

var width = 700,
    height = 450;

var svg = d3.select("#citiesMap").append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geoMercator()
    //.scale(280)                             // zoom in
    //.center([-25, 30 ]);                    // center to focus on EU + US
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 1.8])

var path = d3.geoPath()
    .projection(projection);

var mapurl = '/fairytales/assets/countries-110m.topojson.json';
var placesurl = '/fairytales/assets/map5.csv';       // just copy off google maps
Promise.all([d3.json(mapurl), d3.csv(placesurl)]).then(function(data) {
    //if (error) throw error;

    var world = data[0];
    var places = data[1];

    // Add a scale for bubble color - all types of place
    myColor = d3.scaleOrdinal()
        .domain(places.map(d => d.type).sort())   // all types; sorted az
        .range(colours);

//types = places.map(d => d.type);
//console.log (types)


    // draw map
    svg.selectAll("path")
       .data(topojson.feature(world,world.objects.countries).features)
       .enter().append("path")
       .attr("fill", "#d6dadd")
       //.attr("stroke", "white")
       .attr("d", path);

    // draw bubbles for places
    // NB WILL NEED TO JITTER IF DUPLICATES - REVIEW DATA FIRST AND ADD 2


    // Add a scale for bubble size
    //maxZ = Math.max.apply(Math, cityYearGroup.top(Infinity).map(function(o) { return o.value; }));
    //z = d3.scaleLinear().domain([0, maxZ]).range([0, 10]);
    // want 0=0; 1 = visible; linear not ideal see https://bl.ocks.org/guilhermesimoes/e6356aa90a16163a6f917f53600a2b4a
    z = d3.scaleSqrt()
       //.domain([0, maxZ2])   // NB grab from data?   eg counts from cityYearGroup ie per city
       .domain([0, 150])
       .range([1, 20]);     // start at 5 so smallest not too small (won't call for zero)


    // 1 - all places in grey ("total")

    svg.selectAll("circle")
       	.data(places)
        .enter()
       	.append("circle")
       	//.attr("r", 12)                                           //  (fixed size)
        .attr("r", function (d) {
            if (d.total == '') {
              return 0;                // 0 so wont show
            }
            else {
              return z(d.total);      // WAS scale 5-25 so 1 is not too small!
            }
        })
       	.attr("cx", function(d) {	return projection([d.lng, d.lat])[0]; })
       	.attr("cy", function(d) {	return projection([d.lng, d.lat])[1]; })
       	.attr("fill", "#808B96")  // all grey
        //.attr("fill", function (d) { return myColor(d.type[0]); } )  // colour = type NB cant have "author" and "authororigin" !!
       	.attr("opacity", 0.8)


    // 2 - this place in blue ("this") 3498DB
    svg.selectAll("circle2")
       	.data(places)
        .enter()
       	.append("circle")
       	// .attr("r", 12)                                           //  (fixed size)
        .attr("r", function (d) {
            if (d.this == '') {
              return 0;                // 0 so wont show
            }
            else {
              // this is the selected place; use value from TOTAL so hides the grey bubble
              return z(d.total);      // scale 5-25 so 1 is not too small!
            }
        })
       	.attr("cx", function(d) {	return projection([d.lng, d.lat])[0]; })
       	.attr("cy", function(d) {	return projection([d.lng, d.lat])[1]; })
       	.attr("fill", "#3498DB")


    // 3 - connected places in -green #27AE60- orange ff7f00 ("connected")
    svg.selectAll("circle3")
       	.data(places)
        .enter()
       	.append("circle")
       	// .attr("r", 12)                                           //  (fixed size)
        .attr("r", function (d) {
            if (d.connected == '') {
              return 0;                // 0 so wont show
            }
            else {
              // use value from CONNECTED so may be only PART of grey bubble size
              return z(d.connected);      // scale 5-25 so 1 is not too small!
            }
        })
       	.attr("cx", function(d) {	return projection([d.lng, d.lat])[0]; })
       	.attr("cy", function(d) {	return projection([d.lng, d.lat])[1]; })
       	.attr("fill", "#ff7f00")
/*
*/







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
