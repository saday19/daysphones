import Cookies from 'universal-cookie';
import CartItem from './CartItem.js';
import './styles/cart.css';
import axios from 'axios';

const Checkout = () => {

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

    </>
  );
}

export default Checkout
