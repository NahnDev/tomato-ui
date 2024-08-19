import { Textarea as MTTextarea, TextareaProps } from "@material-tailwind/react";
import clsx from "clsx";
import React, { forwardRef, Ref } from "react";

export default forwardRef(function Textarea(props: TextareaProps, ref: Ref<typeof MTTextarea>) {
  return (
    <MTTextarea
      ref={ref as any}
      {...props}
      className={clsx([
        !props.label && "!border-t-blue-gray-200 focus:!border-t-gray-900",
        "border-2 focus:border-2 !min-h-0",
        props.className,
      ])}
      labelProps={{ ...props.labelProps, className: clsx([!props.label && "hidden", props.labelProps?.className]) }}
      containerProps={{
        ...props.containerProps,
        className: clsx(["!min-w-0 h-full", props.containerProps?.className]),
      }}
    />
  );
});
