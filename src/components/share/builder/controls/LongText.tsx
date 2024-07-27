import React, { useMemo } from "react";
import { ControlProps } from "../types";
import { Input, Textarea } from "@material-tailwind/react";
import clsx from "clsx";

export default function LongText(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return (
    <Textarea
      rows={1}
      label={label}
      className={clsx(["!min-h-0 scroll-none", !label && "!border-t-blue-gray-200 !focus:border-t-gray-900"])}
      labelProps={{ className: !label && "hidden" }}
      containerProps={{ className: "h-full w-full !min-w-0" }}
    ></Textarea>
  );
}
