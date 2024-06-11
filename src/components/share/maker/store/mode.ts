import { selector, DefaultValue, useRecoilState } from "recoil";
import { makerAtom } from "./atom";

export const modeSelector = selector({
  key: "mode",
  get: ({ get }) => get(makerAtom).mode,
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    set(makerAtom, { ...get(makerAtom), mode: newValue });
  },
});

export function useMode() {
  return useRecoilState(modeSelector);
}
