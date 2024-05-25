"use client";

import React, { useMemo, useRef, useState } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "@/styles/react-grid-layout.scss";
import Control from "@/classes/Control";
import { useDragLayer } from "react-dnd";
import ControlWrapper from "./ControlWrapper";
import { DndTypes } from "@/constants/dnd";
import { useRecoilState } from "recoil";
import { builderControlsState, builderLayoutsState } from "./store";
import BuilderBoardWrapper from "./BuilderBoardWrapper";
import { useControlSelected } from "./hooks";

const GridLayout = WidthProvider(ReactGridLayout);

function useControlDragLayer() {
  const { type, isDragging } = useDragLayer((monitor) => ({
    type: monitor.getItemType() === DndTypes.Control ? monitor.getItem()?.type : undefined,
    isDragging: monitor.getItemType() === DndTypes.Control && monitor.isDragging(),
  }));
  const item = useMemo(() => (type ? Control.create(type) : undefined), [type]);
  return { item, isDragging };
}

export default function BuilderBoard() {
  const ref = useRef<HTMLDivElement>(null);

  const { item, isDragging } = useControlDragLayer();
  const [controls, setControls] = useRecoilState(builderControlsState);
  const [layouts, setLayouts] = useRecoilState(builderLayoutsState);
  const [, setSelected] = useControlSelected();

  const handleLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (isDragging) return;
    setLayouts(layouts);
  };

  const handleDrop = (layouts: ReactGridLayout.Layout[], layout: ReactGridLayout.Layout) => {
    if (item) {
      const control = Control.setLayout(item, layout);
      setLayouts(layouts);
      setControls([...controls, Control.setLayout(item, layout)]);
      setSelected(control);
    }
  };
  return (
    <BuilderBoardWrapper>
      <div ref={ref} className="relative bg-white bg-red w-[60em]  min-h-full rounded-md">
        <GridLayout
          layout={layouts}
          cols={4}
          rowHeight={60}
          margin={[2, 2]}
          containerPadding={[10, 10]}
          isDraggable
          isDroppable={isDragging}
          isResizable
          resizeHandles={["se", "ne", "sw", "nw"]}
          droppingItem={item ? Control.getLayout(item) : undefined}
          onDrop={handleDrop}
          onLayoutChange={handleLayoutChange}
        >
          {controls.map((control) => (
            <div key={control.id}>
              <ControlWrapper control={control} />
            </div>
          ))}
        </GridLayout>
      </div>
    </BuilderBoardWrapper>
  );
}
