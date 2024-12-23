async function getWhetherInfo(cityname) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=f94434843b14b71ab4f3f892f5377fa4`
    );
    let whetherInfo = await response.json();
    console.log(whetherInfo);
  } catch (error) {
    console.log(error);
  }
}
getWhetherInfo("delhi");
