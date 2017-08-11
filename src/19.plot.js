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




/**
 * Load data
 */
d3.json('../data/data2.json', function (err, data) {
    /**
     * Add Y axis
     */
    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.expectancy))
        .range([height, 0])
        .nice();
    var yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    /**
     * Add X axis
     */
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.cost))
        .range([0, width])
        .nice();

    var xAxis = d3.axisBottom(xScale);
    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    // For circle, we need scaleSqrt    
    var rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, 40]);

    // Create some container to contain the circles
    var circles = svg.selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'ball')
        .attr('transform', d => {
            return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`
        });

    // Add circle to each containers    
    circles
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => rScale(d.population))
        .style('opacity', 0.5)
        .style('fill', 'steelblue');

    // Add text    
    circles
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('y', 4)
        .text(d => d.code)    
});







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