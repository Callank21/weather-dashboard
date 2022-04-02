var fiveDayForecast = document.getElementById("five-content");

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
setFiveDay();
setFiveDay();
setFiveDay();
setFiveDay();
setFiveDay();