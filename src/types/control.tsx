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
  textStyles?: TTextStyle;
  date?: TDateSetting;
  options?: TOption[];
  level?: number;
};

export type TOption = {
  label: string;
  value: any;
  icon?: string;
  color?: string;
};

export type TTextStyle = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";
};

export type TDateSetting = {
  format?: string;
  minDate?: string;
  maxDate?: string;
};
