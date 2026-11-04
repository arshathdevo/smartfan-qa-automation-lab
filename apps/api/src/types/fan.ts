export type FanMode = "NORMAL" | "SLEEP" | "BOOST";

export interface FanState {
  isOn: boolean;
  speed: number;
  mode: FanMode;
}
