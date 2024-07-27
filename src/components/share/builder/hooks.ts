import { ControlInterface } from "@/types/control";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Mode, TBuilderHistory, documentControls, documentSettings, document } from "./state/store";
import { controlSelector } from "./state/control";

export function useSetControl(control: ControlInterface) {
  const [controls, setControls] = useRecoilState(documentControls);
  return setControls(controls.map((el) => (el.id === control.id ? control : el)));
}

export function useSetSettingControl(id: ControlInterface["id"]) {
  const [controls, setControls] = useRecoilState(documentControls);
  return (config: Partial<ControlInterface["config"]>) =>
    setControls(
      controls.map((control) =>
        control.id === id ? { ...control, config: { ...control.config, ...config } } : control
      )
    );
}

export function useDeleteControl() {
  const [controls, setControls] = useRecoilState(documentControls);
  return (id: string) => {
    setControls(controls.filter((control) => control.id !== id));
  };
}

export function useHistories() {
  return useRecoilValue(document).histories;
}

export function useLoadHistory() {
  const setControls = useSetRecoilState(documentControls);
  return (history: TBuilderHistory) => setControls(history.value);
}

export function useAllowEditing() {
  return useRecoilValue(documentSettings).mode === Mode.Edit;
}
