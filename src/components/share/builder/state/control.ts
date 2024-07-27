import { ControlType, DEFAULT_SETTINGS } from "@/constants/control";
import { ControlInterface, Step } from "@/types/control";
import { selector, DefaultValue, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { document, state } from "./store";

export class ControlBuilder {
  private type?: ControlType;
  private step?: Step["id"];
  constructor() {}

  build(): ControlInterface {
    if (!this.type) throw new Error("Control type is required");
    if (!this.step) throw new Error("Step is required");
    return {
      id: uuidv4(),
      type: this.type,
      coord: { x: 0, y: 0 },
      config: {
        size: { width: 1, height: 1 },
        ...DEFAULT_SETTINGS[this.type],
      },
      step: this.step,
    };
  }

  setType(type: ControlType) {
    this.type = type;
    return this;
  }

  setStep(step: Step["id"]) {
    this.step = step;
    return this;
  }
}

export const controlSelector = selector({
  key: "document/control/selected",
  get({ get }) {
    return get(document).controls.find((control) => control.id === get(state).selected?.id);
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    set(state, { ...get(state), selected: newValue });
  },
});

export function useControlSelected() {
  return useRecoilState(controlSelector);
}
