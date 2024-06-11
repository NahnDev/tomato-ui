import React from "react";
import { useBoard, useBoardScale } from "./store/board";

export default function StatusBar() {
  const scale = useBoardScale();
  return (
    <div>
      <div className="bg-white text-slate-900 p-2">
        <div>
          <span>Zoom: {Math.round((scale ?? 1) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
