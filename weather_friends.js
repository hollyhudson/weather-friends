let margin = {top: 50, right: 20, bottom: 80, left: 50};
let width = 960 - margin.left - margin.right;
let height = 700 - margin.top - margin.bottom;

let xScale1 = d3.scaleLinear().range([0, width]);
let xScale2 = d3.scaleLinear().range([0, width]);
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
	
	// format incoming data
	data_city1.hourly_forecast.forEach(function(d1) {
		d1.hour = +d1.FCTTIME.hour;
		d1.temp = +d1.temp.metric;
		d1.pop = +d1.pop;	// probability of precipitation
	});
	data_city2.hourly_forecast.forEach(function(d2) {
		d2.hour = +d2.FCTTIME.hour;
		d2.temp = +d2.temp.metric;
		d2.pop = +d2.pop;	// probability of precipitation
	});
	
	// create arrays for the two x axes
	let xLabels1 = data_city1.hourly_forecast.map(function(d1) {return d1.hour; });
	let xLabels2 = data_city2.hourly_forecast.map(function(d2) {return d2.hour; });
	
	xScale1.domain([ xLabels1[0], xLabels1[xLabels1.length - 1] ]);
	xScale2.domain([ xLabels2[0], xLabels2[xLabels2.length - 1] ]);
	
	yScale.domain([ 
		find_min(data_city1.hourly_forecast.temp, data_city2.hourly_forecast.temp), 
		find_max(data_city1.hourly_forecast.temp, data_city2.hourly_forecast.temp) 
	]);
	console.log(yScale.domain);
}

function find_min(array1, array2) {
	if (Math.min(array1) < Math.min(array2)) {
		return Math.min(array1);
	}
	return Math.min(array2);
}

function find_max(array1, array2) {
	if (Math.max(array1) < Math.max(array2)) {
		return Math.max(array1);
	}
	return Math.max(array2);
}
