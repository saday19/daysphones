
import {useState} from 'react';

const AdminPanelDevices = () => {

  const [currentCategory, setCurrentCategory] = useState('');
  const [currentDevice, setCurrentDevice] = useState('');
  const [currentCarrier, setCurrentCarrier] = useState('');
  const [currentStorage, setCurrentStorage] = useState('');
  const [currentCondition, setCurrentCondition] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  //query all devices

  const addDevice = () => {
    //post to api, handle response
  }

  return(
    <>
      <div className = 'devices-selection'>

      </div>
      <h4 className = 'panel-header'>Add a device:</h4>
      <div className = 'devices-add'>
        <input className = 'device-add-input' type = 'text' placeholder = 'category' onChange = {(event) => {
          setCurrentCategory(event.target.value);
        }} />
        <input className = 'device-add-input' type = 'text' placeholder = 'model' onChange = {(event) => {
          setCurrentDevice(event.target.value);
        }} />
        <input className = 'device-add-input' type = 'text' placeholder = 'carrier' onChange = {(event) => {
          setCurrentCarrier(event.target.value);
        }} />
        <input className = 'device-add-input' type = 'text' placeholder = 'storage' onChange = {(event) => {
          setCurrentStorage(event.target.value);
        }} />
        <input className = 'device-add-input' type = 'text' placeholder = 'condition' onChange = {(event) => {
          setCurrentCondition(event.target.value);
        }} />
        <input className = 'device-add-input' type = 'text' placeholder = 'price' onChange = {(event) => {
          setCurrentPrice(event.target.value);
        }} />
        <div className = 'device-add-button device-add-input' onClick = {() => {
          addDevice();
        }}>Add Device</div>
      </div>
      <div className = 'devices-display'>
      </div>
    </>
  );

}

export default AdminPanelDevices;
