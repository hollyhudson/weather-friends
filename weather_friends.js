let margin = {top: 50, right: 20, bottom: 80, left: 50};
let width = 960 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;

let xScale = d3.scaleLinear().range([0, width]);
let yScale = d3.scaleLinear().range([height, 0]);

// city1 will be the base timeline on the x-axis
// city2 will be time-aligned with city1, so the noons line up
let weather_chart = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load the data from the two cities, 
// and trim hours that are not in both data sets.
d3.queue()
	.defer(d3.json, "http://api.wunderground.com/api/975e0365197a9aa1/conditions/hourly10day/q/NY/Brooklyn.json") 
	.defer(d3.json, "http://api.wunderground.com/api/975e0365197a9aa1/conditions/hourly10day/q/Netherlands/Amsterdam.json")
	.await(assemble_chart);

function assemble_chart(error, data_city1, data_city2) {
	if (error) console.log("no data");

	// verify data
	console.log(data_city1.hourly_forecast[1].temp.metric);

	// verify data
	console.log(data_city2.hourly_forecast[1].temp.metric);
	
}

/*
// load the data for the first city
	if (error) console.log("no data");

	// format incoming data
	data_city1.hourly_forecast.forEach(function(d) {
		d.hour = +d.FCTTIME.hour;
		d.temp = +d.temp.metric;
		d.pop = +d.pop;	// probability of precipitation
	});

	
	
});

// load the data for the second city
	if (error) console.log("no data");

	data_city2.hourly_forecast.forEach(function(d) {
		d.hour = +d.FCTTIME.hour;
		d.temp = +d.temp.metric;
		d.pop = +d.pop;	// probability of precipitation
	});
	
});
*/
