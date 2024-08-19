import React, { useEffect, useMemo } from "react";
import { UI } from "@/constants/control";
import { ControlProps } from "./types";
import clsx from "clsx";
import { useAllowEditing, useDeleteControl } from "./hooks";
import { useHotkeys } from "react-hotkeys-hook";
import { useControlSelected } from "./state/control";

export default function ControlWrapper(props: ControlProps) {
  const Components = UI[props.control.type];
  const isEdit = useAllowEditing();
  const [selected, setSelected] = useControlSelected();
  const isSelected = useMemo(() => props.control.id === selected?.id, [props, selected]);
  const handleDelete = useDeleteControl();

  useHotkeys("delete", () => (isSelected ? handleDelete(props.control.id) : undefined));
  useHotkeys("backspace", () => (isSelected ? handleDelete(props.control.id) : undefined));

  return (
    <div
      className={clsx([
        "rounded-lg",
        "relative w-full h-full p-1",
        "flex flex-row items-center",
        isSelected && "bg-blue-500 bg-opacity-5 ",
      ])}
      onMouseDown={() => isEdit && setSelected(props.control)}
    >
      <div className={clsx(["w-full h-full", isEdit && "pointer-events-none select-none"])}>
        <Components {...props} />
      </div>
    </div>
  );
}
