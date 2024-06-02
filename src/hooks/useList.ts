import { useCallback, useState } from "react";

export default function useList<T>(params?: { intial?: T[]; compare?: (a: T, b: T) => boolean }) {
  const [list, setList] = useState<T[]>(params?.intial ?? []);
  const add = (item: T) => {
    setList(Array.from(new Set([...list, item])));
  };
  const remove = (item: T) => {
    const predicate = (el: T) => (params?.compare ? !params.compare(item, el) : item !== el);
    setList(list.filter(predicate));
  };

  return [list, add, remove, setList] as [T[], typeof add, typeof remove, typeof setList];
}
