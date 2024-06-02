import { ControlType } from "@/constants/control";
import { Layout } from "react-grid-layout";

export type Coord = { x: number; y: number };
export type Size = { w: number; h: number };

export interface ControlInterface {
  id: string;
  type: ControlType;
  coord: Coord;
  config: TControlSetting;
}

export type TControlSetting = {
  label?: string;
  background?: string;
  size?: Size;
  layout?: Partial<Layout>;
  textStyles?: {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
  };
  options: TOptionSetting[];
};

export type TOptionSetting = {
  label: string;
  value: any;
  icon?: string;
  color?: string;
};
