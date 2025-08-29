import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import logoHorizontal from '../assets/images/logo-h.svg';

import gasStationIcon from '../assets/images/side-nav-icons/i-gas-station.svg';
import parkingIcon from '../assets/images/side-nav-icons/i-parking.svg';
import restroomIcon from '../assets/images/side-nav-icons/i-restroom.svg';
import storeIcon from '../assets/images/side-nav-icons/i-store.svg';

const layerStorageKey = 'visibleLayers';

const defaultLayerState = {
  Parking: true,
  'Stores & Workshops': true,
  'Gas Stations': true,
  Restrooms: true,
};

const Navbar = ({ map }) => {
  const [visibleLayers, setVisibleLayers] = useState(defaultLayerState);

  useEffect(() => {
    const savedState = localStorage.getItem(layerStorageKey);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setVisibleLayers(parsed);
      if (map) {
        Object.entries(parsed).forEach(([layerId, isVisible]) => {
          map.setLayoutProperty(
            layerId,
            'visibility',
            isVisible ? 'visible' : 'none'
          );
        });
      }
    }
  }, [map]);

  const toggleLayerVisibility = (layerId) => {
    if (!map) return;

    const isVisible = visibleLayers[layerId];
    const newVisibility = isVisible ? 'none' : 'visible';

    map.setLayoutProperty(layerId, 'visibility', newVisibility);

    const newState = {
      ...visibleLayers,
      [layerId]: !isVisible,
    };
    setVisibleLayers(newState);
    localStorage.setItem(layerStorageKey, JSON.stringify(newState));
  };

  const setButtonClass = (layerId) => {
    const baseClasses =
      'btn btn-light-blue flex-center p-3 position-relative text-start text-nowrap w-100';

    return visibleLayers[layerId] ? `${baseClasses} active-layer` : baseClasses;
  };

  return (
    <>
      <header className="sticky-top">
        <nav className="navbar bg-main p-0">
          <div className="container-fluid shadow-2">
            <div className="d-flex align-items-center py-2">
              <button
                className="navbar-toggler p-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-drawer"
                aria-controls="navbar-drawer"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="navbar-logo">
                <img
                  src={logoHorizontal}
                  className="max-h-40 ms-3"
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <aside>
        <div className="collapse shadow-1 z-2" id="navbar-drawer">
          <ul className="list-unstyled ps-2">
            <li>
              <button
                className={setButtonClass('Parking')}
                onClick={() => toggleLayerVisibility('Parking')}
                title="Estacionamento de Bikes"
              >
                <span className="bi bi-square"></span>
                <img className="me-4" src={parkingIcon} alt="" />
                Estacionamento
              </button>
            </li>
            <li>
              <button
                className={setButtonClass('Stores & Workshops')}
                onClick={() => toggleLayerVisibility('Stores & Workshops')}
                title="Lojas & Oficinas"
              >
                <span className="bi bi-square"></span>
                <img className="me-4" src={storeIcon} alt="" />
                Lojas & Oficinas
              </button>
            </li>
            <li>
              <button
                className={setButtonClass('Gas Stations')}
                onClick={() => toggleLayerVisibility('Gas Stations')}
                title="Postos de Gasolina"
              >
                <span className="bi bi-square"></span>
                <img className="me-4" src={gasStationIcon} alt="" />
                Postos de Gasolina
              </button>
            </li>
            <li>
              <button
                className={setButtonClass('Restrooms')}
                onClick={() => toggleLayerVisibility('Restrooms')}
                title="Banheiros"
              >
                <span className="bi bi-square"></span>
                <img className="me-4" src={restroomIcon} alt="" />
                Banheiros
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

Navbar.propTypes = {
  map: PropTypes.func,
};

export default Navbar;
