import Control from "@/classes/Control";
import { ControlInterface } from "@/types/control";
import { DefaultValue, atom, selector } from "recoil";

export enum Mode {
  Edit = "edit",
  Preview = "preview",
}
export enum CompactType {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export type TBuilderHistory = { value: ControlInterface[]; at: number };
export type TBuilderSettings = {
  grid: {
    cols: number;
    rowHeight: number;
  };
  mode: Mode;
  compactType: CompactType | null;
};

export type TBuilderState = {
  controls: ControlInterface[];
  selected?: ControlInterface;
  histories: TBuilderHistory[];
  setting: TBuilderSettings;
};
export const intialState: TBuilderState = {
  controls: [],
  histories: [],
  setting: {
    grid: {
      cols: 4,
      rowHeight: 50,
    },
    mode: Mode.Edit,
    compactType: CompactType.Vertical,
  },
};
export const builderState = atom({
  key: "builder",
  default: intialState,
});

export const builderControlsState = selector({
  key: "builderControlsState",
  get({ get }) {
    const state = get(builderState);
    return state.controls;
  },
  set({ set, get }, newValue) {
    if (newValue instanceof DefaultValue) return;

    const currentState = get(builderState);
    const newHistories = [...currentState.histories, { value: currentState.controls, at: Date.now() }].slice(-5);
    set(builderState, { ...currentState, controls: newValue, histories: newHistories });
  },
});

export const builderLayoutsState = selector({
  key: "builderLayoutsState",
  get({ get }) {
    return get(builderControlsState).map((control) => Control.getLayout(control));
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    const controls = get(builderControlsState);
    const newControls = controls.reduce((sum, control) => {
      const layout = newValue.find((layout) => layout.i === control.id);
      if (layout) {
        return [...sum, Control.setLayout(control, layout)];
      }
      return sum;
    }, [] as ControlInterface[]);
    set(builderState, { ...get(builderState), controls: newControls });
  },
});

export const builderControlSelectedState = selector({
  key: "builderControlSelectedState",
  get({ get }) {
    return get(builderState).controls.find((control) => control.id === get(builderState).selected?.id);
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    set(builderState, { ...get(builderState), selected: newValue });
  },
});

export const builderSettingsState = selector({
  key: "builderSettingsState",
  get({ get }) {
    return get(builderState).setting;
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    set(builderState, { ...get(builderState), setting: newValue });
  },
});
