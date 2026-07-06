import "./Signboard.css";

export default function SplashScreen({ onStart }) {
    return (
        <div className="screen splash-screen">
            <h1 className="trail-title">TRAIL BLAZER</h1>
            <p className="trail-tagline">find a new path</p>
            <button className="btn-start" onClick={onStart}>
                start here!
            </button>
        </div>
    );
}