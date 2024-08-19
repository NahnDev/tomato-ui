import React, { useRef, useState } from "react";
import ColorPalette from "./ColorPalette";

export default function ColorPicker(
  props: Readonly<{ value?: string; onChange: (value: string) => any; label?: string }>
) {
  return (
    <div className="relative flex flex-row items-center">
      <ColorPalette color={props.value ?? "#ffffff"} onChange={props.onChange} />
      {props.label && <span className="px-2 text-sm text-blue-gray-700">{props.label}</span>}
    </div>
  );
}
