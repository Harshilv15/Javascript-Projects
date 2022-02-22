const display = {
  showLocation: function (place,country) {
    let displayElement = document.getElementById('display');
    displayElement.innerHTML = place+', '+country;
  },
  showWeather: function(weather){
    let weatherElement = document.getElementById('temp');
    let temperatureSpan = document.getElementById('span-degrees');
    weatherElement.innerHTML = weather;
    temperatureSpan.textContent = '°C';
  },
  showDescription: function(description){
    let descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = description;
  }
  
};

// SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "98cf9e2354267d36fc3b383b1f721ba7";

//helper functions
const convertCtoF = function(valueTempinC){
  let Ftemp = (valueTempinC * (9/5)) + 32;
  return Ftemp;
}

const showTemperature = function(value){
  let temperatureElement = document.getElementById('temp');
  let temperatureSpan = document.getElementById('span-degrees');
  if(temperatureSpan.textContent==='°C'){
    temperatureElement.innerHTML = Math.floor(convertCtoF(value));
    temperatureSpan.textContent='°F';
  }else{
    temperatureElement.innerHTML = value;
    temperatureSpan.textContent='°C';
  }
}


const init = function () {
  let button = document.getElementById('searchButton');
  let search = document.getElementById('timezoneSearch');
  let msg = document.getElementById('msg');
  let temperatureElement = document.getElementById('temp');
  let p = document.getElementById('icon');

  button.onclick = function (e) {
    e.preventDefault();
    let search = document.getElementById('timezoneSearch');
    let searchvalue = search.value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        display.showLocation(name,sys.country);
        display.showWeather(Math.floor(main.temp));
        const markup = `<figure><img src=${icon} alt=${weather[0]["main"]}></figure>`;
        p.innerHTML = markup;
        display.showDescription(weather[0]["description"]);
        temperatureElement.onclick = function(){
          showTemperature(Math.floor(main.temp));
        };
        
      })
      .catch(() => {
        msg.textContent = "Please search for a valid city 😩";
      });
      msg.textContent = ""
      searchvalue="";
  }
  search.onkeydown = handleKeyPress;
    
}

const handleKeyPress = function (e) {
  let button = document.getElementById('searchButton');
  if (e.keyCode === 13) {
    button.click();
    return false
  }
}


window.onload = init;

