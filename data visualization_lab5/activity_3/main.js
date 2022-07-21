// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category);
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var lettersMap = {
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOUY'.split('')
};

d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // **** Your JavaScript code goes here ****
    letters =  dataset
    frequency_scale = d3.scaleLinear()
        .domain([0, d3.max(letters, function(d) { return d.frequency; })])
        .range([0, chartWidth])
    formatter = d3.format(".0%");
    var xAxis = d3.axisBottom(frequency_scale).tickFormat(formatter).ticks(7);
    var xAxis2 = d3.axisTop(frequency_scale).tickFormat(formatter).ticks(7);

    // top axis
    xaxis = chartG
    .append('g')
    .call(xAxis)
    .attr("transform", "translate(0," + chartHeight + ")")
    .selectAll("text")
    .style("fill", "black")
    .style("font-size", "9px");;

    // bottom axis
    chartG.append('g')
    .call(xAxis2)
    .attr("transform", "translate(0," + -3 + ")")
    .selectAll("text")
    .style("fill", "black")
    .style("font-size", "9px");

    // bar chart label
    svg.append('text')
    .attr('class', 'title')
    .attr('transform',function(d){
        return 'translate('+(chartWidth/2 + 40)+',' + (padding.t/2 -2)+')'
    })
    .text("Letter Frequency (%)")
    .style("font-size", "12px")
    .style('fill', 'black')
    .attr("text-anchor", "middle");

    updateChart('all-letters');
});


function updateChart(filterKey) {
    // **** Draw and Update your chart here ****
    // bind to new data
    var cutoff = document.getElementById("cutoff").value;
    // Create a filtered array of letters based on the filterKey
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0;
    });
    lets = [];
    var letter = chartG.selectAll('.bar')
    .data(filteredLetters.filter(function(d){
        if (d.frequency >= cutoff) {
            return d;
        }

    }), d => d.letter);


    var letterEnter = letter.enter().append('g')
    .attr('class', 'bar');


    letterEnter.merge(letter)
        .attr("transform", function(d,i) { return 'translate(' + [0, i*19.6 +3]+ ')'; })

    letterEnter
    .append("rect")
    .attr("width", function(d) {return frequency_scale(d.frequency); } )
    //.attr("band", barBand)
    .attr("height", barHeight);

    letterEnter
    .append("text")
    .text(function(d) {return d.letter; })
    .attr('x', -20)
    .attr("y", function(d,i) { return barHeight; })
    .style("fill", "black");

    letter.exit().remove();


}
var main = document.getElementById('main');
d3.select(main)
    .append('p')
    .append('button')
    .style("border", "1px solid black")
    .text('Filter Data')
    .on('click', function() {
        onCategoryChanged();
    });

// Remember code outside of the data callback function will run before the data loads