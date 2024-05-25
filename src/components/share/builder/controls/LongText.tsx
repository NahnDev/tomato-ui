import React from "react";
import { ControlProps } from "../types";
import { Input, Textarea } from "@material-tailwind/react";

export default function LongText(props: ControlProps) {
  return (
    <Textarea
      rows={1}
      label={props.control.config.label}
      className="!min-h-0 scroll-none"
      containerProps={{ className: "h-full" }}
    ></Textarea>
  );
}
