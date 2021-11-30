import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

const CategorySelectionContainer = () => {

  const cookies = new Cookies();
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch('/api/categories')
    .then(response => {
      if(response.ok) {
        return response.json()
      }
    })
    .then(data => {
      setData(data);
    })
  }, []);

  return (
    <div>
      <div className = 'container'>
        <h2 className = 'center-text'>
          <strong>
            Select a device to get started.
          </strong>
        </h2>
        <div className = 'justify'>
        {data.map((cat) =>
          <div key = {cat.name} className = 'card card-2 center-text card-container'>
            <a href = {cat.path} onClick = {() => {
              cookies.set('category',cat.name);
            }}>
            <div className = 'card card-shadow'>
              <h4 className = 'card-text'>{cat.name}</h4>
              <img className = 'img' src = {cat.image}/ >
            </div>
            </a>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionContainer
