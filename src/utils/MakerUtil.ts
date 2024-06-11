import { TSize } from "@/types";

export default class MakerUtil {
  static getAbsoluteSize(size: TSize, scale: number): TSize {
    return {
      width: size.width / scale,
      height: size.height / scale,
    };
  }
}
