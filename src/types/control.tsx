import { ControlType } from "@/constants/control";

export type Coord = { x: number; y: number };
export type Size = { w: number; h: number };

export interface ControlInterface {
  id: string;
  type: ControlType;
  label: string;
  coord: Coord;
  size: Size;
  config: TControlSetting;
}

export type TControlSetting = {
  label?: string;
  background?: string;
};
