import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Sell from './components/sell/Sell.js';
import NotFound from './components/NotFound.js';
import SelectDevice from './components/sell/SelectDevice.js';
import DeviceInformation from './components/sell/DeviceInformation.js';
import Checkout from './components/sell/Checkout.js';
import Admin from './components/admin/Admin.js';
import './app.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path = {'/home'}>
          <Nav />
          <Home />
          <Footer />
        </Route>
        <Route path = {'/sell'}>
          <Nav />
          <Sell />
          <Footer />
        </Route>
        <Route path = {'/sell-device'}>
          <Nav />
          <SelectDevice />
          <Footer />
        </Route>
        <Route path = {'/device-information'}>
          <Nav />
          <DeviceInformation />
          <Footer />
        </Route>
        <Route path = {'/checkout-device'}>
          <Nav />
          <Checkout />
          <Footer />
        </Route>
        <Route path = {'/admin'}>
          <Admin />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
