
// **** Your JavaScript code goes here ****
d3.csv('baseball_hr_leaders_2017.csv').then(function(datum){

    var p = d3.select("#homerun-leaders").selectAll("p")
    .data(datum)
    .enter()
    .append("p")
    .text(function(d,i) { return datum[i].rank + ". " + datum[i].name + " with " + datum[i].homeruns + " home runs"; })
    .style('font-size', '14px')
    .style('font-weight', function(d, i) {
        return d.rank == '1' ? 'bold' : 'normal';
    });

    var table = d3.select("#homerun-leaders").append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');
    var columns = ["Rank", "Player", "Home Runs"]
    var trh = thead.append('tr')
    var tdh = trh.selectAll('td')
      .data(columns)
      .enter()
      .append('td')
      .text(function (column) { return column; })
      .style('background-color',"#1024");
    var tr = tbody.selectAll('tr')
      .data(datum)
      .enter()
      .append('tr')
    cells = tr.selectAll('td')
      .data(function(row) {
        values = []
        for (var key in row){
            if (key != "year"){values.push(row[key])}
        }
        return values
        })
        .enter()
        .append("td")
        .text(function(d) {return d; })
        .style("text-align", "center");

});