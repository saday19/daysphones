import './styles/footer.css'

const Footer = () => {

  const sell_data = [
    {
      name: "Apple iPhone",
      link: "/sell-iphone"
    },
    {
      name: "Samsung Galaxy",
      link: "/sell-samsung-galaxy"
    },
    {
      name: "Apple Watch",
      link: "/sell-apple-watch"
    },
    {
      name: "Apple iPad",
      link: "/sell-ipad"
    }
  ];

  const business_data = [
    {
      name: "Contact Us"
    },
    {
      name: "How it Works"
    },
    {
      name: "Terms of Service"
    },
    {
      name: "Privacy Policy"
    }
  ];

  return (
    <div className = 'footer'>
      <div className = 'content-container'>
        <div className = 'footer-list footer-list-small'>
          <img alt = 'logo' className = 'footer-image' src = '/images/nav/white-logo.png' />
        </div>
        <div className = 'footer-list footer-list-small'>
          <p className = 'footer-header'>
            Sell
          </p>
          {sell_data.map( (item) =>
            <p key = {item.name} className = 'footer-text'>
              <a className = 'clear-text-format' href = {item.link}>{item.name}</a>
            </p>
          )}
        </div>
        <div className = 'footer-list footer-list-small'>
          <p className = 'footer-header'>
            DaysPhones
          </p>
          {business_data.map( (item) =>
            <p key = {item.name} className = 'footer-text'>
              <a>{item.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer
