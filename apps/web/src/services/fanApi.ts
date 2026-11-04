
const API_URL = "http://localhost:5000/api/fan";

export interface FanState {
  isOn: boolean;
  speed: number;
  mode: "NORMAL" | "SLEEP" | "BOOST";
}

export const getFanState = async (): Promise<FanState> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch fan state");
  }

  const result = await response.json();

  return result.data;
};

export const turnFanOn = async (): Promise<FanState> => {
  const response = await fetch(`${API_URL}/power/on`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Failed to turn fan ON");
  }

  const result = await response.json();

  return result.data;
};

export const turnFanOff = async (): Promise<FanState> => {
  const response = await fetch(`${API_URL}/power/off`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Failed to turn fan OFF");
  }

  const result = await response.json();

  return result.data;
};

export const updateFanSpeed = async (
  speed: number
): Promise<FanState> => {
  const response = await fetch(`${API_URL}/speed`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ speed })
  });

  if (!response.ok) {
    throw new Error("Failed to update fan speed");
  }

  const result = await response.json();

  return result.data;
};

export const updateFanMode = async (
  mode: FanState["mode"]
): Promise<FanState> => {
  const response = await fetch(`${API_URL}/mode`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mode })
  });

  if (!response.ok) {
    throw new Error("Failed to update fan mode");
  }

  const result = await response.json();

  return result.data;
};
