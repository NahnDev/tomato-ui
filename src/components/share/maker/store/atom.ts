import { atom } from "recoil";
import { TProject, TStatus, TMode, TBoard } from "../type";

export type TMakerState = {
  project?: TProject;
  mode: TMode;
};

export const makerAtom = atom({
  key: "maker",
  default: {
    project: undefined,
    mode: TMode.View,
  } as TMakerState,
});
