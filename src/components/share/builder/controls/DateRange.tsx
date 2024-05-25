import { Input } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function DateRange(props: ControlProps) {
  return (
    <div className="grid grid-cols-2 items-center gap-2 h-full">
      <Input
        type="date"
        label={props.control.config.label}
        containerProps={{ className: "h-full !min-h-0 !min-w-0" }}
      />
      <Input
        className="!border-t-blue-gray-200 !focus:border-t-gray-900"
        type="date"
        labelProps={{ className: "hidden" }}
        containerProps={{ className: "h-full  !min-h-0 !min-w-0" }}
      />
    </div>
  );
}
