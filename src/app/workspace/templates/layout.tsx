"use client";
import TemplateSidebar from "@/components/template/TemplateSidebar";
import React, { PropsWithChildren, Suspense } from "react";

export default function TemplatesLayout(props: Readonly<PropsWithChildren<{}>>) {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-[auto_1fr] h-full  overflow-hidden">
        <TemplateSidebar />
        <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
      </div>
    </div>
  );
}
