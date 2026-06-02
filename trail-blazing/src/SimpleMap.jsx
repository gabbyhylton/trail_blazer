import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Recenter({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) map.setView(position, map.getZoom());
    }, [position]);
return null;
};

const SimpleMap = () => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation not available in this browser");
      return;
    }

    const id = navigator.geolocation.watchPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Geolocation error:", err.message),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
      <MapContainer
        center={position}
        zoom={13}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        style={{ height: "50vw", width: "84vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter position={position} />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
  );
};

export default SimpleMap;
