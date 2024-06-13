import React, { MouseEventHandler, useEffect, useRef } from "react";
import { Group, Layer, Line } from "react-konva";
import { TMode, TShape, TShapeType } from "./type";
import { useBoardSize } from "./store/board";
import { useProjectSize } from "./store/project";
import { KonvaEventObject } from "konva/lib/Node";
import { ShapeConfig } from "konva/lib/Shape";
import { Html } from "react-konva-utils";
import { set } from "lodash";
import Konva from "konva";
import { useHotkeys } from "react-hotkeys-hook";
import { v4 as uuidV4 } from "uuid";
import { useMode } from "./store/mode";

export default function EraserLayer(props: { onSubmit: (lines: { points: any[] }[]) => void }) {
  const [mode, setMode] = useMode();
  const trackRef = useRef<HTMLDivElement>(null);
  const [drawingLine, setDrawingLine] = React.useState<{ points: any[] }>();
  const [lines, setLines] = React.useState<{ points: any[] }[]>([]);
  const isDrawing = React.useRef(false);

  // hander for onMouseDown on div
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    isDrawing.current = true;
    let rect = trackRef.current!.getBoundingClientRect();
    setDrawingLine({ points: [e.clientX - rect.left, e.clientY - rect.top] });
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDrawing.current) {
      return;
    }
    let rect = trackRef.current!.getBoundingClientRect();
    drawingLine?.points.concat([e.clientX - rect.left, e.clientY - rect.top]);
    if (!drawingLine) return;
    setDrawingLine({
      points: [...(drawingLine.points ?? []), e.clientX - rect.left, e.clientY - rect.top],
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) {
      return;
    }
    setLines([...lines, drawingLine!]);
    setDrawingLine(undefined);
    isDrawing.current = false;
  };

  const groupRef = useRef<Konva.Group>(null);
  useEffect(() => {
    groupRef.current?.cache();
  }, [lines, drawingLine]);

  useHotkeys("alt+enter", () => {
    props.onSubmit(lines);
    setMode(TMode.View);
  });
  return (
    <Layer listening={false} opacity={0.8}>
      <Group ref={groupRef}>
        {lines.map((line, i) => (
          <Line key={i} points={line.points} stroke="#df4b26" strokeWidth={20} tension={1} lineCap="round" />
        ))}
        {drawingLine && (
          <Line
            key="drawing"
            points={drawingLine.points}
            stroke="#df4b26"
            strokeWidth={20}
            tension={1}
            lineCap="round"
          />
        )}
      </Group>

      <Html divProps={{ className: "w-full h-full" }}>
        <div
          ref={trackRef}
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></div>
      </Html>
    </Layer>
  );
}
