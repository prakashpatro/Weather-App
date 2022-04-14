//creating an object that contains our functions and api calls

let weather = {
    //my openweathermap account api id = "6b0fcb8f95811bb0e0931979bd82c196"
    //creating a function to fetch weather details using api
    fetchWeather: (city) => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=6b0fcb8f95811bb0e0931979bd82c196")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.cod === "404") {
                    window.alert("City Not Found");
                    document.querySelector(".outer").classList.remove("load");
                } else {
                    weather.displayWeather(data);
                }
            });
    },

    //function to display weather on the website
    displayWeather: function(data) {
        //extracting data from the json
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        //using DOM to display details
        document.querySelector(".city").innerText = name;
        document.querySelector(".cel").innerText = temp;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humid").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed + " Kmph";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".icon1").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
        document.querySelector(".outer").classList.remove("load");
        console.log("weather fetched");
        //console.log(name, icon, description, temp, humidity, speed);
    },

    search: function() {
        document.querySelector(".outer").classList.add("load");
        weather.fetchWeather(document.querySelector(".search_city").value);
        document.querySelector(".search_city").value = "";
    }

};

function func() {
    weather.search();
}

//initially on load details of visakhapatnam city are displayed
window.addEventListener('load', () => {
    weather.fetchWeather("visakhapatnam");
})

document.querySelector(".search_city").addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})