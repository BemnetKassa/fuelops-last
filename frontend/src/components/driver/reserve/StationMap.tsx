"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

interface Station {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface StationMapProps {
  stations: Station[];
  onStationSelect: (stationId: string) => void;
}

const StationMap: React.FC<StationMapProps> = ({ stations, onStationSelect }) => {
  if (stations.length === 0) {
    return <div className="h-96 bg-muted rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  const position: [number, number] = [stations[0].latitude, stations[0].longitude];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }} className="rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]}>
          <Popup>
            <div>
              <h3 className="font-bold">{station.name}</h3>
              <button 
                onClick={() => onStationSelect(station.id)}
                className="text-blue-500 hover:underline"
              >
                Select this station
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StationMap;
