var margin = {
    top: 10,
    right: 20,
    bottom: 65,
    left: 40
};
var width = 400 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



var data = [{
        name: 'Alice',
        math: 37,
        science: 62,
        language: 54
    },
    {
        name: 'Billy',
        math: null,
        science: 34,
        language: 85
    },
    {
        name: 'Cindy',
        math: 86,
        science: 48,
        language: null
    },
    {
        name: 'David',
        math: 144,
        science: null,
        language: 65
    },
    {
        name: 'Emily',
        math: 59,
        science: 55,
        language: 29
    }
];


/**
 * Y axis
 */
const yScale = d3.scaleLinear()
    .domain([
        0, 100
    ])
    .range([height, 0]);
const yAxis = svg
    .append('g')
    .call(d3.axisLeft(yScale));

/**
 * x axis
 */
const xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2);
const xAxis = d3.axisBottom(xScale).tickSize(10).tickPadding(5);
svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-45)');

// enter: which in the data, but not yet on the page
// upate: which in the data, and also in the page
// exit: which not in the data, but exist on the page
// end


function render(subject = 'math') {

    // Define a resuable transation variable
    var t = d3.transition().duration(1000);

    var update = svg.selectAll('rect')
        .data(data.filter(d => d[subject]), d => d.name); //d => d.name is a uniq idientifier

    // First: we want to remove the existing object which doesn't have any value
    // Get rid of null value object
    // Also animation y and height attr to produce
    // fade out effect 
    update
        .exit()
        .transition(t)
        .attr('y', height)
        .attr('height', 0)
        .remove();

    // Update the y axis with animation
    yScale.domain(
        [0, d3.max(data, d => d[subject])]
    );
    yAxis
        .transition(t)
        .delay(1000)
        .call(d3.axisLeft(yScale));

    // Second, we want to animate the existing elements height    
    update
        .transition(t)
        .delay(1000)
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]));

    // Last, for the new data which is not in the page before
    // We want to animate    
    update
        .enter()
        .append('rect')
        .attr('y', height)
        .attr('height', 0)
        .attr('x', d => xScale(d.name))
        .attr('width', d => xScale.bandwidth())
        .transition(t)
        .delay(update.exit().size() ? 2000 : 0) // If page refresh, we don't want to wait 2000ms
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]));
}

render();


function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}