import React from "react";
import { IconButton as MTIconButton } from "@material-tailwind/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export default function IconButton(
  props: Readonly<{ icon: IconProp; className?: string; onClick?: () => any; active?: boolean }>
) {
  return (
    <MTIconButton
      variant={props.active ? "filled" : "text"}
      className={clsx([props.className, "rounded-full w-8 h-8"])}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={props.icon} />
    </MTIconButton>
  );
}
