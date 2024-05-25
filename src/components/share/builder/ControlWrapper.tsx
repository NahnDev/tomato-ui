import React, { useMemo } from "react";
import { UI } from "@/constants/control";
import { ControlProps } from "./types";
import clsx from "clsx";
import { useControlSelected } from "./hooks";

export default function ControlWrapper(props: ControlProps) {
  const Components = UI[props.control.type];
  const [selected, setSelected] = useControlSelected();
  const isSelected = useMemo(() => props.control.id === selected?.id, [props, selected]);

  return (
    <div
      className={clsx([
        "rounded-lg border-[1px]",
        "relative w-full h-full p-2",
        "flex flex-row items-center",
        isSelected && "bg-blue-500 bg-opacity-5 ",
        isSelected ? "border-blue-500" : "border-transparent",
      ])}
      onMouseDown={() => setSelected(props.control)}
    >
      <div className="fluid pointer-events-none select-none">
        <Components {...props} />
      </div>
    </div>
  );
}
