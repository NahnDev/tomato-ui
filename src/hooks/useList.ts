import { useCallback, useState } from "react";

export default function useList<T>(params?: { intial?: T[]; compare?: (a: T, b: T) => boolean }) {
  const [list, setList] = useState<T[]>(params?.intial ?? []);
  const add = useCallback(
    (item: T) => {
      setList([...list, item]);
    },
    [list]
  );
  const remove = useCallback(
    (item: T) => {
      list.filter((el) => (params?.compare ? !params.compare(item, el) : !(item === el)));
    },
    [list, params]
  );

  return [list, add, remove] as [T[], typeof add, typeof remove];
}
