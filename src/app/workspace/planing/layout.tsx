import { Metadata } from "next";
import React, { PropsWithChildren } from "react";
export const metadata: Metadata = {
  title: "Planing",
  description: "Planing page",
};
export default function PlaningLayout(props: PropsWithChildren<{}>) {
  return <div className="w-full h-full p-2 relative">{props.children}</div>;
}
