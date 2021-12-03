import {useState} from 'react';

const CartItem = (props) => {

  const [isVisible, setVisible] = useState(true);

  const data = props.data;
  const get_offer_for = props.todo;
  const remove = props.remove;

  return(
    <>
      <div className = {isVisible ? 'cart-item' : 'cart-item invisible'} key = {data.device}>
        <div className = 'cart-item-content'>
          <h3>{data.device}</h3>
          <img className = 'device-information-img' src = {data.src} />
          <p>Carrier: {data.carrier}</p>
          <p>Storage: {data.storage}</p>
          <p>Condition: {data.condition}</p>
          <p>Price: <a className = 'di-offer'>${get_offer_for(data)}</a> (each)</p>
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
