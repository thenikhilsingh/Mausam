let searchbtn = document.querySelector(".searchbtn");
let tempChangBtn = document.querySelector(".tempChangBtn");
let locationDisplay = document.querySelector(".cont2");
let temperature = document.querySelector("#temp");
let temperaturefeelslike = document.querySelector("#subtemp");
let whether = document.querySelector("#whehterImg");
let humidity = document.querySelector("#humid");
let wind = document.querySelector("#win");
let tempdeg = document.querySelector("#tempdeg");
let subtempdeg = document.querySelector("#subtempdeg");

async function getWhetherInfo(cityname) {
  try {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=f94434843b14b71ab4f3f892f5377fa4`;
    let response = await fetch(api);
    let whetherInfo = await response.json();
    let locationName = whetherInfo.name;
    let temperatureNum = whetherInfo.main.temp;
    let temperatureFeels = whetherInfo.main.feels_like;
    let weatherdisc = whetherInfo.weather[0].main;
    let humidnum = whetherInfo.main.humidity;
    let windnum = whetherInfo.wind.deg;
    return {
      locationName,
      temperatureNum,
      temperatureFeels,
      weatherdisc,
      windnum,
      humidnum,
    };
  } catch (error) {
    console.log(error);
  }
}

searchbtn.addEventListener("keypress", async (e) => {
  if (e.key == "Enter") {
    let cityname = searchbtn.value;
    let { locationName, temperatureNum, temperatureFeels, humidnum, windnum } =
      await getWhetherInfo(cityname);
    locationDisplay.innerHTML = locationName;
    function kelvinToCelcius(temperatureNum) {
      let cel = temperatureNum - 273.15;
      return cel.toFixed(2);
    }
    function kelvinToCelcius(temperatureFeels) {
      let cel = temperatureFeels - 273.15;
      return cel.toFixed(2);
    }
    temperature.innerHTML = kelvinToCelcius(temperatureNum);
    temperaturefeelslike.innerHTML = kelvinToCelcius(temperatureFeels);

    // if ((weatherdisc = "clear sky")) {
    //   whether.src = "Assets/clear sky day.svg";
    // } else if ((weatherdisc = "")) {
    //   whether.src = "Assets/";
    // }

    humidity.innerHTML = humidnum;

    wind.innerHTML = windnum;
  }
});

async function defaultSettings() {
  let cityname = "delhi";
  let { locationName, temperatureNum, temperatureFeels, humidnum, windnum } =
    await getWhetherInfo(cityname);
  function kelvinToCelcius(temperatureNum) {
    let cel = temperatureNum - 273.15;
    return cel.toFixed(2);
  }
  function kelvinToCelcius(temperatureFeels) {
    let cel = temperatureFeels - 273.15;
    return cel.toFixed(2);
  }
  temperature.innerHTML = kelvinToCelcius(temperatureNum);
  temperaturefeelslike.innerHTML = kelvinToCelcius(temperatureFeels);
  humidity.innerHTML = humidnum;
  wind.innerHTML = windnum;
}
defaultSettings();

let tempChangBtnflag = false;
tempChangBtn.addEventListener("click", () => {
  if (tempChangBtnflag == false) {
    tempChangBtnflag = true;
    tempChangBtn.innerHTML = "F";
    function celtofar() {
      let cel = temperature.innerHTML;
      let far = (9 / 5) * cel + 32;
      temperature.innerHTML = far;
      let celfeel = temperaturefeelslike.innerHTML;
      let farfeel = (9 / 5) * celfeel + 32;
      temperaturefeelslike.innerHTML = farfeel;
      tempdeg.innerHTML = "F";
      subtempdeg.innerHTML = "F";
    }
    celtofar();
  } else {
    tempChangBtnflag = false;
    tempChangBtn.innerHTML = "C";
    function fartocel() {
      let far = temperature.innerHTML;
      let cel = ((far - 32) * 5) / 9;
      temperature.innerHTML = cel.toFixed(2);

      let farfeel = temperaturefeelslike.innerHTML;
      let celfeel = ((farfeel - 32) * 5) / 9;
      temperaturefeelslike.innerHTML = celfeel.toFixed(2);
      tempdeg.innerHTML = "C";
      subtempdeg.innerHTML = "C";
    }
    fartocel();
  }
});
