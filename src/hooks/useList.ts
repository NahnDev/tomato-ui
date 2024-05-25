import { useCallback, useState } from "react";

export default function useList<T>(params?: { intial?: T[]; compare?: (a: T, b: T) => boolean }) {
  const [list, setList] = useState<T[]>(params?.intial ?? []);
  const add = useCallback(
    (item: T) => {
      setList(Array.from(new Set([...list, item])));
    },
    [list]
  );
  const remove = useCallback(
    (item: T) => {
      const predicate = (el: T) => (params?.compare ? !params.compare(item, el) : item !== el);
      setList(list.filter(predicate));
    },
    [list, params]
  );

  return [list, add, remove, setList] as [T[], typeof add, typeof remove, typeof setList];
}
