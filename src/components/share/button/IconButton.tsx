import React, { MouseEventHandler } from "react";
import { Alert, IconButton as MTIconButton, Tooltip } from "@material-tailwind/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Popup from "../Popup";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function IconButton(
  props: Readonly<{
    icon: IconProp;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    active?: boolean;
    disabled?: boolean;
  }>
) {
  return (
    <div className="group">
      <MTIconButton
        disabled={props.disabled}
        variant={props.active ? "filled" : "text"}
        className={clsx(["rounded-full w-8 h-8", props.className])}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={props.icon} />
      </MTIconButton>
    </div>
  );
}
