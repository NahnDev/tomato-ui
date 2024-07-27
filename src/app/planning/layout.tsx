import AuthRequired from "@/components/share/AuthRequired";
import Container from "@/components/share/Container";
import PageLoading from "@/components/share/PageLoading";
import { Metadata } from "next";
import React, { PropsWithChildren, Suspense } from "react";
export const metadata: Metadata = {
  title: "Planning",
  description: "Planning page",
};
export default function PlanningLayout(props: PropsWithChildren<{}>) {
  return (
    <div className="fluid p-2 relative">
      <AuthRequired>{props.children}</AuthRequired>
    </div>
  );
}