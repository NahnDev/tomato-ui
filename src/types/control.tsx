import { ControlType } from "@/constants/control";
import { Layout } from "react-grid-layout";

export type Coord = { x: number; y: number };
export type Size = { width: number; height: number };

export interface Step {
  id: string;
  name: string;
  desc: string;
  meta: string;
}

export interface ControlInterface {
  id: string;
  type: ControlType;
  coord: Coord;
  config: TControlSetting;
  step: Step["id"];
}

export type TControlSetting = {
  label?: string;
  bg?: string;
  size?: Size;
  layout?: Partial<Layout>;
  textStyles?: TTextStyle;
  date?: TDateSetting;
  options?: TOption[];
  heading?: THeadingSetting;
  background?: TBackground;
  border?: TBorder;
};

export type TBackground = {
  backgroundColor: string;
};

export type TBorder = {
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
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

export type THeadingSetting = {
  level?: number;
  format?: string;
  color?: string;
};
