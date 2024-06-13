import { TCoord, TSize } from "@/types";
import { ShapeConfig } from "konva/lib/Shape";

export enum TShapeType {
  Rect = "Rect",
  Circle = "Circle",
  Image = "Image",
}

export enum TAction {
  Crop = "Crop",
}

export enum TMode {
  View = "View",
  Crop = "Crop",
}

export type TShape = ShapeConfig & TSize & TCoord & { type: TShapeType; id: string };
export type TBoard = { base: TSize; scale: number; size: TSize; selected?: TShape["id"][] };
export type TProject = { width: number; height: number; shapes: TShape[] };
export type TStatus = { scale: number };
