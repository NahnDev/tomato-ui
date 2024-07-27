// Date.tsx
import { Input } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";

export default function Date(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return (
    <Input
      type="date"
      label={label ?? ""}
      className={clsx([!label && "!border-t-blue-gray-200 !focus:border-t-gray-900"])}
      labelProps={{ className: !label && "hidden" }}
      containerProps={{ className: "h-full !min-w-0" }}
      min={props.control.config.date?.minDate}
      max={props.control.config.date?.maxDate}
    ></Input>
  );
}
