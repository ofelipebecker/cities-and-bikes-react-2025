import Map from '../components/Map';
import PropTypes from 'prop-types';

const Home = ({ onMapLoad }) => {
  return (
    <div className="container-fluid p-0 text-center">
      <div className="row g-0">
        <div className="col-12">
          <Map onMapLoad={onMapLoad} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  onMapLoad: PropTypes.func,
};

export default Home;
