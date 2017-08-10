var margin = { top: 10, right: 20, bottom: 60, left: 25 };
var width = 425 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green');

  /**
   * Create Y axis
   */
  // Set scale
  const yScale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([height, 0]);
  // add y-axis  
  const yAxis = d3.axisLeft(yScale);
  // const yAxis = d3.axisLeft(yScale).ticks(10, '.1s');
  // If you want to add fine control about the ticks:
  // const yAxis = d3.axisLeft(yScale).tickValues([5,10,30,50,80,100]);
  // add to the svg
  svg.call(yAxis);    


  /**
   * Create X axis
   */
  const xScale = d3.scaleTime()
    .domain([new Date(2017, 6, 1),  new Date(2017, 7, 1)])
    .range([0, width]);

    //https://github.com/d3/d3-time
  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeDay.every(4))
    .tickSize(10)
    .tickPadding(15);

  svg.append('g')
        .attr('transform', `translate(0, ${height})`)
     .call(xAxis);   
  

  
