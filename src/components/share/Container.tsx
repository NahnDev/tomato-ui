import clsx from "clsx";
import { ClassArray } from "clsx";
import React, { PropsWithChildren } from "react";

export default function Container(props: Readonly<PropsWithChildren<{ className?: ClassArray }>>) {
  return <div className={clsx(["w-full h-full overflow-hidden", props.className])}>{props.children}</div>;
}
