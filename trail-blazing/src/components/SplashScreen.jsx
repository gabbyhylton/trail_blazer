import "./Signboard.css";

export default function SplashScreen({ onStart }) {
    return (
        <div className="screen splash-screen">
            <h1 className="festive-regular">Trail   Blazer</h1>
            <p className="ruge-boogie-regular">find a new path</p>
            <button className="btn-start" onClick={onStart}>
                start here!
            </button>
        </div>
    );
}