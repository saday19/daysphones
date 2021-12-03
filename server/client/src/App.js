import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Sell from './components/sell/Sell.js';
import NotFound from './components/NotFound.js';
import SelectDevice from './components/sell/SelectDevice.js';
import DeviceInformation from './components/sell/DeviceInformation.js';
import Checkout from './components/sell/Checkout.js';
import './app.css';

function App() {

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path = {'/home'} component = {Home} />
        <Route path = {'/sell'} component = {Sell} />
        <Route path = {'/sell-device'} component = {SelectDevice} />
        <Route path = {'/device-information'} component = {DeviceInformation} />
        <Route path = {'/checkout-device'} component = {Checkout} />
        <Route component = {NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
