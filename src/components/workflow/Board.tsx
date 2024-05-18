"use client";

import { Card } from "@material-tailwind/react";
import React, { useRef } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";

const GridLayout = WidthProvider(ReactGridLayout);

export default function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const layouts = [];
  return (
    <div className="p-2 h-full">
      <Card className="h-full">
        <div ref={ref} className="relative bg-white  mx-auto">
          <GridLayout
            className="layout"
            layout={layouts}
            cols={4}
            rowHeight={50}
            //   isDraggable={mode === MODE.EDIT}
            //   isDroppable={mode === MODE.EDIT}
            //   isResizable={mode === MODE.EDIT}
            //   compactType={compactType as any}
            //   droppingItem={item ? item.getLayout() : undefined}
            //   onDrop={handleDrop}
            //   onLayoutChange={handleLayoutChange}
          ></GridLayout>
        </div>
      </Card>
    </div>
  );
}
