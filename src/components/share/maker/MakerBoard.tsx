import React, { useEffect, useMemo, useState } from "react";
import ScaleBox from "../Scalebox";
import { TBoard, TMode, TProject, TShape, TStatus } from "./type";
import { Layer, Stage } from "react-konva";
import MakerShape from "./MakerShape";
import CropLayer from "./CropLayer";
import TransformLayer from "./TransformLayer";
import { useNodes } from "./hooks";
import BackdropLayer from "./BackdropLayer";
import { useBoard, useBoardScale } from "./store/board";
import { useMode } from "./store/mode";
import { useHotkeys } from "react-hotkeys-hook";
import { useProject, useProjectShapes } from "./store/project";

export const intialBoard = { base: { width: 0, height: 0 }, scale: 1, size: { width: 0, height: 0 } };
export type TMakerBoardProps = Readonly<{}>;

export default function MakerBoard(props: TMakerBoardProps) {
  const [mode, setMode] = useMode();
  const [{ size, base, scale }, setBoard] = useBoard();
  const [nodes, toggleNode, setNodes] = useNodes();
  const [project, setProject] = useProject();
  const shapes = useProjectShapes();

  useHotkeys("alt+shift+t", () => setMode(TMode.Crop));
  const handleChange = (nextShape: TShape) => {
    console.log(nextShape);
    setProject({
      ...project,
      shapes: project.shapes.map((shape) => (shape.id === nextShape.id ? nextShape : shape)),
    });
  };

  return (
    <ScaleBox className="size-full overflow-hidden bg-white" onResize={setBoard}>
      <Stage width={base.width} height={base.height} scale={{ x: scale, y: scale }}>
        <Layer>
          {shapes.map((shape, index) => (
            <MakerShape
              key={shape.id}
              item={shape}
              onChange={handleChange}
              isSelected={nodes.some((node) => node.id() === shape.id)}
              onSelected={toggleNode}
            />
          ))}
        </Layer>

        {mode === TMode.View && <BackdropLayer />}
        {mode === TMode.View && <TransformLayer nodes={nodes} />}
        {mode === TMode.Crop && <CropLayer />}
      </Stage>
    </ScaleBox>
  );
}
