
const PanelNav = (props) => {
  return(
    <div className = 'panel-nav-container'>
      <div className = 'panel-nav'>
        <div className = 'panel-nav-item' onClick = {() => {
          props.stats(true);
          props.customers(false);
          props.devices(false);
          props.settings(false);
        }}>
          Stats
        </div>
        <div className = 'panel-nav-item' onClick = {() => {
          props.stats(false);
          props.customers(true);
          props.devices(false);
          props.settings(false);
        }}>
          Customers
        </div>
        <div className = 'panel-nav-item' onClick = {() => {
          props.stats(false);
          props.customers(false);
          props.devices(true);
          props.settings(false);
        }}>
          Devices
        </div>
        <div className = 'panel-nav-item' onClick = {() => {
          props.stats(false);
          props.customers(false);
          props.devices(false);
          props.settings(true);
        }}>
          Settings
        </div>
      </div>
    </div>
  );
}

export default PanelNav;
