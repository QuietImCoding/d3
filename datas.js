var presdata = [[2.99, 3.54, -552, -3.3, 16.5], [2.55, 3.02, -464, -3.1, 14.9]];

var showdata = function(d, i) {
    thing = d3.select("#tabledata");
    thing.data(presdata[i]);
    thing.enter();
    thing.append("td").text
    console.log(i);
};

var setup = function() {
    d3.selectAll("img").on("click", showdata);
}

window.onload = setup;


