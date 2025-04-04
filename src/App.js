import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

//1. 앱이 실행되자마자 위치기반으로 날씨정도가 보인다.
//2. 날시정보에는 현재 도시의 섭씨, 화씨 날씨 상태
//3. 5개의 버튼 - 1개는 현재 도시, 4개는 다른 도시
//4. 도시 버튼을 클릭 할때마다 도시 별 날씨가 나옴
//5. 현재 위치 버튼을 누르면 리프레쉬 (현재 위지, 날씨 다시 불러옴)
//6. 데이터를 불러오는 동안 로딩 스피너
function App() {

  const [weather, setWeather]= useState(null)

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{

      let at = position.coords.latitude
      let lon= position.coords.longitude

      getWeatherByCurrentLocation(at,lon)
    });
  }

  const getWeatherByCurrentLocation = async(at, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${at}&lon=${lon}&appid=2603c0e6e87da86b7dbe3d9e9d7be1f2&units=metric`
    let respone = await fetch(url)
    let data = await respone.json()
    setWeather(data)

    console.log(data)

  }






  const [currentTime, setCurrentTime] = useState('');
  const [currentAmPm, setCurrentAmPm] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // 시간과 날짜 업데이트 함수
  const updateTimeAndDate = () => {
    const now = new Date();
    
    // 시간 포맷팅 (12시간 형식)
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시
    const formattedHours = String(hours).padStart(2, '0');
    
    setCurrentTime(`${formattedHours}:${minutes}`);
    setCurrentAmPm(ampm);
    
    // 날짜 포맷팅 (영어)
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    
    setCurrentDate(now.toLocaleDateString('en-US', options));
  };


  useEffect(() => {
    // 초기 시간 및 날짜 설정
    updateTimeAndDate();
    
    // 1초마다 시간 업데이트
    const interval = setInterval(updateTimeAndDate, 1000);
    
    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    getCurrentLocation()
  },[]) //useEffect에는 함수와 배열

  return (
    <div className='weather-app'>
      <div className='conteiner-box'>
        <section>
          <h1>{currentTime}<span>{currentAmPm}</span></h1>
          <h2>{currentDate}</h2>
        </section>
        <section>
          <h3>{weather?.name}</h3>
          <h5>/ {weather?.weather[0].description}</h5>
          <WeatherButton />
        </section>
      
      </div>

      <section className='conteiner-box bottom'>
        <WeatherBox weather={weather} />
      </section>
      
    

    </div>
  );
}

export default App;