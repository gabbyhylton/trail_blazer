// Signboard.jsx
export default function Signboard({children}) {
    return (
        <div className="tb-bg">
            <div className="tb-wrap">
                <div className="tb-board">
                    {children}
                </div>
            <div className="tb-post"/>
            </div>
        </div>
    );
}