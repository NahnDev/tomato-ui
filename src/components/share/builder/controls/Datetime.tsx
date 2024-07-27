import { Input } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";

export default function Datetime(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return (
    <div className="grid grid-cols-2 items-center gap-2 h-full">
      <Input
        type="date"
        label={label}
        className={clsx([!label && "!border-t-blue-gray-200 !focus:border-t-gray-900"])}
        labelProps={{ className: !label && "hidden" }}
        containerProps={{ className: "h-full !min-h-0 !min-w-0" }}
      />
      <Input
        className="!border-t-blue-gray-200 !focus:border-t-gray-900"
        type="time"
        labelProps={{ className: "hidden" }}
        containerProps={{ className: "h-full  !min-h-0 !min-w-0" }}
      />
    </div>
  );
}
