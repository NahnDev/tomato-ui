import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import ResourceApi, { TUpdateResourcePayload } from "./api";
import { ROOT_DIRECTORY, TResourceItem } from "./type";
import { useTaskWrapper } from "@/state/task/taskAtom";
import { useMemo } from "react";
import { AxiosProgressEvent } from "axios";

export type ResourceState = TResourceItem[];
export const resourceState = atomFamily({
  key: "resource",
  default: selectorFamily({
    key: "resource/default",
    get: (id: string) => async () => {
      return (await ResourceApi.getByDirectory(id === ROOT_DIRECTORY ? undefined : id)) as ResourceState;
    },
  }),
});

export function useResources(id: string) {
  const { contents: resources, state } = useRecoilValueLoadable(resourceState(id));

  return [state === "hasValue" ? resources : [], state === "loading"] as const;
}

export const resourceSelectedState = atom({
  key: "resource/selected",
  default: {} as {
    item?: TResourceItem;
    editing: boolean;
  },
});

export const selectedSelector = selector({
  key: "selected/resource",
  get: ({ get }) => get(resourceSelectedState).item,
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    set(resourceSelectedState, { item: newValue, editing: false });
  },
});

export function useResourceSelected() {
  return useRecoilState(selectedSelector);
}

export function useIsSelected(resource: TResourceItem) {
  const [selected, set] = useRecoilState(selectedSelector);
  const isSelected = useMemo(() => selected?._id === resource._id, [selected, resource]);
  return [isSelected, () => set(isSelected ? undefined : resource)] as const;
}

export function useIsEditing(resource: TResourceItem) {
  const [{ item, editing }, setState] = useRecoilState(resourceSelectedState);
  const isEditing = useMemo(() => item?._id === resource._id && editing, [item, editing, resource]);
  return [isEditing, () => setState({ item: resource, editing: !isEditing })] as const;
}

export function useResourceCreateHandler(callback: () => void) {
  const { wrapper } = useTaskWrapper("resource", "Creating");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async () => {
      const selected = await snapshot.getPromise(selectedSelector);
      const directory = selected?.isDirectory ? selected._id : selected?.directory;
      const resource = await ResourceApi.create({ title: "New resource", directory });
      set(resourceState(directory ?? ROOT_DIRECTORY), (s) => [...s, resource]);
      set(resourceSelectedState, (prevState) => ({ ...prevState, item: resource, editing: true }));
      callback();
    })
  );
}

export function useResourceUpdateHandler(callback: () => void) {
  const { wrapper } = useTaskWrapper("resource", "Updating");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (payload: TUpdateResourcePayload) => {
      const selected = await snapshot.getPromise(selectedSelector);
      if (!selected) return;

      const resource = await ResourceApi.update(selected?._id, payload);
      set(resourceState(selected.directory ?? ROOT_DIRECTORY), (s) =>
        s.map((r) => (r._id === resource._id ? resource : r))
      );
      set(resourceSelectedState, (prevState) => ({ ...prevState, item: resource, editing: false }));
      callback();
    })
  );
}

export function useResouceMoveHandler() {
  const { wrapper } = useTaskWrapper("resource", "Updating");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (item: TResourceItem, to: TResourceItem) => {
      set(resourceState(item.directory ?? ROOT_DIRECTORY), (s) => s.filter((r) => r._id !== item._id));
      const resource = await ResourceApi.update(item._id, { directory: to._id });
      set(resourceState(to._id), (s) => [...s, resource]);
      set(resourceSelectedState, (prevState) => ({ ...prevState, item: resource, editing: false }));
    })
  );
}

export function useResourceRemoveHandler(callback: () => void) {
  const { wrapper } = useTaskWrapper("resource", "Deleting");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async () => {
      const selected = await snapshot.getPromise(selectedSelector);
      if (!selected) return;
      await ResourceApi.delete(selected._id);
      set(resourceState(selected.directory ?? ROOT_DIRECTORY), (s) => {
        return s.filter((r) => r._id !== selected._id);
      });
      set(resourceSelectedState, (prevState) => ({ ...prevState, item: undefined, editing: false }));
      callback();
    })
  );
}

export function useResourceUploadHandler(onProgress: (progressEvent: AxiosProgressEvent) => any) {
  const { wrapper } = useTaskWrapper("resource", "Uploading");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (file: File) => {
      const selected = await snapshot.getPromise(selectedSelector);
      const directory = selected?.isDirectory ? selected._id : selected?.directory;

      const resource = await ResourceApi.uploadFile(file, directory, onProgress);
      const { state } = snapshot.getLoadable(resourceState(directory ?? ROOT_DIRECTORY));
      if (state !== "loading") {
        set(resourceState(directory ?? ROOT_DIRECTORY), (s) => {
          const newState = [...s, resource];
          return newState;
        });
      }
      set(resourceSelectedState, (prevState) => ({ ...prevState, item: resource, editing: false }));
    })
  );
}

export function useResourceDownloadHandler(onProgress: (progressEvent: AxiosProgressEvent) => any) {
  const { wrapper } = useTaskWrapper("resource", "Uploading");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async () => {
      const selected = await snapshot.getPromise(selectedSelector);
      if (!selected || selected?.isDirectory) return;

      const resource = await ResourceApi.downloadFile(selected._id, onProgress);
      console.log(resource);
      const url = window.URL.createObjectURL(new Blob([resource]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selected.title);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  );
}
