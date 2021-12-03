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

  const get_offer_for = (data) => {
    return 500;
  }

  const handleSubmit = () => {
    const data = {
      data: "this is the data"
    }
    axios.post('http://localhost:3001/api/add-device/', data)
    .then( (res) => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      {cart &&
        <div className = 'cart-container'>
          {cart.map(data =>
            <CartItem key = {data.device} data = {data} todo = {get_offer_for} remove = {remove_item} />
          )}
        </div>
      }
      <div className = 'cart-sell-another-wrapper'>
      {handleSubmit()}
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
