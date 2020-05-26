
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
    // City search history list 
  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  function getCurrentConditions (response) {

    // Converting the temp from celsius to farenheit
    let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // Creating elements 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.city.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.list[0].main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png")

    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    console.log(response)
    // Clearing the 5 day display of city before 
    $('#forecast').empty();

    let results = response.list;
    console.log(results)
    
    for (let i = 0; i < results.length; i++) {
      let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      console.log(day);

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
    // Converting the temp from celsius to farenheit
        let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        let tempF = Math.floor(temp);

    // Creating elements   
        const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        const cityDate = $("<h4>").addClass("card-title").text(day);
        const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

    // Setting the icon to an image element
        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}