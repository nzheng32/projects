
// **** Your JavaScript code goes here ****
d3.csv('./baseball_hr_leaders.csv').then(function(datum){
    var svg = d3.select('svg');
    var circles = svg.selectAll('circle')
        .data(datum)
        .enter()
        .append('circle')
        .attr('cx', function(d, i) {
        return yearScale(d.year)
    })
        .attr('cy', function(d, i) {
        return scaleHomeruns(d.homeruns)
    })
        .attr('r', 2)
        .style('fill', function(d, i) { return d.rank in ['1','2','3'] ? "#ffab10": "#5096a4"});

});


// **** Functions to call for scaled values ****

function scaleYear(year) {
    return yearScale(year);
}

function scaleHomeruns(homeruns) {
    return hrScale(homeruns);
}

// **** Code for creating scales, axes and labels ****
var yearScale = d3.scaleLinear()
    .domain([1870,2017]).range([60,700]);

var hrScale = d3.scaleLinear()
    .domain([0,75]).range([340,20]);

var svg = d3.select('svg');

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('MLB Season');

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(hrScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('Home Runs (HR)');

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,30)')
    .text('Top 10 HR Leaders per MLB Season');