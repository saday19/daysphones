import './styles/nav.css';
import {useState} from 'react';

const Nav = () => {

  const [isMenuOpen, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!isMenuOpen);
  };

  return (
    <div>
      <img className = 'image svg' src = '/images/nav/wave.png' />
      <div className = {isMenuOpen ? 'nav-content' : 'nav-content nav-margin'}>
        <img className = 'logo image' src = '/images/nav/white-logo.png' />
        <img
          onClick = {toggleMenu}
          className = 'icon'
          src = '/images/nav/menu.png'
        />
        <a
          className = {isMenuOpen ? 'list-item visible' : 'list-item'}
          href = '/contact'>
          Contact Us
        </a>
        <a
          className = {isMenuOpen ? 'list-item visible' : 'list-item'}
          href = '/track'>
          Track Order
        </a>
        <a
          className = {isMenuOpen ? 'list-item visible' : 'list-item'}
          href = '/sell'>
          Sell
        </a>
        <a
          className = {isMenuOpen ? 'list-item visible' : 'list-item'}
          href = '/Home'>
          Home
        </a>
      </div>
    </div>
  );
};

export default Nav
