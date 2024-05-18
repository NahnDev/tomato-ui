import React from "react";
import { Input as MTInput, InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import { useForm } from "./FormProvider";

export default function InlineInput(props: Readonly<InputProps & { onChangeText?: (value: string) => any }>) {
  const { onChangeText, ...otherProps } = props;
  const { disabled } = useForm();
  return (
    <MTInput
      {...(otherProps as any)}
      className={clsx([
        "!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10",
        props.className,
      ])}
      labelProps={{
        className: clsx(["hidden", props.labelProps?.className]),
      }}
      disabled={disabled || props.disabled}
      onChange={(event) => {
        otherProps.onChange?.(event);
        onChangeText?.(event.target.value);
      }}
    ></MTInput>
  );
}
