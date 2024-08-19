import { Input } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";

export default function ShortText(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return (
    <Input
      variant="standard"
      className={clsx([!label && "!border-t-blue-gray-200 !focus:border-t-gray-900"])}
      label={label}
      containerProps={{ className: "h-full w-full !min-w-0" }}
    ></Input>
  );
}
