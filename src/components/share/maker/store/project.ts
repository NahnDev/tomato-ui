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

export function useForwardShapes() {
  const [project, setProject] = useProject();
  return (ids: TShape["id"][]) => {
    const shapes = project.shapes;
    let delta = 0;
    const nextShapes = [...shapes]
      .map((shape, index) => {
        delta += ids.includes(shape.id) ? 1 : 0;
        return { shape, index: ids.includes(shape.id) ? index + 1 : index - delta };
      })
      .sort((a, b) => a.index - b.index)
      .map(({ shape }) => shape);
    setProject({ ...project, shapes: nextShapes });
  };
}

export function useBackwardShapes() {
  const [project, setProject] = useProject();
  return (ids: TShape["id"][]) => {
    const shapes = project.shapes;

    let delta = 0;
    const nextShapes = [...shapes]
      .reverse()
      .map((shape, index) => {
        delta += ids.includes(shape.id) ? 1 : 0;
        return { shape, index: ids.includes(shape.id) ? index + 1 : index - delta };
      })
      .sort((a, b) => a.index - b.index)
      .map(({ shape }) => shape)
      .reverse();
    setProject({ ...project, shapes: nextShapes });
  };
}
