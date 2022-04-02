var fiveDayForecast = document.getElementById("five-content");
var submit = document.getElementById("button");
var query = document.getElementById("query");
var history = document.getElementById("history");
var clear = document.getElementById("clear");

function setFiveDay() {
    var future = document.createElement("div");
    future.setAttribute("id","future");
    var h3 = document.createElement("h3");
    h3.setAttribute("id", "date");
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
    temp.setAttribute("id","temp");
    var wind = document.createElement("p");
    wind.setAttribute("id","wind");
    var humid = document.createElement("p");
    humid.setAttribute("id","humid");

    fiveDayForecast.appendChild(future);
    future.appendChild(h3);
    future.appendChild(img);
    future.appendChild(tempDiv);
    tempDiv.appendChild(pTemp);
    pTemp.textContent = "Temp: ";
    tempDiv.appendChild(temp);
    future.appendChild(windDiv);
    windDiv.appendChild(pWind);
    pWind.textContent = "Wind: ";
    windDiv.appendChild(wind);
    future.appendChild(humidDiv);
    humidDiv.appendChild(pHumid);
    pHumid.textContent = "Humidity: ";
    humidDiv.appendChild(humid);
}
var histlist = [];
console.log(histlist.length);
function deleteHistory() {
    var history = document.getElementById("history");
    for (var i = history.getElementsByTagName('*').length; i > 0; i--) {
        console.log(history.getElementsByTagName('*').length);
        history.removeChild(history.firstChild);
        console.log("hi");
    }
}
function setHistory(query) {
    deleteHistory();
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
    for (var i = 0; i < storedNames.length; i++) {
        setHistory(storedNames[i]);
    }
}
function destroyHistory() {
    window.localStorage.clear();
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

writeHistory();