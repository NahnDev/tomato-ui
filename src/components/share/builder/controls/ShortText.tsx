import { Input } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function ShortText(props: ControlProps) {
  return <Input label={props.control.config.label} containerProps={{ className: "h-full" }}></Input>;
}
