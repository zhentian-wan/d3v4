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

let data = [159, 25, 13, 46, 401, 353, 325, 49, 65, 221, 344, 388, 206, 415, 418, 490, 195, 481, 326, 170, 433, 264, 341, 190, 487, 293, 287, 16, 95, 245, 364, 364, 191, 360, 353, 217, 213, 268, 332, 411, 105, 76, 148, 442, 84, 394, 427, 151, 496, 462, 370, 267, 106, 266, 407, 387, 432, 252, 426, 272, 352, 96, 82, 93, 379, 426, 351, 409, 149, 362, 60, 117, 410, 156, 233, 107, 75, 414, 359, 103, 198, 492, 289, 23, 97, 265, 150, 467, 243, 91, 256, 205, 27, 469, 305, 263, 376, 267, 184, 215];
/**
 * Y axis
 */
const yScale = d3.scaleLinear()
    .domain([Math.min(...data), Math.max(...data)])
    .range([height, 0])
    .nice();
const yAxis = d3.axisLeft(yScale);
svg.call(yAxis);

/**
 * x axis
 */
const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);
const xAxis = d3.axisBottom(xScale);
svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

/**
 * Create lines
 */  
const line = d3.line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5)); 
    
const tuples = data
    .map((d, i) => [i, d])
    .map(([x, y]) => ({
        x: xScale(x), 
        y: yScale(y)
    }));    

svg
    .selectAll('.line')
    .data(tuples)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(tuples)) // draw the line
    .style('stroke', '#FF9900')
    .style('stroke-width', 2)
    .style('fill', 'none');

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