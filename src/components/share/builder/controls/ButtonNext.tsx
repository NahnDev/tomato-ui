import { Button } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";

export default function ButtonNext(props: ControlProps) {
  return (
    <Button className="w-full h-full" style={{ backgroundColor: props.control.config.background }}>
      {props.control.config.label}
    </Button>
  );
}
