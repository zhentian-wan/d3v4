function scaleLinear() {
    /**
     * Created by wanzhen on 2.12.2016.
     */
    var color = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(["red", "white", "green"]);

    console.log(color(-0.5)); // "rgb(255, 128, 128)"
    console.log(color(+0.5)); // "rgb(128, 192, 128)"

// If clamping is enabled, the return value of the scale is always within the scale’s range.
    var number = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 500])
        .clamp(true);

    console.log(number(0)); // 0
    console.log(number(50)); // 250
    console.log(number(100)); // 500
    console.log(number(105)); // 500 -- with clamp(true)
    console.log(number(105)); // 525 -- without clamp(true)

    var number = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 500]);

// Given a value from the range, returns the corresponding value from the domain.
    console.log(number.invert(500)); // 100
    console.log(number.invert(250)); // 50
    console.log(number.invert(100)); // 20
    console.log(number.invert(0)); // 0 -- with clamp(true)
    console.log(number.invert(-10)); // -2 -- without clamp(true)
}