import Cookies from 'universal-cookie';
import {useState, useEffect} from 'react';

const DeviceInformation = () => {

  const cookies = new Cookies();
  const device = cookies.get('device');

  return(
    <>
      <div>
      </div>
      <div className = 'device-information-container'>
        {device.device}
        <img src = {device.src} />
      </div>
      <div className = 'di-location-container'>
        location-container
      </div>
    </>
  );
}

export default DeviceInformation
