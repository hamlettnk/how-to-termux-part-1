import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1>used to be home</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem"
                }}
            >
                <Link to="/home">home</Link> |{" "}
                <Link to="/termux">termux</Link>
            </nav>
        </div>
    );
}

export default App;