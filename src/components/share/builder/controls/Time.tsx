// Time.tsx
import { Input } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function Time(props: ControlProps) {
  return <Input type="time" label={props.control.config.label} containerProps={{ className: "h-full" }}></Input>;
}
