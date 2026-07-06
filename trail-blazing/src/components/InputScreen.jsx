import { useState } from 'react';

export default function InputScreen({ onGenerate }) {
    const [distance, setDistance] = useState("");

    return (
        <div className="screen input-screen">
            <h2>how far are you willing to go?</h2>
            <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="km"
            />
            <button onClick={() => onGenerate(Number(distance))}>
                generate!
            </button>
        </div>
    );
}