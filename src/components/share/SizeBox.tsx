import { Size } from "@/types/control";
import React, { PropsWithChildren } from "react";

import { useRef } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";

type TSize = {
  width?: number;
  height?: number;
};
export type TSizeBoxProps = Readonly<PropsWithChildren<{ className?: string; onResize: (size: Size) => void }>>;

export default function SizeBox(props: TSizeBoxProps) {
  const sizeBoxRef = useRef<HTMLDivElement>(null);
  const onResize = useDebounceCallback(
    (size: TSize) => props.onResize({ width: size.width ?? 0, height: size.height ?? 0 }),
    200
  );

  useResizeObserver({ ref: sizeBoxRef, onResize });

  return (
    <div ref={sizeBoxRef} className={props.className}>
      {props.children}
    </div>
  );
}
