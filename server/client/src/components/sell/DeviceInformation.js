import Cookies from 'universal-cookie';
import {useState, useEffect} from 'react';

const DeviceInformation = () => {

  const cookies = new Cookies();
  const [data, setData] = useState([]);

  return(
    <>
      <div className = 'device-information-container'>
        device-information-container
      </div>
      <div className = 'location-container'>
        location-container
      </div>
    </>
  );

}
