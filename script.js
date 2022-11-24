const key ="d00988983c7e8885c44baf3fc02300eb";

const select=document.querySelector(".form-select")
const city=document.querySelector(".city");
const temp=document.querySelector(".temp");
const icon=document.querySelector(".icon");
const weatherType=document.querySelector(".weather-type");
const time=document.querySelector(".time");
const wind=document.querySelector(".wind");
const humidity=document.querySelector(".humidity");
const atmp=document.querySelector(".atmp");



const kelvintToCelsius = (degrees) => {
    const celsius = degrees-273.15;
    return celsius.toFixed(1);
};

const getCities=()=>{
    fetch('cities.json', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data =>{
        data.forEach(city => {
            const option=document.createElement("option");
            option.value=city.id;
            option.text=city.name;

            //it is copehagen
            if(city.id===2618425){
                option.setAttribute("selected",true);
            }
            select.appendChild(option)
        });
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
    
}

//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
//api.openweathermap.org/data/2.5/weather?id=2618425&appid=d00988983c7e8885c44baf3fc02300eb

const getWeather=(cityId=2618425)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data =>{
        const date=new Date();

        city.innerText=data.name;
        temp.innerText=kelvintToCelsius(data.main.temp)+'\xB0C';
        icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` //http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
        weatherType.innerText=data.weather[0].description;
        time.innerText =`${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        wind.innerText=`Wind ${data.wind.speed} m/s`;
        humidity.innerText=`Humidity ${data.main.humidity}%`
        atmp.innerText=`Pressure ${data.main.pressure} hPa`
        console.log('Succes', data);
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
    
}

getCities();
getWeather();


select.addEventListener("change",function(e){
   const cityId =e.target.value;
   getWeather(cityId);
})
// fetch('https://api.openweathermap.org/data/2.5/weather?id=2618425&appid=d00988983c7e8885c44baf3fc02300eb', {
//     method: 'GET',
// })
// .then(response => response.json())
// .then(data =>{
//     console.log('Succes', data);
// })
// .catch((error)=>{
//     console.log('Error:', error);
// });

