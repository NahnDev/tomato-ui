import Control from "@/classes/Control";
import { ControlInterface, Step } from "@/types/control";
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

export type TDocument = {
  controls: ControlInterface[];
  steps: Step[];
  histories: TBuilderHistory[];
  setting: TBuilderSettings;
};

export type TState = {
  selected?: ControlInterface;
  step?: Step["id"];
};

export const intialState: TState = {
  selected: undefined,
  step: undefined,
};

export const intialDocument: TDocument = {
  controls: [],
  histories: [],
  steps: [],
  setting: {
    grid: {
      cols: 4,
      rowHeight: 50,
    },
    mode: Mode.Edit,
    compactType: CompactType.Vertical,
  },
};

export const document = atom({
  key: "document",
  default: intialDocument,
});

export const state = atom({
  key: "state",
  default: intialState,
});

export const documentControls = selector({
  key: "document/controls",
  get({ get }) {
    const step = get(state).step;
    const controls = get(document).controls;
    return controls.filter((control) => control.step === step);
  },
  set({ set, get }, newValue) {
    if (newValue instanceof DefaultValue) return;
    const step = get(state).step;
    const otherControls = get(document).controls.filter((control) => control.step !== step);
    // const currentState = get(document);
    // const newHistories = [...currentState.histories, { value: currentState.controls, at: Date.now() }].slice(-5);
    set(document, { ...get(document), controls: [...otherControls, ...newValue] });
  },
});

export const documentLayouts = selector({
  key: "document/layouts",
  get({ get }) {
    return get(documentControls).map((control) => Control.getLayout(control));
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    const controls = get(document).controls;
    const newControls = controls.reduce((sum, control) => {
      const layout = newValue.find((layout) => layout.i === control.id);
      if (layout) {
        return [...sum, Control.setLayout(control, layout)];
      }
      return [...sum, control];
    }, [] as ControlInterface[]);
    set(document, { ...get(document), controls: newControls });
  },
});

export const documentSettings = selector({
  key: "document/settings",
  get({ get }) {
    return get(document).setting;
  },
  set({ get, set }, newValue) {
    if (newValue instanceof DefaultValue) return;
    set(document, { ...get(document), setting: newValue });
  },
});
