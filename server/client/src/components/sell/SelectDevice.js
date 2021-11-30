import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

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
        <div>
          {devices.map((device) =>
            <div key = {device.device}>
              <p>{device.device}</p>
            </div>
          )}
        </div>
      }
    </>
  );
}

export default SelectDevice
