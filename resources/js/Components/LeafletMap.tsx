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
    latitude = -6.2170907,
    longitude = 106.8838618,
    zoom = 17
}: LeafletMapProps) {
    const locations = [
        { lat: -6.1931, lng: 106.8236, title: 'The Plaza Office Tower' },
        { lat: -6.2000, lng: 106.8167, title: 'Monas' },
        { lat: -6.1754, lng: 106.8272, title: 'Istana Negara' },
    ];
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={zoom}
            scrollWheelZoom={false}
            className="w-full h-full rounded-lg"
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap &copy; CARTO'
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    <div className="text-center">
                        <strong>SMKN 46 Jakarta</strong>
                        <br />
                        B7, Jl. Cipinang Pulo No.19, RT.7/RW.14, North Cipinang Besar
                        <br />
                        Jakarta Timur, Jakarta 13410
                    </div>
                </Popup>
            </Marker>
        </MapContainer>

    );
}
