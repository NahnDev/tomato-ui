import Container from "@/components/share/Container";
import { Metadata } from "next";
import React, { PropsWithChildren } from "react";
export const metadata: Metadata = {
  title: "Planing",
  description: "Planing page",
};
export default function PlaningLayout(props: PropsWithChildren<{}>) {
  return <Container className="w-full h-full p-2 relative">{props.children}</Container>;
}
