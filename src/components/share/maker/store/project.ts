import { DefaultValue, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { TMode, TProject, TShape, TStatus } from "../type";
import { select } from "@material-tailwind/react";
import { makerAtom } from "@/components/share/maker/store/atom";

export const projectSelector = selector({
  key: "project",
  get: ({ get }) => get(makerAtom).project,
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    set(makerAtom, { ...get(makerAtom), project: newValue });
  },
});

export function useProject() {
  const [project, setProject] = useRecoilState(projectSelector);
  return [project, setProject] as [TProject, (project: TProject) => void];
}

export function useProjectShapes() {
  const project = useRecoilValue(projectSelector);
  return project?.shapes ?? [];
}

export function useProjectSize() {
  const project = useRecoilValue(projectSelector);
  return { width: project?.width ?? 0, height: project?.height ?? 0 };
}
