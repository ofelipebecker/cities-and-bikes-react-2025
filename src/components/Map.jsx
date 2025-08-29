import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import {
  customCenterCoords,
  customMapStyle,
  customMaxBoundsCoords,
} from '../data/mapVault';

import mapLayersConfigs from '../data/mapLayersConfigs';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = ({ onMapLoad }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    /* Map Initialization */
    const centerCoords = customCenterCoords;
    const mapStyle = customMapStyle;

    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      maxBounds: customMaxBoundsCoords,
      style: mapStyle,
      center: centerCoords,
      zoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const savedVisibility = JSON.parse(
      localStorage.getItem('layerVisibility') || '{}'
    );

    /* Map Layers Insertion */
    const addSymbolLayer = (
      map,
      {
        id,
        sourceId,
        sourceUrl,
        sourceLayer,
        iconImage,
        iconAllowOverlap = false,
      }
    ) => {
      map.current.addSource(sourceId, {
        type: 'vector',
        url: sourceUrl,
      });

      map.current.addLayer({
        id,
        type: 'symbol',
        source: sourceId,
        layout: {
          visibility: savedVisibility[id] || 'visible',
          'icon-image': iconImage,
          'icon-allow-overlap': iconAllowOverlap,
          'icon-anchor': 'bottom',
          'icon-size': 1.1,
        },
        'source-layer': sourceLayer,
      });
    };

    map.current.on('load', () => {
      mapLayersConfigs.forEach((config) => addSymbolLayer(map, config));

      // Geolocation Control
      (function initGeolocation(mapInstance) {
        const geolocate = new mapboxgl.GeolocateControl({
          fitBoundsOptions: { maxZoom: 11, duration: 2000 },
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserLocation: true,
          showAccuracyCircle: false,
        });

        mapInstance.addControl(geolocate);

        setTimeout(() => geolocate.trigger(), 500);

        return geolocate;
      })(map.current);

      if (onMapLoad) {
        onMapLoad(map.current);
      }
    });
  }, [onMapLoad]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100vh' }}
      className="z-1"
    />
  );
};

Map.propTypes = {
  onMapLoad: PropTypes.func,
};

export default Map;
