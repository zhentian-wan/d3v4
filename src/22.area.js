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
d3.json('../data/data3.json', function (err, data) {
    const parseTime = d3.timeParse('%Y/%m/%d');

    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date)
            d.close = +d.close
        })
    })

    /**
     * Y axis
     */
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.close)),
            d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0])
        .nice();
    const yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    /**
     * x axis
     */
    const xScale = d3.scaleTime()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.date)),
            d3.max(data, co => d3.max(co.values, d => d.date))
        ])
        .range([0, width])
        .nice();
    const xAxis = d3.axisBottom(xScale).tickSize(10).tickPadding(5);
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');

    console.log("yScale(yScale.domain()[0])", yScale(yScale.domain()[0])); //680
    /**
     * Creat area chart
     */    
    const area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('d', d =>  area(d.values))    
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('sroke-width', 2)
        .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('fill-opacity', 0.5);
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