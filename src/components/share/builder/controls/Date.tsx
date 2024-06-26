// Date.tsx
import { Input } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function Date(props: ControlProps) {
  return (
    <Input
      type="date"
      label={props.control.config.label}
      containerProps={{ className: "h-full" }}
      min={props.control.config.date?.minDate}
      max={props.control.config.date?.maxDate}
    ></Input>
  );
}
