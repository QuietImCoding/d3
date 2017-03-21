var presdata = [[2.99, 3.54, -552, -3.3, 16.5], [2.55, 3.02, -464, -3.1, 14.9], [2.49, 2.2, 290, 2.3, 12.5], [1.55, 1.97, -413, -4.5, 9.15]];
var diagramdata = [[2.99, 3.54, -.552, -3.3, 16.5], [2.55, 3.02, -.464, -3.1, 14.9], [2.49, 2.2, .290, 2.3, 12.5], [1.55, 1.97, -.413, -4.5, 9.15]];
var svg;
var height, width;

var showdata = function(d, i) {
    updateTable(i);
    updateDiagram(i);
};

var updateDiagram = function(i) {
    var circle = svg.selectAll("circle");
    if (circle.size()==0) {
	setAttributes(
	    circle.data(diagramdata[i]).enter().append("svg:circle")
	);
    } else {
	setAttributes(
	    circle.data(diagramdata[i])
	);
    }
};

var setAttributes = function(selection) {
    selection.attr("cx", function(d, i) {
	return width/5.5 * i + width/11;
    })
	.attr("cy", 250)
    	.transition()
	.attr("r", function(d) { return Math.abs(d) * 10; })
	.attr("stroke", function(d, i) { return "#FFFFFF";})
	.attr("fill", function(d) {
	    if (d > 0) {
		return "#000000"
	    } else {
		return "#FF0000"
	    }
	});
    
}

var updateTable = function(i) {
    var row = d3.select("#tabledata").selectAll("td");
    if (row.size()==0) {
	row.data(presdata[i])
	    .enter()
	    .append("td")
	    .html( function(d) {
		return d;
	    });
    } else {
	row.data(presdata[i])
	    .html( function(d) {
		return d;
	    });
    }
};

var setup = function() {
    d3.selectAll("img").on("click", showdata);
    svg = d3.select("#diagram");
    width = svg.node().getBoundingClientRect().width;
    height = svg.node().getBoundingClientRect().height;
}

window.onload = setup;


