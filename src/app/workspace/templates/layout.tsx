"use client";
import TemplateSidebar from "@/components/template/TemplateSidebar";
import React, { PropsWithChildren } from "react";

export default function TemplatesLayout(props: Readonly<PropsWithChildren<{}>>) {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-[auto_1fr] h-full  overflow-hidden">
        <TemplateSidebar />
        {props.children}
      </div>
    </div>
  );
}
