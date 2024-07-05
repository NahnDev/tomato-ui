import { atomFamily, selectorFamily, useRecoilState, useRecoilValueLoadable } from "recoil";
import ResourceApi from "./api";
import { TResourceItem } from "./seed";

export type ResourceState = TResourceItem[];
export const resourceState = atomFamily({
  key: "resource",
  default: selectorFamily({
    key: "resource/default",
    get: (id: string) => async () => {
      return await ResourceApi.getByDirectory(id);
    },
  }),
});

export function useResources(id: string) {
  const { contents: resources, state } = useRecoilValueLoadable(resourceState(id));

  return [state === "hasValue" ? resources : [], state === "loading"] as const;
}
