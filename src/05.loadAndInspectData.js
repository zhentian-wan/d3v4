function loadData() {
    d3.json('data/data.json', function(data) {
        var extent = d3.extent(data, function (d) {
            return d.age
        }); // get the value range
        console.log("#Extent", extent);

        var min = d3.min(data, function (d) {
            return d.age
        });
        console.log("#Min", min);

        var max = d3.max(data, function (d) {
            return d.age
        });
        console.log("#Max", max);

        var ages = d3.set(data, function(d) {
            return d.age
        }); // get unique value out of data
        console.log("#Ages", ages.values());

        var scale = d3.scaleLinear()
            .domain(extent)
            .range([0,100]);

        console.log(scale(23))
    })
}
