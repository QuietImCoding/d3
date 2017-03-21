var presdata = [[2.99, 3.54, -552, -3.3, 16.5], [2.55, 3.02, -464, -3.1, 14.9], [2.49, 2.2, 290, 2.3, 12.5], [1.55, 1.97, -413, -4.5, 9.15]];
var diagramdata = [[2.99, 3.54, -.552,  16.5, -3.3], [2.55, 3.02, -.464, 14.9, -3.1], [2.49, 2.2, .290, 12.5, 2.3], [1.55, 1.97, -.413, 9.15, -4.5]];

var svg;
var height, width;
var curpres;

var showdata = function(d, i) {
    curpres = i;
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
	if (i < 2) {
	    return width/4;
	} else if (i != 2) {
	    return 3*width/4;
	}
	
    })
	.attr("cy", 100)
    	.transition()
	.attr("r", function(d, i) {
	    if (i < 2) {
		return (height/2) * (d/3.54);
	    } else if (i == 3) {
		return (height/2) * (d/16.5);
	    } else if (i==4) {
		//return (height/2) * ((diagramdata[curpres][3]/16.5) * (d/100)));
		//console.log(diagramdata[curpres][3]);
		return (height/2) * Math.abs(diagramdata[curpres][3]/16.5 * (d/50));
	    }
	})
	.attr("stroke", function(d, i) {
	    if (i == 4) {
		if (d > 0) {
		    return "midnightblue";
		}
	    }
	})
	.attr("fill", function(d, i) {
	    if (i==0) {
		return "#00FF00";
	    } else if (i==1) {
		return "#FF0000";
	    } else if (i==3 || i==4) {
		if (d < 0) {
		    return "midnightblue";
		} else {
		    return "#FFFFFF";
		}
	    }
	})
	.attr("fill-opacity", function(d, i) {
	    if (i < 2) { return 0.5; }
	    else { return 1; }
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


