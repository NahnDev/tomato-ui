import { Input as MTInput, InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import React, { forwardRef, Ref } from "react";

export default forwardRef(function Input(props: InputProps, ref: Ref<typeof MTInput>) {
  return (
    <MTInput
      ref={ref as any}
      className={clsx([
        !props.label && "!border-t-blue-gray-200 focus:!border-t-gray-900",
        "border-[1px] focus:border-[1px]",
        props.className,
      ])}
      labelProps={{ ...props.labelProps, className: clsx([!props.label && "hidden", props.labelProps?.className]) }}
      containerProps={{
        ...props.containerProps,
        className: clsx(["h-full !min-w-0", props.containerProps?.className]),
      }}
      {...props}
    />
  );
});
