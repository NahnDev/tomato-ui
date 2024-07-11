import React, { PropsWithChildren, useContext, useMemo } from "react";
import { TResourceItem } from "./type";

type TExplorerContext = {
  filter?: RegExp;
  search?: string;
};

export const ExplorerContext = React.createContext<TExplorerContext>({});

export default function ResourceProvider(props: PropsWithChildren<TExplorerContext>) {
  return (
    <ExplorerContext.Provider value={{ filter: props.filter, search: props.search }}>
      {props.children}
    </ExplorerContext.Provider>
  );
}

export function useResourcesFiflter(resources: TResourceItem[]) {
  const { filter } = useContext(ExplorerContext);
  return useMemo(
    () =>
      resources.filter((item) => {
        if (!filter) return true;
        if (item.isDirectory) return true;
        return filter.test(item.file!.mimetype);
      }),
    [resources, filter]
  );
}
