import {useState} from 'react';
import Cookies from 'universal-cookie';
import CartItem from './CartItem.js';
import './styles/cart.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Checkout = () => {

  const history = useHistory();

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [payment, setPayment] = useState('');
  const [shipping, setShipping] = useState('');

  const cookies = new Cookies();
  const cart = cookies.get('cart');

  const remove_item = (data) => {
    for(var i = 0; i < cart.length; i++) {
      if(cart[i] == data) {
        cart.splice(i, 1);
      }
    }
    cookies.set('cart', cart);
  }

  const handleSubmit = () => {
    let data = {
      first: first,
      last: last,
      phone: phone,
      email: email,
      address1: address1,
      address2: address2,
      state: state,
      city: city,
      zip: zip,
      payment: payment,
      shipping: shipping
    }

    axios.post('/api/create-order', {data: data})
    .then(res => {
      console.log(res.data);
    });
    history.push('/track', {});
  };

  return (
    <>
      {cart &&
        <div className = 'cart-container'>
          {cart.map(data =>
            <CartItem key = {data.device} data = {data} remove = {remove_item} />
          )}
        </div>
      }
      <div className = 'cart-sell-another-wrapper'>
        <a href = '/sell'>
          <div className = 'di-sell-now cart-center-text'>
            <h3 className = 'sell-another-text'>Sell Another Device</h3>
          </div>
        </a>
      </div>
      <div className = 'checkout-form'>
        <form onSubmit = {handleSubmit}>
          <h3 className = 'center-text'>Customer Information</h3>
          <div className = 'form-3-container'>
            <input required className = 'checkout-text-input-small' type = 'text' placeholder = 'First' onChange = {(event) => setFirst(event.target.value)}/>
            <input required className = 'checkout-text-input-small' type = 'text' placeholder = 'Last' onChange = {(event) => setLast(event.target.value)}/>
            <input required className = 'checkout-text-input-small' type = 'text' placeholder = 'Phone' onChange = {(event) => setPhone(event.target.value)}/>
            <input required className = 'checkout-text-input-small' type = 'email' placeholder = 'Email (Use PayPal email if selecting PayPal payment option)'onChange = {(event) => setEmail(event.target.value)} />
          </div>
          <h3 className = 'center-text'>Shipping Information</h3>
          <div className = 'form-3-container'>
            <input required className = 'checkout-text-input-large' type = 'text' placeholder = 'Address Line 1' onChange = {(event) => setAddress1(event.target.value)}/>
            <input className = 'checkout-text-input-large' type = 'text' placeholder = 'Address Line 2' onChange = {(event) => setAddress2(event.target.value)}/>
          </div>
          <div className = 'form-3-container'>
            <input required className = 'checkout-text-input-smallest' type = 'text' placeholder = 'State' onChange = {(event) => setState(event.target.value)}/>
            <input required className = 'checkout-text-input-smallest' type = 'text' placeholder = 'City' onChange = {(event) => setCity(event.target.value)}/>
            <input required className = 'checkout-text-input-smallest' type = 'text' placeholder = 'Zip' onChange = {(event) => setZip(event.target.value)}/>
          </div>
          <h3 className = 'center-text'>Payment Options</h3>
          <div className = 'form-3-container f3c-jc'>
            <select required className = 'checkout-payment' name = "payment" id = "payment" onChange = {(event) => setPayment(event.target.value)}>
              <option>How would you like to be paid?</option>
              <option value="paypal">Paypal (3% processing fee)</option>
              <option value="check">Check</option>
              <option value="cashapp">Cash App</option>
              <option value="check">Venmo</option>
            </select>
          </div>
          <h3 className = 'center-text'>Shipping Options</h3>
          <div className = 'form-3-container f3c-jc'>
            <select required className = 'checkout-payment' name = "shipping" id = "shipping" onChange = {(event) => setShipping(event.target.value)}>
              <option>How would you like to ship your device(s)?</option>
              <option value="fast">Use my own box (includes free label)</option>
              <option value="slow">Send me packaging and a label</option>
            </select>
          </div>
          <div className = 'submit-container'>
            <input className = 'form-submit' type = 'submit' value = 'Sell My Devices' />
          </div>
        </form>
      </div>
    </>
  );
}

export default Checkout
