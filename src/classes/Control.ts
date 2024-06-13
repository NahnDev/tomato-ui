import { ControlType, DEFAULT_SETTINGS } from "@/constants/control";
import { ControlInterface } from "@/types/control";
import ReactGridLayout from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";

export default class Control {
  public static create(type: ControlType): ControlInterface {
    return {
      id: uuidv4(),
      type: type,
      coord: { x: 0, y: 0 },
      config: {
        size: { width: 1, height: 1 },
        ...DEFAULT_SETTINGS[type],
      },
    };
  }

  public static getLayout(item: ControlInterface): ReactGridLayout.Layout {
    return {
      i: item.id,
      x: item.coord.x,
      y: item.coord.y,
      w: item.config.size?.width ?? 1,
      h: item.config.size?.height ?? 1,
      ...item.config.layout,
    };
  }
  public static setLayout(control: ControlInterface, layout: ReactGridLayout.Layout): ControlInterface {
    return {
      ...control,
      coord: { x: layout.x, y: layout.y },
      config: { ...control.config, size: { width: layout.w, height: layout.h } },
    };
  }
}
