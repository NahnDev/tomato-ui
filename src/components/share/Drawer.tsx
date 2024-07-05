import React, { PropsWithChildren, useRef, useState } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";

export type TDrawerProps = PropsWithChildren<{ open: boolean; onClose: () => void; className?: string }>;

export default function Drawer(props: TDrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // useHotkeys("esc", () => props.open && props.onClose());
  // useOnClickOutside(ref, props.onClose);

  // return (
  //   <div
  //     className={clsx([
  //       "fixed top-0 left-0 w-screen h-screen z-50",
  //       "pointer-events-auto cursor-pointer",
  //       props.open ? "hidden" : "grid",
  //       "bg-red-500",
  //     ])}
  //     onClick={props.onClose}
  //   ></div>
  // );

  return (
    <div
      ref={ref}
      className={clsx(
        "grid grid-cols-[1fr_auto] fixed",
        "top-0 left-0  w-screen h-screen duration-1000 z-40",
        props.open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div onClick={props.onClose}></div>
      <div className={clsx(["shadow-xl transition-transform transform", "bg-white", props.className])}>
        {props.open && props.children}
      </div>
    </div>
  );
}
