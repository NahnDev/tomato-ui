import React, { useEffect, useMemo, useState } from "react";
import ScaleBox from "../Scalebox";
import { TBoard, TMode, TProject, TShape, TStatus } from "./type";
import { Layer, Stage } from "react-konva";
import MakerShape from "./MakerShape";
import CropLayer from "./CropLayer";
import TransformLayer from "./TransformLayer";
import { useNodes } from "./hooks";
import BackdropLayer from "./BackdropLayer";
import { useBoard, useBoardScale, useBoardSelectedState } from "./store/board";
import { useMode } from "./store/mode";
import { useHotkeys } from "react-hotkeys-hook";
import { useProject, useProjectShapes } from "./store/project";
import Konva from "konva";
import { useMap } from "usehooks-ts";

export const intialBoard = { base: { width: 0, height: 0 }, scale: 1, size: { width: 0, height: 0 } };
export type TMakerBoardProps = Readonly<{}>;

export default function MakerBoard(props: TMakerBoardProps) {
  const stageRef = React.useRef<Konva.Stage>(null);
  const [mode, setMode] = useMode();
  const [{ size, base, scale }, setBoard] = useBoard();
  const [project, setProject] = useProject();
  const shapes = useProjectShapes();

  // Manager exist items
  const [existNodes, { set: addExistNode }] = useMap<string, Konva.Shape>([]);
  const [selected, { toggle: toggleSelected }] = useBoardSelectedState();
  const nodes = useMemo(() => selected.map((id) => existNodes.get(id)!), [existNodes, selected]);

  useHotkeys("alt+shift+t", () => setMode(TMode.Crop));
  useHotkeys("esc", () => setMode(TMode.View));
  useHotkeys("delete", () => {
    setProject({ ...project, shapes: project.shapes.filter((shape) => !selected.includes(shape.id)) });
  });

  const handleChange = (nextShape: TShape) => {
    setProject({
      ...project,
      shapes: project.shapes.map((shape) => (shape.id === nextShape.id ? nextShape : shape)),
    });
  };

  return (
    <ScaleBox className="size-full overflow-hidden bg-white" onResize={setBoard}>
      <Stage ref={stageRef} width={base.width} height={base.height} scale={{ x: scale, y: scale }}>
        <Layer>
          {shapes.map((shape, index) => (
            <MakerShape
              key={shape.id}
              item={shape}
              onChange={handleChange}
              isSelected={selected.includes(shape.id)}
              onRender={(node) => addExistNode(node.attrs.id, node)}
              onSelected={(node, shift) => toggleSelected(shape.id, shift)}
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
