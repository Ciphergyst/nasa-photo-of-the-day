import React, {useEffect, useState} from "react";
import axios from 'axios';
import Title from './components/title';
import Img from './components/image';
import Info from './components/info';

import Date from './components/date';


function App() {
  const [APODImg, setAPODImg] = useState();
  const [APODTitle, setAPODTitle] = useState();
  const [APODInfo, setAPODInfo] = useState();
  const [APODDate, setAPODDate] = useState();

  useEffect(() => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then( res => {
        setAPODImg(res.data.url);
        setAPODTitle(res.data.title);
        setAPODInfo(res.data.explanation);
        setAPODDate(res.data.date)
      });
  }, []);

  return (
   <div className="App">
     <div className='header'>
      {/* <img className='nasa-logo' src={NasaImg}></img> */}
      <Title title={APODTitle} />
    	<img className='nasa-logo' src={APODTitle}></img>
      </div>
      <Img src={APODImg} />
      <Date date={APODDate} />
      <Info info={APODInfo}/>
     </div> 

  );

}


export default App

