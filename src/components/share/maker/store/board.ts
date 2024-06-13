import { selector, DefaultValue, useRecoilValue, useRecoilState, atom } from "recoil";
import { makerAtom } from "./atom";
import { TBoard, TShape } from "../type";
import { useProjectShapes } from "./project";
import { useMemo } from "react";

export const boardAtom = atom({
  key: "board",
  default: { base: { width: 0, height: 0 }, scale: 1, size: { width: 0, height: 0 }, selected: [] } as TBoard,
});

export function useBoard() {
  return useRecoilState(boardAtom);
}
export function useBoardSize() {
  return useRecoilValue(boardAtom).size;
}
export function useBoardScale() {
  return useRecoilValue(boardAtom).scale;
}
export function useBoardBase() {
  return useRecoilValue(boardAtom).base;
}

export function useBoardSelectedState() {
  const shapes = useProjectShapes();
  const [board, setBoard] = useRecoilState(boardAtom);
  const selected = useMemo(
    () => (board.selected ?? []).filter((id) => shapes.some((shape) => shape.id === id)),
    [shapes, board.selected]
  );

  const add = (id: TShape["id"]) => {
    const idSet = new Set(board.selected ?? []);
    idSet.add(id);
    setBoard({ ...board, selected: Array.from(idSet) });
  };

  const remove = (id: TShape["id"]) => {
    const idSet = new Set(board.selected ?? []);
    idSet.delete(id);
    setBoard({ ...board, selected: Array.from(idSet) });
  };

  const reset = () => {
    setBoard({ ...board, selected: [] });
  };

  const toggle = (id: TShape["id"], shift: boolean = false) => {
    const exist = (board.selected ?? []).includes(id);
    if (shift) {
      exist ? remove(id) : add(id);
    } else {
      setBoard({ ...board, selected: exist ? [] : [id] });
    }
  };

  return [selected, { add, remove, reset, toggle }] as [
    string[],
    {
      add: (id: TShape["id"]) => void;
      remove: (id: TShape["id"]) => void;
      reset: () => void;
      toggle: (id: TShape["id"], shift: boolean) => void;
    }
  ];
}
