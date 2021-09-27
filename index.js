window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.getElementById('temperatureDescription');
    const temperatureDegree = document.getElementById('temperatureDegree');
    const locationTimezone = document.getElementById('locationTimezone');
    const canvas = document.querySelector(".icon");
    const icon2 = document.getElementById("icon2");
    const degreeSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section > span")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // const example = "48.8567,2.3508";
            const api = `http://api.weatherapi.com/v1/current.json?key=15883bb3c8f7433da98121148212009&q=${lat},${long}`;
            fetch(api)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                const { temp_c, temp_f } = data.current;
                const {text, icon} = data.current.condition;
                // Set DOM Elements from the API
                temperatureDegree.innerText = temp_f;
                temperatureDescription.innerText = data.current.condition.text;
                locationTimezone.innerText = data.location.tz_id;
                //Set the Icon
                // setIcons(text, canvas); 
                icon2.src = icon;
                // Change temperature to Celcius/Fahrenheit 
                degreeSection.addEventListener('click', () => {
                    if(temperatureSpan.innerText === "F") {
                        temperatureSpan.innerText = "C";
                        temperatureDegree.innerText = temp_c;
                    } else {
                        temperatureSpan.innerText = "F";
                        temperatureDegree.innerText = temp_f;
                    }
                })
              });
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toUpperCase().split(" ").join("_");
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})
