import {useState} from 'react';
import axios from 'axios';

const PanelDevice = (props) => {

  const [category, setCategory] = useState(props.data.category);
  const [device, setDevice] = useState(props.data.device);
  const [carrier, setCarrier] = useState(props.data.carrier);
  const [storage, setStorage] = useState(props.data.storage);
  const [condition, setCondition] = useState(props.data.condition);
  const [price, setPrice] = useState(props.data.price);
  const [image, setImage] = useState(props.data.image);
  const [enable, setEnabled] = useState(props.data.enable);

  const updateDevice = () => {
    let data = {
      _id: props.data._id,
      device: device,
      carrier: carrier,
      storage: storage,
      condition: condition,
      price: price,
      image: image,
      enable: enable
    }
    axios.post('/api/update-device', data);
  };

  return(
    <>
      <div className = 'devices-add'>
        <input value = {category} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'category' onChange = {(event) => {
          setCategory(event.target.value);
        }} />
        <input value = {device} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'model' onChange = {(event) => {
          setDevice(event.target.value);
        }} />
        <input value = {carrier} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'carrier' onChange = {(event) => {
          setCarrier(event.target.value);
        }} />
        <input value = {storage} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'storage' onChange = {(event) => {
          setStorage(event.target.value);
        }} />
        <input value = {condition} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'condition' onChange = {(event) => {
          setCondition(event.target.value);
        }} />
        <input value = {price} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'price' onChange = {(event) => {
          setPrice(event.target.value);
        }} />
        <input value = {image} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'image' onChange = {(event) => {
          setImage(event.target.value);
        }} />
        <input value = {enable} className = 'device-add-input device-add-input-size' type = 'text' placeholder = 'enabled' onChange = {(event) => {
          setEnabled(event.target.value);
        }} />
        <div className = 'device-add-button device-add-input' onClick = {() => {
          updateDevice();
        }}>Update Device</div>
      </div>
    </>
  );
}

export default PanelDevice;
