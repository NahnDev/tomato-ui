import { TSize } from "@/types";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useRef } from "react";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import { TBoard } from "./maker/type";

export type TSizeBoxProps = Readonly<PropsWithChildren<{ className?: string; onResize: (board: TBoard) => void }>>;

export default function ScaleBox(props: TSizeBoxProps) {
  const sizeBoxRef = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState<TSize>({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.altKey && setScale((prev) => Math.min(Math.max(0.1, prev - e.deltaY / 1000), 2));
  };
  const onResize = useDebounceCallback(
    (size: Partial<TSize>) => setBase({ width: size.width ?? 0, height: size.height ?? 0 }),
    100
  );

  useResizeObserver({ ref: sizeBoxRef, onResize });
  useEffect(() => {
    const size = { width: base.width / scale, height: base.height / scale };
    props.onResize && props.onResize({ base, scale, size });
  }, [base, scale]);

  return (
    <div ref={sizeBoxRef} className={props.className} onWheel={onWheel}>
      {props.children}
    </div>
  );
}
