import React from 'react'

const WeatherBox = ({weather}) => {

  const tempFahrenheit = (weather?.main.temp * 9/5) + 32;
  console.log(tempFahrenheit);

  return (
    <ul className='flex-wrap'>
      <li><h4>{weather?.main.temp}°C</h4></li>
      <li><h4>{tempFahrenheit} °F</h4></li>

    </ul>
      
  )
}

export default WeatherBox
