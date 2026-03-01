import React, { useState } from "react";
import ZenGarden from "./ZenGarden";
import "./styles.css";

export default function App() {
  const [screen, setScreen] = useState("board");

  if (screen === "zen") {
    return <ZenGarden onExit={() => setScreen("board")} />;
  }

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <h1>Heard At Last</h1>

        <button
          className="regulateBtn"
          onClick={() => setScreen("zen")}
        >
          Regulate
        </button>
      </div>

      {/* STARTER BUTTONS */}
      <div className="starterGrid">
        <button className="card">I</button>
        <button className="card">I want</button>
        <button className="card">I need</button>
        <button className="card">I am</button>
        <button className="card">I don't want</button>
      </div>

      {/* DOCK */}
      <div className="dock">
        <button>Yes</button>
        <button>No</button>
        <button>Help</button>
        <button>More</button>
        <button>Stop</button>
        <button>All done</button>
      </div>
    </div>
  );
}
