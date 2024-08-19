import { Button } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { ControlProps } from "../types";
import { BackgroundDefaultSetting } from "../settings/BackgroundSetting";
import { BorderDefaultSetting } from "../settings/BorderSetting";
import { TextStyleDefaultSetting } from "../settings/TextStyleSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APP_ICONS } from "@/constants/icon";

export default function ButtonNext(props: ControlProps) {
  const textStyle = { ...TextStyleDefaultSetting, ...props.control.config.textStyles };
  const backgroundStyle = { ...BackgroundDefaultSetting, ...props.control.config.background };
  const borderStyle = { ...BorderDefaultSetting, ...props.control.config.border, borderStyle: "solid" };
  const { left, right, leftColor, rightColor } = props.control.config.icons || {};
  return (
    <Button
      className="w-full h-full p-0 gap-2 flex flex-row items-center justify-center"
      style={{ ...backgroundStyle, ...borderStyle, ...textStyle }}
    >
      {left && <FontAwesomeIcon icon={APP_ICONS[left]} style={{ color: leftColor }} />}
      {props.control.config.label}
      {right && <FontAwesomeIcon icon={APP_ICONS[right]} style={{ color: rightColor }} />}
    </Button>
  );
}
