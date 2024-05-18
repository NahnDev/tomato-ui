"use client";

import Progress from "@/classes/Progress";
import useList from "@/hooks/useList";
import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";

export interface ProgressContextInterface {
  progresses: Progress[];
  create: () => any;
  reject: (item: Progress) => any;
  resolve: (item: Progress) => any;
}

export type ProgressProviderProps = PropsWithChildren<{}>;

export const ProgressContext = React.createContext<ProgressContextInterface>({} as any);

export default function ProgressProvider(props: ProgressProviderProps) {
  const [histories, addHistory, removeHistory] = useList<Progress>({ compare: Progress.compare });
  const [progresses, addProgresses, removeProgresses] = useList<Progress>({ compare: Progress.compare });

  const create = useCallback(() => addProgresses(new Progress()), [addProgresses]);
  const reject = useCallback((progress: Progress) => removeProgresses(progress), [removeProgresses]);
  const resolve = useCallback((progress: Progress) => removeProgresses(progress), [removeProgresses]);

  const value = useMemo<ProgressContextInterface>(
    () => ({ progresses, create, reject, resolve }),
    [progresses, create, reject, resolve]
  );
  return <ProgressContext.Provider value={value}>{props.children}</ProgressContext.Provider>;
}
