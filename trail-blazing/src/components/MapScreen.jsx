import SimpleMap from '../SimpleMap';
import './MapScreen.css';

export default function MapScreen({ distance }) {
  return (
    <div className="screen map-screen">
      <h2>your trail is ready</h2>
      <p>{distance ? `${distance} km route` : 'route ready'}</p>
      <div className="map-frame">
        <SimpleMap />
      </div>
    </div>
  );
}
