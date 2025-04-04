import React from 'react'
// or less ideally
import { Button } from 'react-bootstrap';


function WeatherButton() {
  return (
    <div className='button-wrap'>
      <Button variant="dark">Currnt Location</Button>
      <Button variant="dark">Paris</Button>
      <Button variant="dark">Newyork</Button>
    </div>
  )
}

export default WeatherButton
