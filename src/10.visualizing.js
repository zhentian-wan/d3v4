var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

// There are three selection:
// enter: which in the data, but not yet on the page
// upate: which in the data, and also in the page
// exit: which not in the data, but exist on the page


// update function handle those elements which already on the page
var update = d3.select('.chart')
    .selectAll('div')
    .data(scores, function(d) {
        // A compare function which checks whether there are existing elements
        return d ? d.name : this.innerText;
    })
    .style('color', 'blue');

var enter = update.enter()
    .append('div')
    .text(function(d) {
        return d.name;
    })
    .style('color', 'green');

update.exit()
    .style('width', '1px')
    .style('height', '50px')
    .style('background', 'white')
    .style('border', '1px solid black'); 

// You can merge selection by using .merge() function    
update.merge(enter)
    .style('width', d => d.score + 'px')
    .style('height', '50px')
    .style('background', 'lightgreen')
    .style('border', '1px solid black');