import { Task, TaskFactory } from "@/utils/Task";
import { useState } from "react";
import { RecoilState, atom, atomFamily, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidV4 } from "uuid";

export type Namespace = string;
export const taskManager = atomFamily({
  key: "taskManager",
  default: (namespace: string) => [] as Task[],
});

export function useTasks(namespace: Namespace) {
  return useRecoilValue(taskManager(namespace));
}

export function useTaskWrapper<Args extends any[], ReturnValue>(namespace: Namespace, desc: string) {
  const setRecoilState = useSetRecoilState(taskManager(namespace));
  const wrapper = (callback: (...args: Args) => ReturnValue) => {
    return async (...params: any) => {
      const task = TaskFactory.create(desc);
      setRecoilState((old) => [...old, task]);
      await callback(...params);
      setRecoilState((old) => old.filter((t) => t.id !== task.id));
    };
  };
  return { wrapper };
}
