import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

import './styles/selectdevice.css'

const SelectDevice = () => {

  const cookies = new Cookies();
  const cat = cookies.get('category');

  const [data, setData] = useState({});

  useEffect(()=>{
    fetch('/api/devices')
    .then(response => {
      if(response.ok) {
        return response.json()
      }
    })
    .then(data => {
      setData(data);
    })
  }, []);

  const devices = data[cat];

  return(
    <>
      {devices &&
        <div className = 'devices-container'>
          {devices.map((device) =>
            <div className = 'card'>
            <div className = 'card card-shadow' key = {device.device}>
              <h3>{device.device}</h3>
              <img className = 'img' src = {device.image}/>
            </div>
            </div>
          )}
        </div>
      }
    </>
  );
}

export default SelectDevice
