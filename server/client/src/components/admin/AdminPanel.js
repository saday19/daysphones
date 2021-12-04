import './styles/panel.css';
import PanelNav from './PanelNav.js';
import AdminPanelDevices from './AdminPanelDevices.js';
import {useState} from 'react';

const AdminPanel = () => {

  const [usingStats, setUsingStats] = useState(true);
  const [usingCustomers, setUsingCustomers] = useState(false);
  const [usingDevices, setUsingDevices] = useState(false);
  const [usingSettings, setUsingSettings] = useState(false);

  return(
    <>
      <PanelNav
        stats = {setUsingStats}
        customers = {setUsingCustomers}
        devices = {setUsingDevices}
        settings = {setUsingSettings}
      />

      {usingStats && <a>stats</a>}
      {usingCustomers && <a>customers</a>}
      {usingDevices && <AdminPanelDevices />}
      {usingSettings && <a>settings</a>}
    </>
  );
}

export default AdminPanel;
