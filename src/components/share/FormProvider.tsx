import React, { PropsWithChildren, createContext, useContext, useMemo } from "react";

type FormContextValue = {
  disabled: boolean;
};

const initialFormContextValue = {
  disabled: false,
};

export const FormContext = createContext<FormContextValue>(initialFormContextValue);
export function useForm() {
  return useContext(FormContext);
}

export default function FormProvider(props: PropsWithChildren<Partial<FormContextValue>>) {
  const { children, ...customValue } = props;
  const value = useMemo(() => ({ ...initialFormContextValue, ...customValue }), [customValue]);
  return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>;
}
