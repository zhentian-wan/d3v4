var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

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
    .attr('class', 'bar');

bars.append('text')
    .text(d => d.name)  
    .attr('y', 20)  
    
    
