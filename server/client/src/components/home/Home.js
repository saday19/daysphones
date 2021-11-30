import ProcessInfo from './ProcessInfo.js'
import CategorySelectionContainer from './CategorySelectionContainer.js'
import Testimonials from './Testimonials.js'
import GeoLocation from './GeoLocation.js'
import './styles/home.css';

const Home = () => {
  return(
    <>
      <ProcessInfo />
      <hr className = 'split' />
      <CategorySelectionContainer />
      <Testimonials />
      <GeoLocation />
    </>
  );
}

export default Home
