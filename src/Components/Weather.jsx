import React, { useEffect, useRef, useState } from 'react'
import clouds from '../assets/clouds.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import drizzle from '../assets/drizzle.png'
import sunny from '../assets/sunny.png'
import snowy from '../assets/snowy.png'
import thunderstrom from '../assets/thunderstrom.png'

const Weather = () => {
  const inputRef = useRef()
  const [weatherData,setWeatherData] = useState(false);
  const allIcons={
    "01d" :sunny,
    "01n" :sunny,
    "02d" :clouds,
    "02n" :clouds,
    "03d" :clouds,
    "03n" :clouds,
    "04d" :drizzle,
    "04n" :drizzle,
    "09d" :rain,
    "10d" :rain,
    "10n" :rain,
    "13d" :snowy,
    "13n" :snowy,

  }
  const Search = async (city) => {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon]|| sunny;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed :data.wind.speed,
          temperature : Math.floor(data.main.temp),
          location:data.name,
          icon : icon
        })
    }catch(error){

    }
  }

  useEffect(() =>{
    Search("hyderabad");
  },[])
  return (

    <div className='bg-sky-400 fa-layers-text my-20 mx-80 shadow-lg rounded-2xl'>
        <div className='flex justify-center items-center w-full rounded-6xl'>
            <input ref={inputRef} className ='h-50 rounded-2xl gap-0.1 shadow-lg border-none text-center mt-20 mr-20 ml-20'type='text' placeholder='Search'/>
           <div className='rounded-xl bg-white flex mt-20 mr-20'onClick={()=>Search(inputRef.current.value)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f2937"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
           </div>
     </div>
            <div className='flex justify-center flex-nowrap items-center gap-5 m-8'>
             <div> 
              <div className='flex items-center justify-center'><img src={weatherData.icon} alt="cloud" /></div>
               <p className='temperature text-5xl flex justify-center items-center align-bottom'>{weatherData.temperature}c</p>
               <p className='Location align-text-bottom text-3xl'>{weatherData.location}</p></div>
            </div>
            <div  className="humidity flex flex-nowrap justify-center items-center gap-10">
            <div>
                <img src={humidity} alt="" />
                <p className='text-2xl'>{weatherData.humidity}%</p>
                <span>Humidity</span>

            </div>
            <div className="thunderstrom">
                <img className='stroke-1' src={thunderstrom} alt="" />
                <p className='text-2xl'>{weatherData.windSpeed}</p>
                <span>Wind speed</span>
            </div>
            </div>
              
              
        
    </div>
  )
}

export default Weather