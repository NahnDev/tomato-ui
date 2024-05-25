import { Button as MTButton } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function Button(props: ControlProps) {
  return (
    <MTButton className="w-full h-full" style={{ backgroundColor: props.control.config.background }}>
      {props.control.config.label}
    </MTButton>
  );
}
