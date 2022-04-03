var fiveDayForecast = document.getElementById("five-content");
var submit = document.getElementById("button");
var query = document.getElementById("query");
var history = document.getElementById("history");
var clear = document.getElementById("clear");
var currentDate = document.getElementById("cdate");
const d = new Date();

function setFiveDay(index) {
    var future = document.createElement("div");
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

    fiveDayForecast.appendChild(future);
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
function setFiveDaystats(index,temperature,wind_speed,humidity,day) {
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
function deleteHistory() {
    var history = document.getElementById("history");
    for (var i = history.getElementsByTagName('*').length; i > 0; i--) {
        console.log(history.getElementsByTagName('*').length);
        history.removeChild(history.firstChild);
    }
}

function setHistory(query) {
    deleteHistory();
    searchQuery(query);
    var city = document.getElementById("city");
    city.textContent = query + " ";
    var history = document.getElementById("history");
    console.log(histlist.length);
    if (histlist.length == 0) {
        var location = document.createElement("button");
        histlist.push(query);
        console.log(histlist.length);
        storingLocal();
        history.appendChild(location);
        location.textContent = histlist[0];
    }
    else if (histlist.length < 10){
        histlist.splice(0,0,query);
        console.log(histlist.length);
        storingLocal();
        for (var i = 0; i < histlist.length; i++) {
            var location = document.createElement("button");
            history.appendChild(location);
            location.textContent = histlist[i];
        }
    }
    else if (histlist.length >= 10) {
        histlist.length = 9;
        histlist.splice(0,0,query);
        for (var i = 0; i < histlist.length; i++) {
            var location = document.createElement("button");
            history.appendChild(location);
            location.textContent = histlist[i];
        }
    }
}

function storingLocal() {
    localStorage.setItem("names", JSON.stringify(histlist));
}

function writeHistory() {
    var storedNames = JSON.parse(localStorage.getItem("names"));
    if (storedNames) {
        for (var i = 0; i < storedNames.length; i++) {
            setHistory(storedNames[i]);
        }
    }
}

function destroyHistory() {
    window.localStorage.clear();
}

function searchQuery(query) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=23551cfb9a93dcdae75a00d025e1f9f8`)
        .then(function (response) {
            response.json()
                .then(function (response) {
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response[0].lat}&lon=${response[0].lon}&exclude=minutely,hourly,alerts&appid=23551cfb9a93dcdae75a00d025e1f9f8&units=imperial`)
                    .then(function(response) {
                        response.json()
                        .then(function (response) {
                            setCurrentWeather(response.current.temp,response.current.wind_speed,response.current.humidity,response.current.uvi);
                            for (var i = 1; i < 6; i++) {
                                setFiveDaystats(i,response.daily[i].temp.day,response.daily[i].wind_speed,response.daily[i].humidity,d.getDate()+i);
                            }
                        })
                    })
                })
        })
}

function setCurrentWeather(temp, wind, humid, uv) {
    var ctemp = document.getElementById("ctemp");
    ctemp.textContent = temp;
    var cwind = document.getElementById("cwind");
    cwind.textContent = wind;
    var chumid = document.getElementById("chumid");
    chumid.textContent = humid;
    var cuv = document.getElementById("cuv");
    cuv.textContent = uv;
}

submit.addEventListener("click", function(){
 if (query.value) {
     setHistory(query.value);
 }
});
document.getElementById("history").addEventListener("click", function(event){
    setHistory(event.target.textContent);
});
clear.addEventListener("click", function() {
    destroyHistory();
})
currentDate.textContent = `(${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()})`;
for (var i = 1; i < 6; i++) {
    setFiveDay(i);
}
writeHistory();