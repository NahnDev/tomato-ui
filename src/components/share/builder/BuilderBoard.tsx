"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import "@/styles/react-grid-layout.scss";
import Control from "@/classes/Control";
import { useDragLayer } from "react-dnd";
import ControlWrapper from "./ControlWrapper";
import { DndTypes } from "@/constants/dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import { documentControls, documentLayouts, documentSettings } from "./state/store";
import BuilderBoardWrapper from "./BuilderBoardWrapper";
import { useHotkeys } from "react-hotkeys-hook";
import { ControlBuilder, useControlSelected } from "./state/control";
import { useStepSelected } from "./state/step";
import clsx from "clsx";

const GridLayout = WidthProvider(ReactGridLayout);

function useControlDragLayer() {
  const step = useStepSelected();
  const { type, isDragging } = useDragLayer((monitor) => ({
    type: monitor.getItemType() === DndTypes.Control ? monitor.getItem()?.type : undefined,
    isDragging: monitor.getItemType() === DndTypes.Control && monitor.isDragging(),
  }));
  const item = useMemo(() => {
    if (!step || !type) return undefined;
    return new ControlBuilder().setStep(step["id"]).setType(type).build();
  }, [type, step]);
  return { item, isDragging };
}

export default function BuilderBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useStepSelected();

  const { item, isDragging } = useControlDragLayer();
  const [controls, setControls] = useRecoilState(documentControls);
  const [layouts, setLayouts] = useRecoilState(documentLayouts);
  const [setting] = useRecoilState(documentSettings);
  const [, setSelected] = useControlSelected();

  const isEditing = useMemo(() => setting.mode === "edit", [setting]);

  const handleLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (isDragging) return;
    setLayouts(layouts);
  };

  const handleDrop = (layouts: ReactGridLayout.Layout[], layout: ReactGridLayout.Layout) => {
    if (item) {
      const control = Control.setLayout(item, layout);
      setControls([...controls, Control.setLayout(item, layout)]);
      setLayouts(layouts);
      setSelected(control);
    }
  };

  if (!step) return <div className="flex items-center justify-center">Let selected a step</div>;
  return (
    <BuilderBoardWrapper>
      <div
        id="builder"
        ref={ref}
        className={clsx(["relative mx-auto bg-white bg-red w-[56em] min-h-full rounded-md overflow-hidden", "p-4"])}
      >
        <GridLayout
          layout={layouts}
          cols={setting.grid.cols}
          rowHeight={setting.grid.rowHeight}
          margin={[2, 2]}
          containerPadding={[10, 10]}
          isDroppable={isEditing && isDragging}
          isDraggable={isEditing && !isDragging}
          isResizable={isEditing && !isDragging}
          resizeHandles={["se", "ne", "sw", "nw"]}
          droppingItem={item ? Control.getLayout(item) : undefined}
          onDrop={handleDrop}
          onLayoutChange={handleLayoutChange}
          compactType={setting.compactType}
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
