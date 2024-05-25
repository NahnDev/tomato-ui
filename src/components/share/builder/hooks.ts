import { ControlInterface } from "@/types/control";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { TBuilderHistory, builderControlSelectedState, builderControlsState, builderState } from "./store";

export function useSetControl(control: ControlInterface) {
  const [controls, setControls] = useRecoilState(builderControlsState);
  return setControls(controls.map((el) => (el.id === control.id ? control : el)));
}

export function useSetSettingControl(id: ControlInterface["id"]) {
  const [controls, setControls] = useRecoilState(builderControlsState);
  return (config: Partial<ControlInterface["config"]>) =>
    setControls(
      controls.map((control) =>
        control.id === id ? { ...control, config: { ...control.config, ...config } } : control
      )
    );
}

export function useControlSelected() {
  return useRecoilState(builderControlSelectedState);
}

export function useDeleteControl() {
  const [controls, setControls] = useRecoilState(builderControlsState);
  return (id: string) => {
    setControls(controls.filter((control) => control.id !== id));
  };
}

export function useHistories() {
  return useRecoilValue(builderState).histories;
}

export function useLoadHistory() {
  const setControls = useSetRecoilState(builderControlsState);
  return (history: TBuilderHistory) => setControls(history.value);
}
