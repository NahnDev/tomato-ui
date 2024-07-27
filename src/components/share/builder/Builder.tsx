"use client";
import React from "react";
import BuilderBoard from "./BuilderBoard";
import BuilderUI from "./BuilderUI";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Popup from "../Popup";
import BuilderToolbar from "./BuilderToolbar";
import { Card, CardBody } from "@material-tailwind/react";

export default function Builder() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fluid grid grid-cols-1fr-auto gap-2 overflow-hidden">
        <div className="p-2 h-full overflow-auto">
          <BuilderBoard />
        </div>
        <BuilderToolbar />
      </div>
    </DndProvider>
  );
}
