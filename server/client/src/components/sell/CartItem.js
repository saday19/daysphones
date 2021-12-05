import {useState} from 'react';
import axios from 'axios';

const CartItem = (props) => {

  const [isVisible, setVisible] = useState(true);

  const [offer, setOffer] = useState('0');

  const data = props.data;
  const get_offer_for = props.todo;
  const remove = props.remove;

  const generateOffer = (condition) => {
    if(offer != 0) return;
    data.condition = condition;
    data.image = data.src;
    axios.post('/api/generate-offer', {data: data})
    .then(res => {
      setOffer(res.data.price);
    });
  }

  generateOffer(data.condition);

  return(
    <>
      <div className = {isVisible ? 'cart-item' : 'cart-item invisible'} key = {data.device}>
        <div className = 'cart-item-content'>
          <h3>{data.device}</h3>
          <img className = 'device-information-img' src = {data.src} />
          <p>Carrier: {data.carrier}</p>
          <p>Storage: {data.storage}</p>
          <p>Condition: {data.condition}</p>
          <p>Price: <a className = 'di-offer'>{offer == 0 ? 'Loading...' : '$' + offer}</a> (each)</p>
          <div className = 'di-sell-now cart-center-text' onClick = { () => {
            remove(data);
            setVisible(false);
          }}>
            <h3>Remove Item</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem
