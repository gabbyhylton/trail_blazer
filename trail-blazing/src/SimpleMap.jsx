import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { generateWaypoints, createRoute } from "./routeHelpers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function Recenter({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) map.setView(position, map.getZoom());
    }, [position]);
return null;
};

function NewRoute({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.features) {
      const coordinates = route.features[0].geometry.coordinates;
      const latLngs = coordinates.map(([lng, lat]) => [lat, lng]);
      window.L.polyline(latLngs, { color: 'blue', weight: 4 }).addTo(map);
    }
  }, [route, map]);
  return null;
}

const SimpleMap = () => {
  const mapRef = useRef(null);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [route, setRoute] = useState(null);

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

  // Generate route when position changes
  const test_points = [[42.342, -71.056], [42.336, -71.048], [42.336, -71.053], [42.342, -71.056]];
  // coordinates need to be lng, lat not lat, lng
  const test_points_correct = [[-71.056, 42.342], [-71.048, 42.336], [-71.053, 42.336], [-71.056, 42.342]];
  
  useEffect(() => {
    const generateRoute = async () => {
      const [lat, lng] = position;
      const waypoints = generateWaypoints([lng, lat], 5);
      //const waypoints = test_points_correct;
      console.log('Waypoints:', waypoints);
      if (waypoints) {
        const routeData = await createRoute(waypoints);
        console.log('Route data:', routeData);
        setRoute(routeData);
      }
    };

    generateRoute();
  }, [position]);

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
        <NewRoute route={route} />
      </MapContainer>
  );
};

export default SimpleMap;
