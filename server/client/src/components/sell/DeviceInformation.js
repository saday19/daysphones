import Cookies from 'universal-cookie';
import DeviceQuestion from './DeviceQuestion.js'
import GeoLocation from '../home/GeoLocation.js'
import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/deviceinformation.css';

const DeviceInformation = () => {

  const [offer, setOffer] = useState(0);
  const [offerGenerated, setOfferGenerated] = useState(false);

  const [carrier, setCarrier] = useState(false);
  const [storage, setStorage] = useState(false);
  const [condition, setCondition] = useState(false);

  const [current_storage, setCurrentStorage] = useState('');
  const [current_carrier, setCurrentCarrier] = useState('');
  const [current_condition, setCurrentCondition] = useState('');

  const [loading, setLoading] = useState(true);
  const [doneLoading, setDoneLoading] = useState(false);

  const cookies = new Cookies();
  const device = cookies.get('device');

  const [carriers, setCarriers] = useState([]);
  const [storages, setStorages] = useState([]);
  const [conditions, setConditions] = useState([]);

  const data = {
    device: device.device,
    src: device.src,
    carrier: current_carrier,
    storage: current_storage,
    condition: current_condition
  }

  const fetchDeviceVariations = () => {
    if(!loading) return;
    setLoading(false);
    axios.post('/api/get-device-variations', {device: device})
    .then((res) => {
      if(res.data) {
        setCarriers(res.data.carriers);
        if(res.data.carriers[0] == '') {
          setStorage(true);
          if(res.data.storages[0] == '') {
            setStorage(false);
            setCondition(true);
          }
        } else {
          setCarrier(true);
        }
        setStorages(res.data.storages);
        if(res.data.storages[0] == '') {
          setCondition(true);
          if(res.data.carriers[0] != '') {
            setCondition(false);
          }
        }
        setConditions(res.data.conditions);
        setDoneLoading(true);
      } else {
        console.log('bad response');
        setLoading(true);
      }
    });
  }

  const solidifyOffer = () => {

    const cart = cookies.get('cart');

    if(cart) {
      cart.push(data);
      cookies.set('cart', cart);
    } else {
      cookies.set('cart', [data]);
    }

  }

  const generateOffer = (condition) => {
    data.condition = condition;
    data.image = data.src;
    axios.post('/api/generate-offer', {data: data})
    .then(res => {
      setOffer(res.data.price);
      setOfferGenerated(true);
    });
  }

  const set_carrier = (carrier) => {
    setCarrier(false);
    if(storages[0] == '') {
      setCondition(true);
    } else
    setStorage(true);
    setCurrentCarrier(carrier);
  }

  const set_storage = (storage) => {
    setStorage(false);
    setCondition(true);
    setCurrentStorage(storage);
  }

  const set_condition = (condition) => {
    setCondition(false);
    setCurrentCondition(condition);
    generateOffer(condition);
  }

  fetchDeviceVariations();

  if(!doneLoading)
    return (
      <></>
    );

  return(
    <>
      <div className = 'di-content-header'>
        {!offerGenerated && <h1>Answer a few questions to get an instant quote</h1>}
      </div>
      <div className = 'device-information-container'>
        {!offerGenerated && doneLoading &&
          <div className = 'device-information-form'>
            {carrier && <DeviceQuestion question = 'Select a Carrier' items = {carriers} todo = {set_carrier}/>}
            {storage && <DeviceQuestion question = 'Select a Storage' items = {storages} todo = {set_storage}/>}
            {condition && <DeviceQuestion question = 'Select a Condition' items = {conditions} todo = {set_condition}/>}
          </div>
        }
        <div className = {offerGenerated ? 'device-information device-information-large' : 'device-information'}>
          <div className = 'di-content card-shadow'>
            <h4 className = 'di-header'>Sell {device.device}</h4>
            <img className = 'device-information-img' src = {device.src} />
            <hr className = 'di-split'/>
            <div className = 'di'>
              <a className = 'di-text'>Device: {device.device}</a><br />
              <a className = 'di-text'>Carrier: {current_carrier}</a><br />
              <a className = 'di-text'>Storage: {current_storage}</a><br />
              <a className = 'di-text'>Condition: {current_condition}</a><br />
            </div>
            {offerGenerated &&
              <div className = 'di-offer-container'>
                <h2 className = 'di-offer-header'>Our Offer: <br /><a className = 'di-offer'>${offer}</a><a className = 'di-offer-small'> (each)</a></h2>
                <a href = '/checkout-device'>
                  <div className = 'di-sell-now' onClick = { () => {solidifyOffer()}}>
                    <h3>Sell Now</h3>
                  </div>
                </a>
              </div>
            }
          </div>
        </div>
      </div>
      <hr className = 'split' />
      <GeoLocation displaytitle = {false}/>
    </>
  );
}

export default DeviceInformation
