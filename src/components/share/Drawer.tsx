import React, { PropsWithChildren, useRef, useState } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";

export type TDrawerProps = PropsWithChildren<{ open: boolean; onClose: () => void; className?: string }>;

export default function Drawer(props: TDrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useHotkeys("esc", () => props.open && props.onClose());
  useOnClickOutside(ref, props.onClose);

  return (
    <div
      ref={ref}
      className={clsx(
        "fixed top-0 right-0 z-50 bg-white shadow-xl transition-transform transform duration-1000",
        props.open ? "translate-x-0" : "translate-x-full",
        props.className
      )}
    >
      {props.open && props.children}
    </div>
  );
}
