import React, { useRef } from "react";

export default function ColorPicker(
  props: Readonly<{ value?: string; onChange: (value: string) => any; label?: string }>
) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative flex flex-row items-center">
      <div
        onClick={() => inputRef.current?.click()}
        className="m-2 h-6 w-6 ring-2 ring-offset-2 rounded-full"
        style={{ backgroundColor: props.value, "--tw-ring-color": props.value } as any}
      ></div>
      <input
        ref={inputRef}
        type="color"
        className="overflow-hidden w-0 h-0"
        onChange={(e) => props.onChange(e.target.value)}
      />
      {props.label && <span className="px-2 text-sm text-blue-gray-700">{props.label}</span>}
    </div>
  );
}
