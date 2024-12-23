let searchbtn = document.querySelector(".searchbtn");
let tempChangBtn = document.querySelector(".tempChangBtn");
let locationDisplay = document.querySelector(".cont2");
let temperature = document.querySelector("#temp");
let temperaturefeelslike = document.querySelector("#subtemp");
let whether = document.querySelector("#whehterImg");
let humidity = document.querySelector("#humid");
let wind = document.querySelector("#win");

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
    temperature.innerHTML = temperatureNum;

    temperaturefeelslike.innerHTML = temperatureFeels;

    if ((weatherdisc = "clear sky")) {
      whether.src = "Assets/clear sky day.svg";
    } else if ((weatherdisc = "")) {
      whether.src = "Assets/";
    }

    humidity.innerHTML = humidnum;

    wind.innerHTML = windnum;
  }
});
