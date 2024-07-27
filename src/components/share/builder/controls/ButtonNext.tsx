import { Button } from "@material-tailwind/react";
import React from "react";
import { ControlProps } from "../types";
import { BackgroundDefaultSetting } from "../settings/BackgroundSetting";
import { BorderDefaultSetting } from "../settings/BorderSetting";
import { TextStyleDefaultSetting } from "../settings/TextStyleSetting";

export default function ButtonNext(props: ControlProps) {
  const textStyle = { ...TextStyleDefaultSetting, ...props.control.config.textStyles };
  const backgroundStyle = { ...BackgroundDefaultSetting, ...props.control.config.background };
  const borderStyle = { ...BorderDefaultSetting, ...props.control.config.border, borderStyle: "solid" };
  return (
    <Button className="w-full h-full px-2" style={{ ...backgroundStyle, ...borderStyle, ...textStyle }}>
      {props.control.config.label}
    </Button>
  );
}
