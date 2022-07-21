var svg = d3.select('svg');
barChart = svg.append('g').attr('transform', 'translate(850,270)');

var dataAttributes = ['Duration', 'Duration']

var yScale = d3.scaleLinear().range([340,20]);
var xScale = d3.scaleLinear().range([60,700]);
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
var colorScheme = svg.append('g').attr('transform', 'translate(800,60)');

years = [2010, 2011, 2012, 2013, 2014, 2015, 2016]
colorScheme.append('text')
    .attr('class', 'title')
    .attr('transform','translate(50,-15)')
    .text('Movie Year');
var colors = colorScheme.selectAll('g')
    .data(years)
    .enter()
    .append('g')
    .attr("transform",function(d, i){
        return "translate(20," + (20 * i + 5)  + ")";});
var colorBlock = colors.append('rect')
    .attr('class', 'colorblock')
    .attr("width", 15)
    .attr("height", 15)
    .style('fill', function(d){
        return colorScale(d)
    });
var yearLabel = colors.append('text')
    .attr('class', 'title')
    .text(function(d, i) {return d})
    .style("text-anchor:", "middle")
    .attr("transform",  "translate(35,12)");



function onCategoryChanged() {
    var selectX = d3.select('#xaxisSelection').node();
    var categoryX = selectX.options[selectX.selectedIndex].value;

    var selectY = d3.select('#yaxisSelection').node();
    var categoryY = selectY.options[selectY.selectedIndex].value;

    var selectYear = d3.select('#yearSelection').node();
    var categoryYear = selectYear.options[selectYear.selectedIndex].value;
    updateChart(categoryX, categoryY, categoryYear);


}

function dataPreprocessor(row) {
    return {
        'color': row['color'],
        'gross': +row['gross'],
        'genres': row['genres'],
        'actor_1_name': row['actor_1_name'],
        'movie_title': row['movie_title'],
        'number of voted users': +row['num_voted_users'],
        'cast_total_facebook_likes': +row['cast_total_facebook_likes'],
        'actor_3_name': row['actor_3_name'],
        'number of faces in poster': +row['facenumber_in_poster'],
        'plot_keywords': row['plot_keywords'],
        'movie_imdb_link': row['movie_imdb_link'],
        'number of users for reviews': +row['num_user_for_reviews'],
        'language': row['language'],
        'country': row['country'],
        'content_rating': row['content_rating'],
        'budget': +row['budget'],
        'title_year': row['title_year'],

        'actor_2_facebook_likes': +row['actor_2_facebook_likes'],
        'imdb score': +row['imdb_score'],
        'aspect ratio': +row['aspect_ratio'],
        'movie_facebook_likes': +row['movie_facebook_likes'],

        'director_name': row['director_name'],
        'num_critic_for_reviews': +row['num_critic_for_reviews'],
        'duration': +row['duration'],
        'director_facebook_likes': +row['director_facebook_likes'],
        'actor_3_facebook_likes': +row['actor_3_facebook_likes'],
        'actor_2_name': row['actor_2_name'],
        'actor_1_facebook_likes': +row['actor_1_facebook_likes']
    };
}



function updateChart(categoryX, categoryY, yearFilter) {
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-12, 0])
    .html(function(d) {
        return "<h5>"+d['movie_title']+"</h5>";
    });
    var svg = d3.select('svg');
    scatterplot = svg.append('g')
    .attr('transform', 'translate(0,60)');
    categoryX = categoryX.toLowerCase();
    categoryY = categoryY.toLowerCase();
    xmin = 1000000
    xmax = -1000000
    ymin = 1000000
    ymax = -1000000
    newSet = datas
    if (yearFilter == "All") {
        for (var i = 0; i < datas.length; i++) {
            currx = datas[i][categoryX];
            curry = datas[i][categoryY];
            if (currx < xmin){
                xmin = currx
            }
            if (curry < ymin){
                ymin = curry
            }
            if (currx > xmax){
                xmax = currx
            }
            if (curry > ymax){
                ymax = curry
            }
        }
    } else {
        newSet = []
        for (var i = 0; i < datas.length; i++) {
            if (datas[i]["title_year"] == yearFilter) {
                currx = datas[i][categoryX];
                curry = datas[i][categoryY];
                if (currx < xmin){
                    xmin = currx
                }
                if (curry < ymin){
                    ymin = curry
                }
                if (currx > xmax){
                    xmax = currx
                }
                if (curry > ymax){
                    ymax = curry
                }
                newSet.push(datas[i])
            }
        }
    }
    xScale.domain([xmin, xmax]);
    yScale.domain([ymin, ymax]);

    scatterplot.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(xScale).ticks(8).tickFormat(function(d){return d;}));

    scatterplot.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(yScale));

    scatterplot.append('text')
    .attr('class', 'title')
    .attr('transform','translate(360,-30)')
    .text('Movie Scatterplot');


    scatterplot.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text(categoryX);


    scatterplot.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text(categoryY);
    svg.call(toolTip);


    var group = scatterplot
        .selectAll('g')
        .data(newSet)
        .enter()
        .append('g')
        .attr("transform",function(d){
            x = xScale(d[categoryX]);
            y = yScale(d[categoryY]);
            return "translate(" + x + "," + y + ")";});
    var circle = group.append('circle')
        .attr('r', 4)
        .style('fill', function(d){
            return colorScale(d.title_year)
        })
        .on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide)
        .on("click", function(d) {
            barChart.selectAll('g').remove()
            movieInfoBar(d)
        })
        .on("dblclick",function(d){barChart.selectAll('g').remove();});;
    }
function movieInfoBar(movie) {
    var infoList = ["actor_1_facebook_likes",
    "actor_2_facebook_likes", "actor_3_facebook_likes", "director_facebook_likes",
     "cast_total_facebook_likes", "movie_facebook_likes"];
    movieBar = barChart.append('g');
    var barScale = d3.scaleLinear().range([470,250])
    .domain(["actor_1_facebook_likes",
    "actor_2_facebook_likes", "actor_3_facebook_likes", "director_facebook_likes",
     "cast_total_facebook_likes", "movie_facebook_likes"]);
     barChart.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(0,-280)')
    .call(d3.axisLeft(barScale));

    maxx = 0
    for (var i = 0; i < infoList.length; i++) {
        if (maxx < movie[infoList[i]]) {
            maxx = movie[infoList[i]]
        }
    }
    var likesScale = d3.scaleLinear().range([0,300]);
    barChart.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,191.5)')
    .call(d3.axisBottom(likesScale.domain([0, maxx])).ticks(6));;

    var info = movieBar.selectAll('g')
        .data(infoList)
        .enter()
        .append('g')
        .attr("transform",function(d, i){
            return "translate(" + 0 + "," + (-20 + 35 * i) + ")";});
    var bar = info.append('rect')
        .attr('class', ".bar")
        .attr("fill", "purple")
        .attr("width", function(d,i){
            return likesScale(movie[infoList[i]])
        })
        .attr("height", 25);
    movieBar.append('text')
    .attr('class', 'title')
    .attr('transform','translate(120,-40)')
    .text(movie["movie_title"]);
    var attr = info.append('text')
        .text(function(d, i) {return infoList[i]})
        .attr('class', 'g')
        .style("text-anchor:", "end")
        .attr("font-size","10px")
        .attr("transform",  "translate(-116,13)");

}






d3.select("#xaxisSelection").on("change", function (d) {
    scatterplot.selectAll('g').remove()
    scatterplot.selectAll('text').remove()
        onCategoryChanged()
    })
d3.select("#yaxisSelection").on("change", function (d) {
        scatterplot.selectAll('g').remove()
        scatterplot.selectAll('text').remove()
        onCategoryChanged()
    })
d3.select("#yearSelection").on("change", function (d) {
        scatterplot.selectAll('g').remove()
        scatterplot.selectAll('text').remove()
        onCategoryChanged()
    })

d3.csv('movies.csv', dataPreprocessor).then(function(dataset) {
        datas = dataset;
        updateChart("Duration", "Duration", "All")
    });

