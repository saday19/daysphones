import Cookies from 'universal-cookie';
import DeviceQuestion from './DeviceQuestion.js'
import {useState, useEffect} from 'react';
import './styles/deviceinformation.css';

const DeviceInformation = () => {

  const offer = 500;

  const [offerGenerated, setOfferGenerated] = useState(false);

  const [carrier, setCarrier] = useState(true);
  const [storage, setStorage] = useState(false);
  const [condition, setCondition] = useState(false);

  const [current_storage, setCurrentStorage] = useState('');
  const [current_carrier, setCurrentCarrier] = useState('');
  const [current_condition, setCurrentCondition] = useState('');

  const cookies = new Cookies();
  const device = cookies.get('device');
  const carriers = ['Unlocked', 'Verizon', 'AT&T', 'T-Mobile'];
  const storages = ['64GB', '128GB', '256GB', '512GB'];
  const conditions = ['Like New', 'Good', 'Fair', 'Minor Damage', 'Heavy Damage'];

  const generateOffer = () => {
    setOfferGenerated(true);
  }

  const set_carrier = (carrier) => {
    setCarrier(false);
    setStorage(true)
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
    generateOffer();
  }

  return(
    <>
      <div className = 'di-content-header'>
        {!offerGenerated && <h1>Answer a few questions to get an instant quote</h1>}
      </div>
      <div className = 'device-information-container'>
        {!offerGenerated &&
          <div className = 'device-information-form'>
            {carrier && <DeviceQuestion question = 'Select a Carrier' items = {carriers} todo = {set_carrier}/>}
            {storage && <DeviceQuestion question = 'Select a Storage' items = {storages} todo = {set_storage}/>}
            {condition && <DeviceQuestion question = 'Select a Condition' items = {conditions} todo = {set_condition}/>}
          </div>
        }
        <div className = 'device-information'>
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
                  <div className = 'di-sell-now'>
                    <h3>Sell Now</h3>
                  </div>
                </a>
              </div>
            }
          </div>
        </div>
      </div>
      <div className = 'di-location-container'>
        location-container
      </div>
    </>
  );
}

export default DeviceInformation
