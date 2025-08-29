import { layerSourceUrl } from '../data/mapVault';

const mapLayersConfigs = [
  {
    id: 'Gas Stations',
    sourceId: 'id-gas',
    sourceUrl: layerSourceUrl.gas,
    sourceLayer: 'bike-app-gas-station',
    iconImage: 'i-gas-station',
  },
  {
    id: 'Restrooms',
    sourceId: 'id-toilets',
    sourceUrl: layerSourceUrl.restrooms,
    sourceLayer: 'bike-app-toilets',
    iconImage: 'i-restroom',
  },
  {
    id: 'Stores & Workshops',
    sourceId: 'id-stores',
    sourceUrl: layerSourceUrl.stores,
    sourceLayer: 'bike-app-stores',
    iconImage: 'i-store',
    iconAllowOverlap: true,
  },
  {
    id: 'Parking',
    sourceId: 'id-parking',
    sourceUrl: layerSourceUrl.parking,
    sourceLayer: 'bike-app-parking',
    iconImage: 'i-parking',
  },
];

export default mapLayersConfigs;
