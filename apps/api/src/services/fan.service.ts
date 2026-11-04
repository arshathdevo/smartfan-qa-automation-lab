import type { FanState } from "../types/fan.js";

// Initial fan state
let fanState: FanState = {
  isOn: false,
  speed: 0,
  mode: "NORMAL"
};

// Get current fan state
export const getFanState = (): FanState => {
  return { ...fanState };
};

// Turn fan ON
export const turnFanOn = (): FanState => {
  fanState.isOn = true;

  if (fanState.speed === 0) {
    fanState.speed = 1;
  }

  return getFanState();
};

// Turn fan OFF
export const turnFanOff = (): FanState => {
  fanState.isOn = false;
  fanState.speed = 0;

  return getFanState();
};

// Set fan speed
export const setFanSpeed = (speed: number): FanState => {
  if (!Number.isInteger(speed) || speed < 1 || speed > 6) {
    throw new Error("Fan speed must be between 1 and 6");
  }

  if (!fanState.isOn) {
    throw new Error("Cannot change speed when fan is OFF");
  }

  fanState.speed = speed;

  return getFanState();
};

// Set fan mode
export const setFanMode = (
  mode: FanState["mode"]
): FanState => {
  if (!["NORMAL", "SLEEP", "BOOST"].includes(mode)) {
    throw new Error("Invalid fan mode");
  }

  fanState.mode = mode;

  return getFanState();
};