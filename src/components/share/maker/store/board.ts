import { selector, DefaultValue, useRecoilValue, useRecoilState } from "recoil";
import { makerAtom } from "./atom";
import { TShape } from "../type";

export const boardSelector = selector({
  key: "board",
  get: ({ get }) => get(makerAtom).board,
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    set(makerAtom, { ...get(makerAtom), board: newValue });
  },
});

export function useBoard() {
  return useRecoilState(boardSelector);
}
export function useBoardSize() {
  return useRecoilValue(boardSelector).size;
}
export function useBoardScale() {
  return useRecoilValue(boardSelector).scale;
}
export function useBoardBase() {
  return useRecoilValue(boardSelector).base;
}
