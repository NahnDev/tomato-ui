import { atom } from "recoil";
import { TProject, TStatus, TMode, TBoard } from "../type";

export type TMakerState = {
  project?: TProject;
  board: TBoard;
  mode: TMode;
};

export const makerAtom = atom({
  key: "maker",
  default: {
    project: undefined,
    board: { base: { width: 0, height: 0 }, scale: 1, size: { width: 0, height: 0 } },
    mode: TMode.View,
  } as TMakerState,
});
