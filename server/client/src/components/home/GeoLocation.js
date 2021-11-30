import './styles/geolocation.css'

const GeoLocation = () => {
  return (
    <div className = 'geo'>
      <h1 className = 'location-header'>Located Near You</h1>
      <div className = 'location-container'>
        <iframe className = 'location-frame' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.846020939668!2d-94.7933971848843!3d30.069947881872945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863f4b272a2aa7af%3A0xc0550e78c663cd2f!2sDaze%20iPhone%20Repair!5e0!3m2!1sen!2sus!4v1638222350786!5m2!1sen!2sus" loading="lazy"></iframe>
      </div>
      <p className = 'location-info'>1421 N Main St, Liberty, TX 77575</p>
      <p className = 'location-info'>(936) 657-0939</p>
    </div>
  );
};

export default GeoLocation
