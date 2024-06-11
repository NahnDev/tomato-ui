import { TCoord, TSize } from "@/types";
import { Layer } from "konva/lib/Layer";
import { TBoard } from "./type";

export function getCenterCoord(box: TSize, ele: TSize) {
  return {
    x: (box.width - ele.width) / 2,
    y: (box.height - ele.height) / 2,
  };
}

export default class MakerBoardUtil {
  static getAbsoluteCoord<T extends TCoord>(size: TSize, coord: T): T {
    return {
      ...coord,
      x: size.width / 2 + (coord.x ?? 0),
      y: size.height / 2 + (coord.y ?? 0),
    };
  }

  static getRelativeCoord<T extends TCoord>(size: TSize, coord: T): T {
    return {
      ...coord,
      x: (coord.x ?? 0) - size.width / 2,
      y: (coord.y ?? 0) - size.height / 2,
    };
  }

  static getCoord(item: { x?: number; y?: number }) {
    return {
      x: item.x || 0,
      y: item.y || 0,
    };
  }
}
