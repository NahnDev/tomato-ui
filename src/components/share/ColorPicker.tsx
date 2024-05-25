import React, { useRef } from "react";

export default function ColorPicker(
  props: Readonly<{ value?: string; onChange: (value: string) => any; label: string }>
) {
  console.log(props.value);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative flex flex-row items-center">
      <div
        onClick={() => inputRef.current?.click()}
        className="m-2 h-4 w-8 ring-2 ring-offset-2 rounded-sm"
        style={{ backgroundColor: props.value, "--tw-ring-color": props.value } as any}
      ></div>
      <input
        ref={inputRef}
        type="color"
        className="overflow-hidden w-0 h-0"
        onChange={(e) => props.onChange(e.target.value)}
      />
      <span className="px-2 text-sm text-blue-gray-700">{props.label}</span>
    </div>
  );
}
