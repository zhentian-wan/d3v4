var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

function barOn(selection, onOff) {
    selection.classed('barOn', onOff);
}

function opacity(selection, opacity) {
    selection.style('opacity', opacity);  
}

const bars = d3.select('.chart')
    .append('svg')
        .attr('width', 300)
        .attr('height', 300)
        .style('background', 'white')
    .selectAll('g')
    .data(scores)
    .enter()
        .append('g')
        .attr('transform', (d, i) => 'translate(0, ' + i * 33 + ')');


bars.append('rect')
    .attr('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function(d, i, elements) {
        // transform the hover item to scale 1.1
        d3.select(this).call(barOn, true);

        // set not hover elements to opacity 0.8
        d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(opacity, 0.6);
    })
    .on('mouseout', function(d, i, elements) {
        d3.select(this).call(barOn, false);
        d3.selectAll(elements)
            .call(opacity, 1);
    });

bars.append('text')
    .text(d => d.name)  
    .attr('y', 20)  
    
    
