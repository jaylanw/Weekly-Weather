
let city = $("#searchCity").val();
const apiKey = "&appid=2290ee7537707336630d1f72e7a06c7a";
let date = new Date();


$("#searchCity").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {
  // Displaying the 5-Day Forecast
  $("#forecastDays").addClass('show');

  // Placing the City seached for into a variable
  city = $("#searchCity").val();
  
  // Clearing the input 
  $("#searchCity").val("");  

  const queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

    console.log(response)
    console.log(response.city.name)
    console.log(response.list[0].weather[0].icon)
    let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF))
    console.log(response.list[0].main.humidity)
    console.log(response.list[0].wind.speed)
    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });
