import { Input } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";

export default function DateRange(props: ControlProps) {
  const label = useMemo(() => props.control.config?.label, [props]);
  return (
    <div className="grid grid-cols-2 items-center gap-2 h-full">
      <Input
        variant="standard"
        className={clsx([!label && "!border-t-blue-gray-200 focus:!border-t-gray-900"])}
        labelProps={{ className: !label && "hidden" }}
        type="date"
        label={label}
        containerProps={{ className: "h-full !min-h-0 !min-w-0" }}
      />
      <Input
        variant="standard"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        type="date"
        labelProps={{ className: "hidden" }}
        containerProps={{ className: "h-full  !min-h-0 !min-w-0" }}
      />
    </div>
  );
}
