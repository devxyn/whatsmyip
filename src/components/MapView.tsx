import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type Popup as PopupType } from "leaflet";
import { useMapContext } from "../context/MapContext";
import { parseLocation } from "../utils";

// Custom marker icon using the logo.png in the public folder
const customIcon = L.icon({
  iconUrl: "/logo.png",
  iconSize: [32, 32], // Adjust size as needed
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
});

const MapUpdater = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
};

const MapView = () => {
  const popupRef = useRef<PopupType | null>(null);
  const { ipData } = useMapContext();
  const { latitude, longitude } = parseLocation(ipData?.loc);

  if (!ipData || (latitude === 0 && longitude === 0)) {
    return <div className='w-full lg:w-1/2 flex-1 border-l border-light-border min-h-[250px]' />;
  }

  return (
    <div className='flex-1 w-full lg:w-1/2 h-full xs:h-[350px] sm:h-[400px] lg:h-auto border-l border-light-border min-h-[250px] px-5 lg:px-0 pb-5 lg:pb-0'>
      <MapContainer
        center={[latitude, longitude]}
        zoom={17}
        className='h-full w-full min-h-[600px] rounded-lg lg:rounded-none'>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup ref={popupRef}>
            Location: {latitude}, {longitude}
          </Popup>
        </Marker>
        <MapUpdater lat={latitude} lng={longitude} />
      </MapContainer>
    </div>
  );
};

export default MapView;
