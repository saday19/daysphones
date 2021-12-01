import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home.js';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Sell from './components/sell/Sell.js';
import SelectDevice from './components/sell/SelectDevice.js';
import DeviceInformation from './components/sell/DeviceInformation.js'
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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
