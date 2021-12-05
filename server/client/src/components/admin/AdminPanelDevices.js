import axios from 'axios';
import {useState} from 'react';

import PanelDevice from './PanelDevice.js';

const AdminPanelDevices = () => {

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentDevice, setCurrentDevice] = useState('');
  const [currentCarrier, setCurrentCarrier] = useState('');
  const [currentStorage, setCurrentStorage] = useState('');
  const [currentCondition, setCurrentCondition] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentImageURL, setCurrentImageURL] = useState('');

  const [loadingDevices, setLoadingDevices] = useState(true);
  const [allDevices, setAllDevices] = useState([]);


  const getAllDevices = (bypass) => {
    if(!loadingDevices || bypass) return;
    setLoadingDevices(false);
    axios.get('/api/get-all-devices')
    .then(res => {
      setAllDevices(res.data);
    })
    .catch(err => {
      console.log(err);
      setLoadingDevices(true);
    })
  };

  const addDevice = () => {
    const data = {
      category: currentCategory,
      device: currentDevice,
      carrier: currentCarrier,
      storage: currentStorage,
      condition: currentCondition,
      image: currentImageURL,
      price: currentPrice
    };
    axios.post('/api/add-device', {data: data})
    .then((req) => {
      console.log('response ' + req.data);
    });

    setCurrentCategory("");
    setCurrentDevice("");
    setCurrentCarrier("");
    setCurrentStorage("");
    setCurrentCondition("");
    setCurrentPrice("");
    setCurrentImageURL("");

  }

  getAllDevices(false);

  return(
    <>
      <div className = 'devices-selection'>
      </div>
      <h4 className = 'panel-header'>Add a device:</h4>
      <div className = 'devices-add'>
        <input value = {currentCategory} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'category' onChange = {(event) => {
          setCurrentCategory(event.target.value);
        }} />
        <input value = {currentDevice} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'model' onChange = {(event) => {
          setCurrentDevice(event.target.value);
        }} />
        <input value = {currentCarrier} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'carrier' onChange = {(event) => {
          setCurrentCarrier(event.target.value);
        }} />
        <input value = {currentStorage} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'storage' onChange = {(event) => {
          setCurrentStorage(event.target.value);
        }} />
        <input value = {currentCondition} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'condition' onChange = {(event) => {
          setCurrentCondition(event.target.value);
        }} />
        <input value = {currentPrice} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'price' onChange = {(event) => {
          setCurrentPrice(event.target.value);
        }} />
        <input value = {currentImageURL} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'image URL' onChange = {(event) => {
          setCurrentImageURL(event.target.value);
        }} />
        <div className = 'device-add-button device-add-input' onClick = {() => {
          addDevice();
          getAllDevices(true);
        }}>Add Device</div>
      </div>
      <div className = 'devices-display'>
        <h4 className = 'panel-header'>Devices:</h4>
        {!loadingDevices && allDevices.map((device) =>
          <PanelDevice key = {device._id} data = {device} update = {getAllDevices}/>
        )}
      </div>
    </>
  );

}

export default AdminPanelDevices;
