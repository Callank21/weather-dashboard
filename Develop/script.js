var fiveDayForecast = document.getElementById("five-content"); //div for 5 day forecast
var submit = document.getElementById("button"); // submit button to enter a query
var query = document.getElementById("query"); // search bar
var history = document.getElementById("history"); // the history tab underneath the search bar
var clear = document.getElementById("clear"); // clears the local storage
var currentDate = document.getElementById("cdate"); // inserts the date into the current time
const d = new Date(); //enables the date call from native javascript

function setFiveDay(index) { 
    var future = document.createElement("div"); //creates the elements for the 5 day forecast
    future.setAttribute("id","future");
    var h3 = document.createElement("h3");
    h3.setAttribute("id", `date${index}`);
    var img = document.createElement("img");
    var tempDiv = document.createElement("div");
    tempDiv.setAttribute("id", "title");
    var windDiv = document.createElement("div");
    windDiv.setAttribute("id", "title");
    var humidDiv = document.createElement("div");
    humidDiv.setAttribute("id", "title");
    var pTemp = document.createElement("p");
    var pWind = document.createElement("p");
    var pHumid = document.createElement("p");
    var temp = document.createElement("p");
    temp.setAttribute("id",`temp${index}`);
    var wind = document.createElement("p");
    wind.setAttribute("id",`wind${index}`);
    var humid = document.createElement("p");
    humid.setAttribute("id",`humid${index}`);

    fiveDayForecast.appendChild(future); // writes them to the page
    future.appendChild(h3);
    future.appendChild(img);
    future.appendChild(tempDiv);
    tempDiv.appendChild(pTemp);
    pTemp.textContent = `Temp: `;
    tempDiv.appendChild(temp);
    future.appendChild(windDiv);
    windDiv.appendChild(pWind);
    pWind.textContent = `Wind: `;
    windDiv.appendChild(wind);
    future.appendChild(humidDiv);
    humidDiv.appendChild(pHumid);
    pHumid.textContent = `Humidity: `;
    humidDiv.appendChild(humid);
}
function setFiveDaystats(index,temperature,wind_speed,humidity,day) { //writes the search results to the 5 day section
    var temp = document.getElementById(`temp${index}`);
    temp.textContent = ` ${temperature}`;
    var wind = document.getElementById(`wind${index}`);
    wind.textContent = ` ${wind_speed}`;
    var humid = document.getElementById(`humid${index}`);
    humid.textContent = ` ${humidity}`;
    var date = document.getElementById(`date${index}`);
    date.textContent = `${d.getMonth()+1}/${day}/${d.getFullYear()}`;

}

var histlist = [];
console.log(histlist.length);
function deleteHistory() { // clears the history buttons when a new result is input so the other function can write the correct amount of buttons plus 1 to that section
    var history = document.getElementById("history");
    for (var i = history.getElementsByTagName('*').length; i > 0; i--) {
        console.log(history.getElementsByTagName('*').length);
        history.removeChild(history.firstChild);
    }
    histlist = [];
}

function setHistory(query) { // sets up and writes the queries from the search bar to a list that then is written as the descending list of old search queries
    deleteHistory();
    searchQuery(query);
    var city = document.getElementById("city");
    city.textContent = query + " ";
    var history = document.getElementById("history");
    console.log(histlist.length);
    if (histlist.length == 0) { // if the list is empty, push the first query into it
        var location = document.createElement("button");
        histlist.push(query);
        console.log(histlist.length);
        storingLocal();
        history.appendChild(location);
        location.textContent = histlist[0];
    }
    else if (histlist.length < 10){ //if the list is less than 10, splice the following results to the front of the list
        histlist.splice(0,0,query);
        console.log(histlist.length);
        storingLocal();
        for (var i = 0; i < histlist.length; i++) {
            var location = document.createElement("button");
            history.appendChild(location);
            location.textContent = histlist[i];
        }
    }
    else if (histlist.length >= 10) { // if the list is longer than 10, reduce the list back to 9 then push the current result to the list, effectively deleting the last result
        histlist.length = 9;
        histlist.splice(0,0,query);
        for (var i = 0; i < histlist.length; i++) {
            var location = document.createElement("button");
            history.appendChild(location);
            location.textContent = histlist[i];
        }
    }
}

function storingLocal() { // store the list as a string inside local storage
    localStorage.setItem("names", JSON.stringify(histlist));
}

function writeHistory() { //when the page is reloaded, it writes the content of the list back to the page
    var storedNames = JSON.parse(localStorage.getItem("names"));
    if (storedNames) {
        for (var i = 0; i < storedNames.length; i++) {
            setHistory(storedNames[i]);
        }
    }
}

function destroyHistory() { // eliminates the list from local storage and resets the history
    window.localStorage.clear();
    deleteHistory();
    
}

function searchQuery(query) { //makes a call to the open weather api with the search query
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=23551cfb9a93dcdae75a00d025e1f9f8`) // this is to get the longitude latitude from the search result
        .then(function (response) {
            response.json()
                .then(function (response) { // this takes the lat lon and gets back the temp, wind speed, humidity, and uvi
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response[0].lat}&lon=${response[0].lon}&exclude=minutely,hourly,alerts&appid=23551cfb9a93dcdae75a00d025e1f9f8&units=imperial`)
                    .then(function(response) {
                        response.json()
                        .then(function (response) {// this send the data to setCurrentWeather- the main dashboard
                            setCurrentWeather(response.current.temp,response.current.wind_speed,response.current.humidity,response.current.uvi);
                            for (var i = 1; i < 6; i++) { // sends the data to the five day forecast
                                setFiveDaystats(i,response.daily[i].temp.day,response.daily[i].wind_speed,response.daily[i].humidity,d.getDate()+i);
                            }
                        })
                    })
                })
        })
}

function setCurrentWeather(temp, wind, humid, uv) { //this sets up the data for the current weather on the main dashboard
    var ctemp = document.getElementById("ctemp");
    ctemp.textContent = temp;
    var cwind = document.getElementById("cwind");
    cwind.textContent = wind;
    var chumid = document.getElementById("chumid");
    chumid.textContent = humid;
    var cuv = document.getElementById("cuv");
    cuv.textContent = uv;
}

submit.addEventListener("click", function(){ //this listens for is something is inserted into the search bar
 if (query.value) {
     setHistory(query.value);
 }
});
document.getElementById("history").addEventListener("click", function(event){ //this gets the value of the button query and sends it to the search query again
    setHistory(event.target.textContent);
});
clear.addEventListener("click", function() { // this deletes the history stored in local storage
    destroyHistory();
})
currentDate.textContent = `(${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()})`; // this sets the current date on the main dashboard
for (var i = 1; i < 6; i++) { // this sets up the 5 day forecast blocks
    setFiveDay(i);
}
writeHistory(); //this sets up the last result to the page as it loads