import React from "react";
import { Alert, IconButton as MTIconButton, Tooltip } from "@material-tailwind/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Popup from "../Popup";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function IconButton(
  props: Readonly<{ icon: IconProp; desc?: string; className?: string; onClick?: () => any; active?: boolean }>
) {
  return (
    <div className="group">
      <MTIconButton
        variant={props.active ? "filled" : "text"}
        className={clsx([props.className, "rounded-full w-8 h-8"])}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={props.icon} />
      </MTIconButton>
      {props.desc && (
        <div
          className={clsx([
            "fixed bottom-1 -right-[100%] group-hover:right-1",
            "p-2 px-4 duration-1000 z-50",
            " w-min bg-slate-900 text-white rounded-lg",
            "flex flex-row gap-2 items-center",
          ])}
        >
          <span className="text-nowrap">{props.desc}</span>
          <FontAwesomeIcon icon={faInfoCircle} />
        </div>
      )}
    </div>
  );
}
