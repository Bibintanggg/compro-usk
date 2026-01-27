import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
    latitude?: number;
    longitude?: number;
    zoom?: number;
}

export default function LeafletMap({
    latitude = -6.1931,
    longitude = 106.8236,
    zoom = 15
}: LeafletMapProps) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={zoom}
            scrollWheelZoom={false}
            className="w-full h-full rounded-lg"
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    <div className="text-center">
                        <strong>The Plaza Office Tower</strong>
                        <br />
                        32nd Floor
                        Jl. M.H. Thamrin Kav 28–30
                        <br />
                        Jakarta Pusat
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
