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
        <>
        <h1 className = 'devices-title'>Select a device to sell</h1>
        <div className = 'devices-container'>
          {devices.map((device) =>
            <div key = {device.device} className = 'card'>
            <a className = 'card-link-wrapper' href = '/device-information' onClick = {() => {
                cookies.set('device', device.device);
              }}>
              <div className = 'card card-shadow' key = {device.device}>
                <h3>{device.device}</h3>
                <img className = 'img' src = {device.image}/>
              </div>
            </a>
            </div>
          )}
        </div>
        </>
      }
    </>
  );
}

export default SelectDevice
