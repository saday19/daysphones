import './styles/testimonials.css'
import {useEffect, useState} from 'react';

const Testimonials = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials/')
    .then(response => {
      if(response.ok) {
        return response.json()
      }
    })
    .then(data => {
      setData(data);
    })
  }, [])

  return(
    <div className = 'testimonails-container'>
      <img className = 'testimonials-top-image' src = '/images/nav/wave2.png'/>
      <p className = 'testimonials-header'>What our customers are saying</p>
      <div className = 'testimonials-content'>
        {data.map( (testimonial) =>
            <div className = 'testimonial' key = {testimonial.name}>
              <h4>{testimonial.name}</h4>
              <p>{testimonial.text}</p>
            </div>
        )}
      </div>
      <img className = 'testimonials-top-image' src = '/images/nav/wave3.png'/>
    </div>
  );

}

export default Testimonials
