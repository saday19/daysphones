import {useState} from 'react';

const CartItem = (props) => {

  const [isVisible, setVisible] = useState(true);

  const data = props.data;
  const get_offer_for = props.todo;
  const remove = props.remove;

  return(
    <>
      <div className = {isVisible ? '' : 'invisible'} key = {data.device}>
        <p>{data.device}</p>
        <p>{data.carrier}</p>
        <p>{data.storage}</p>
        <p>{data.condition}</p>
        <p>${get_offer_for(data)}</p>
        <div onClick = { () => {
          remove(data);
          setVisible(false);
        }}>
          remove item
        </div>
      </div>
    </>
  );
}

export default CartItem
