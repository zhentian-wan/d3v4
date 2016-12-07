function scaleQuantize(){
    var quantizeScale = d3.scaleQuantize()
        .domain([0, 100])
        .range(["red", "white", "green"]);

    console.log(quantizeScale(22)); // red
    console.log(quantizeScale(50)); // white
    console.log(quantizeScale(88)); // green

    // Get the boundaries domain for "white" color
    console.log(quantizeScale.invertExtent('white'));
}