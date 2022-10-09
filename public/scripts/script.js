let lat;
let lon;
let params;

window.addEventListener("load",()=>{
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(geoPosOk,geoPosKo)
})

// Fuction to get latitude and longitude by geolocation
/** @param  {GeolocationPosition} pos*/
function geoPosOk(pos){
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    console.log(`Latitude: ${lat} and longitude: ${lon}`);
    getTemperatureLatLon(lat,lon);
}

// Post method to get the data from the search form
$(document).ready(()=>{
    $('#search').submit((e)=>{
        e.preventDefault();
        let searchData = $('#search').serialize();
        $.post('/',searchData,(date)=>{
            getTemperatureCity(date);
            console.log(date);
        })
    })
})

// Fuction if the geolocation have an errror
/** @param  {GeolocationPositionError} e*/
function geoPosKo(e){
    console.warn(e);
    $('.current').innerHTML = `<h2> Imposible to get the weather in your location </h2>`
    switch (e.code) {
        case e.PERMISSION_DENIED:
            console.log("Permision denied");
            break;
        case e.POSITION_UNAVAILABLE:
            console.log("Your Position is unavailable");
            break;
        case e.TIMEOUT:
            console.log("We couldn't get your position in time");
            break;
        default:
            console.log("Error")
            break;
    }
}


// Fuction to get th temperature by API with lan and lon
function getTemperatureLatLon(latitude,longitude) {
    params = new URLSearchParams({
        access_key : '99eba495505b8bc6b287386accfb8b0a',
        query : `${latitude},${longitude}`
    })   

    fetch(`http://api.weatherstack.com/current?${params}`)
    .then(res => res.json())
    .then(res => displayCardCurrent(res))
    .catch(function(errror){
        console.log(errror);
        document.querySelector("contentCurrent").innerHTML = `<h4> Imposible to get the weather in your location </h4>`
    });
}

// Fuction to get th temperature by API with the city data from the user
function getTemperatureCity(city) {
    params = new URLSearchParams({
        access_key : '99eba495505b8bc6b287386accfb8b0a',
        query : `${city}`
    })   

    fetch(`http://api.weatherstack.com/current?${params}`)
    .then(res => res.json())
    .then(res => displayCardCity(res))
    .catch(function(errror){
        console.log(errror);
        document.querySelector(".displayCity").innerHTML = `<h4> Imposible to get the weather in this city, try another one</h4>`
    });
}

// display the information for the weather
/** @param {json}resJson */
function displayCardCurrent(resJson){
    let htmlCard = `
    <div class="row">
      <div class="col-12">
        <div class="title">
            <h4> Weather in ${resJson.location.name}</h4> 
            <h5> <span style="color:#52A8F2;"> ${resJson.location.region} </span>  </h5>
        </div>
      </div>
      <div class="col-4">
        <div class="weatherImg">
            <img src="${resJson.current.weather_icons[0]}" class="card-img-top" alt="Weather img">
        </div>
      </div>
      <div class="col-auto align-self-center">
        <div class="temperature">
            <h1>${resJson.current.temperature}&#8451<h1>
        </div>
      </div>
      <div class="col-auto align-self-center">
        <div class="information">
            <h5><span class="material-symbols-outlined"> arrow_right_alt</span>  ${resJson.current.wind_speed} KM/H </h5>

            <h5><span class="material-symbols-outlined">device_thermostat</span>${resJson.current.feelslike}</h5> 
        </div>
      </div>
      <div class="col-12">
        <h4> ${resJson.current.weather_descriptions[0]} </h4>
      </div>
    </div>`;

  document.querySelector(".contentCurrent").innerHTML = htmlCard;
  console.log(resJson);
}


/** @param {json}resJson */
function displayCardCity(resJson){
    let htmlCard = `
    <div class="row">
    <div class="col-12">
      <div class="title">
          <h4> Weather in ${resJson.location.name}</h4> 
          <h5> <span style="color:#52A8F2;"> ${resJson.location.region} </span>  </h5>
      </div>
    </div>
    <div class="col-4">
      <div class="weatherImg">
          <img src="${resJson.current.weather_icons[0]}" class="card-img-top" alt="Weather img">
      </div>
    </div>
    <div class="col-auto align-self-center">
      <div class="temperature">
          <h1>${resJson.current.temperature}&#8451<h1>
      </div>
    </div>
    <div class="col-auto align-self-center">
      <div class="information">
          <h5><span class="material-symbols-outlined"> arrow_right_alt</span>  ${resJson.current.wind_speed} KM/H </h5>

          <h5><span class="material-symbols-outlined">device_thermostat</span>${resJson.current.feelslike}</h5> 
      </div>
    </div>
    <div class="col-12">
      <h4> ${resJson.current.weather_descriptions[0]} </h4>
    </div>
  </div>`;

  document.querySelector(".displayCity").innerHTML = htmlCard;
  console.log(resJson);
}

