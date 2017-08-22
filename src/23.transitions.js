d3.select('#block')
    .transition()
        .call(configure, 200, 600, d3.easePolyOut)
        .style('width', '400px')
    .transition()
        .call(configure, 0, 600, d3.easeBounceOut)
        .style('height', '500px')
    .transition()
        .call(configure, 0, 1200, d3.easeQuadOut)
        .style('background-color', 'gold') ;

function configure (transition, delay, duration, ease) {
    return transition.delay(delay).duration(duration).ease(ease);
}
    