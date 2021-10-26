// draw smple world map from topojson

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

//d3.json('/assets/countries-110m.topojson.json').then(world => {

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
