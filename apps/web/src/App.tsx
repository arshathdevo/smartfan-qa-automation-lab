
import { useState } from "react";
import "./App.css";

type FanMode = "NORMAL" | "SLEEP" | "BOOST";

function App() {
  const [isOn, setIsOn] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [mode, setMode] = useState<FanMode>("NORMAL");

  const handlePowerToggle = () => {
    if (isOn) {
      setIsOn(false);
      setSpeed(0);
    } else {
      setIsOn(true);
      setSpeed(1);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (isOn) {
      setSpeed(newSpeed);
    }
  };

  const energyUsage = isOn ? (speed * 2.5).toFixed(1) : "0.0";

  return (
    <main className="dashboard">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">✦</span>
          <span>SmartFan</span>
        </div>

        <div className="connection">
          <span className="status-dot" />
          Simulation Mode
        </div>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">SMART HOME CONTROL</p>
          <h1>Fan Dashboard</h1>
          <p className="subtitle">
            Control your comfort with intelligent fan management.
          </p>
        </div>
        <div className="room-label">Living Room</div>
      </section>

      <section className="overview-grid">
        <article className="card fan-card">
          <div className="card-heading">
            <div>
              <p className="card-label">YOUR SMART FAN</p>
              <h2>Living Room Fan</h2>
            </div>
            <span className={isOn ? "fan-status active" : "fan-status"}>
              {isOn ? "ON" : "OFF"}
            </span>
          </div>

          <div className={isOn ? "fan-visual spinning" : "fan-visual"}>
            <span>✣</span>
          </div>

          <p className="fan-description">
            {isOn ? "Your fan is running" : "Your fan is currently switched off"}
          </p>

          <button
            className={isOn ? "power-button power-on" : "power-button"}
            onClick={handlePowerToggle}
          >
            {isOn ? "Turn OFF" : "Turn ON"}
          </button>
        </article>

        <article className="card control-card">
          <p className="card-label">FAN CONTROLS</p>
          <h2>Speed Control</h2>

          <div className="speed-display">
            <strong>{speed}</strong>
            <span>/ 6</span>
          </div>

          <div className="speed-options">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                className={speed === level ? "speed-button selected" : "speed-button"}
                disabled={!isOn}
                onClick={() => handleSpeedChange(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <p className="helper-text">
            {isOn ? "Select your preferred speed" : "Turn on the fan to adjust speed"}
          </p>

          <div className="mode-section">
            <h3>Operating Mode</h3>
            <div className="mode-options">
              {(["NORMAL", "SLEEP", "BOOST"] as FanMode[]).map((fanMode) => (
                <button
                  key={fanMode}
                  className={mode === fanMode ? "mode-button selected" : "mode-button"}
                  onClick={() => setMode(fanMode)}
                >
                  {fanMode}
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="metrics-grid">
        <article className="card metric-card">
          <span className="metric-icon">🌡️</span>
          <p className="card-label">ROOM TEMPERATURE</p>
          <h2>26.5°C</h2>
          <p className="metric-note">Simulated temperature</p>
        </article>

        <article className="card metric-card">
          <span className="metric-icon">⚡</span>
          <p className="card-label">ENERGY USAGE</p>
          <h2>{energyUsage} W</h2>
          <p className="metric-note">Estimated power consumption</p>
        </article>

        <article className="card metric-card">
          <span className="metric-icon">◈</span>
          <p className="card-label">CURRENT MODE</p>
          <h2>{mode}</h2>
          <p className="metric-note">Selected operating mode</p>
        </article>
      </section>

      <footer className="footer">
        SmartFan QA Automation Lab · Educational Simulation
      </footer>
    </main>
  );
}

export default App;
