import { AllColors } from "@/constants/color";
import useMutationObserver from "@/hooks/useMutationObserver";
import { Menu, MenuHandler, MenuList, Tooltip } from "@material-tailwind/react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { ColorResult, TwitterPicker } from "react-color";
import { useOnClickOutside, useResizeObserver } from "usehooks-ts";

export type TColorPaletteProps = {
  color: string;
  onChange: (color: string) => any;
};

export default function ColorPalette(props: TColorPaletteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const colors = useMemo(() => Object.values(AllColors), []);

  return (
    <div ref={ref}>
      <Menu open={open} handler={setOpen}>
        <MenuHandler>
          <div
            className="m-2 h-6 w-6 ring-2 ring-offset-2 ring-gray-500 rounded-full"
            style={{ backgroundColor: props.color } as any}
          />
        </MenuHandler>
        <MenuList className="bg-transparent outline-none border-none shadow-none">
          <div className="grid grid-cols-6 gap-1 bg-white shadow-md shadow-gray-500 rounded-md p-4">
            {colors.map((color) => (
              <ColorItem key={color} color={color} onClick={() => props.onChange(color)} />
            ))}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
}

function ColorItem(props: { color: string; onClick: () => any }) {
  return (
    <div
      className="cursor-pointer size-8 rounded-lg hover:shadow-sm"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
      onTouchEnd={props.onClick}
    ></div>
  );
}
