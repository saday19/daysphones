import './styles/process.css';

const ProcessInfo = () => {

  const process_data = [
    {
      key: "select",
      title: "1. Select your device.",
      image: "/images/process/phone_icon.png"
    },
    {
      key: "ship",
      title: "2. Ship for free.",
      image: "/images/process/package_icon.png"
    },
    {
      key: "receive",
      title: "3. Get paid fast.",
      image: "/images/process/payment_icon.png"
    }
  ];

  return(
    <div className = 'center-text'>
    <h2>3 easy steps to trade in your device</h2>
      <div className = 'process-container'>
        {process_data.map( (card) =>
          <div key = {card.key} className = 'card'>
            <h3 className = 'card-title'>{card.title}</h3>
            <img className = 'card-image' src = {card.image} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessInfo
