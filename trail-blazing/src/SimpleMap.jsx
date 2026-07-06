import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { generateWaypoints, createRoute, createPolygon } from "./routeHelpers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function Recenter({ position }) {
    const map = useMap();
    // if (generatedRef.current) return;
    // if (!position || position[0] == null) return;
    
    // generatedRef.current = true;
    const circleRef = useRef(null);
    useEffect(() => {
        if (position) {
          map.setView(position, map.getZoom());
          const circleboundary = createPolygon([position[1], position[0]]);
          const latLngs = circleboundary.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
          if (circleRef.current) {
          map.removeLayer(circleRef.current);
        }
          circleRef.current = window.L.polygon(latLngs, { color: 'purple', weight: 4, fillOpacity: 0.1 }).addTo(map);
        }
        
    }, [position, map]);
    return;
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
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        console.log("geo update", pos.coords.latitude, pos.coords.longitude);
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        const waypoints = generateWaypoints([coords[1], coords[0]], 5);
        const routeData = await createRoute(waypoints);
        setRoute(routeData);
      },
      (err) => console.error("Geolocation error:", err.message),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        console.log("watch position", pos.coords.latitude, pos.coords.longitude); 
        setPosition([pos.coords.latitude, pos.coords.longitude]); 
      },
      (err) => console.error("Geolocation error:", err.message),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  // Generate route when position changes
  const test_points = [[42.342, -71.056], [42.336, -71.048], [42.336, -71.053], [42.342, -71.056]];
  // coordinates need to be lng, lat not lat, lng
  const test_points_correct = [[-71.056, 42.342], [-71.048, 42.336], [-71.053, 42.336], [-71.056, 42.342]];
  const generatedRef = useRef(false);

  useEffect(() => {
    const generateRoute = async () => {
      if (generatedRef.current) return;
      if (!position || position[0] == null) return;
      
      generatedRef.current = true;
      //const [lat, lng] = position;
      //const waypoints = generateWaypoints([lng, lat], 5);
      //const waypoints = test_points_correct;
      //console.log('Waypoints:', waypoints);
      //const routeData = await createRoute(waypoints);
      //console.log('Route data:', routeData);
      //setRoute(routeData);
    };

    generateRoute();
  }, [position]);

  return (
      <MapContainer
        center={position}
        zoom={13}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        style={{ height: "220px", width: "100%" }}
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
