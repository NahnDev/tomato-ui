import { ControlType, DEFAULT_SETTINGS } from "@/constants/control";
import { ControlInterface } from "@/types/control";
import ReactGridLayout from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";

export default class Control {
  public static create(type: ControlType): ControlInterface {
    console.log(DEFAULT_SETTINGS[type]);
    return {
      id: uuidv4(),
      label: "Created",
      type: type,
      coord: { x: 0, y: 0 },
      size: { w: 1, h: 1 },
      config: DEFAULT_SETTINGS[type],
    };
  }

  public static getLayout(item: ControlInterface): ReactGridLayout.Layout {
    return { i: item.id, x: item.coord.x, y: item.coord.y, w: item.size.w, h: item.size.h };
  }
  public static setLayout(control: ControlInterface, layout: ReactGridLayout.Layout): ControlInterface {
    return { ...control, coord: { x: layout.x, y: layout.y }, size: { w: layout.w, h: layout.h } };
  }
}
