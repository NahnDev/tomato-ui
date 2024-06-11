"use client";

import Konva from "konva";
import React, { useMemo, useRef, useState } from "react";
import { Layer, Transformer, Rect, Line } from "react-konva";
import { TSize } from "@/types";
import { ShapeConfig } from "konva/lib/Shape";
import { useHotkeys } from "react-hotkeys-hook";
import { TMode, TProject } from "./type";
import Grid from "./Grid";
import { useBoardSize } from "./store/board";
import { useProject, useProjectSize } from "./store/project";
import { useMode } from "./store/mode";

type TCropLayerProps = Readonly<{}>;

function useAbsolute(item: ShapeConfig) {
  return useMemo(
    () => ({
      x: item.x ?? 0,
      y: item.y ?? 0,
      width: (item.width ?? 0) * (item.scaleX ?? 1),
      height: (item.height ?? 0) * (item.scaleY ?? 1),
    }),
    [item]
  );
}

export default function CropLayer(props: TCropLayerProps) {
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRef = useRef<Konva.Rect>(null);

  const [, setMode] = useMode();
  const [project, setProject] = useProject();
  const size = useBoardSize();
  const center = useMemo(() => ({ x: size.width / 2, y: size.height / 2 }), [size]);
  const [config, setConfig] = useState<ShapeConfig>(project);
  const { width, height } = useAbsolute(config);

  useHotkeys("alt+enter", () => {
    setProject({ ...project, width, height });
    setMode(TMode.View);
  });

  React.useEffect(() => {
    if (!shapeRef.current) return;
    if (!trRef.current) return;
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [trRef, shapeRef]);

  const onTransform = () => {
    const node = shapeRef.current as Konva.Node;
    if (!node) return;
    setConfig({ ...node.getAttrs() });
  };

  const x = center.x - width / 2;
  const y = center.y - height / 2;

  return (
    <Layer>
      <Rect x={0} y={0} width={x} height={size.height} fill={"#000a"}></Rect>
      <Rect x={x + width} y={0} width={size.width - (x + width)} height={size.height} fill={"#000a"}></Rect>
      <Rect x={x} y={0} width={width} height={y} fill={"#000a"}></Rect>
      <Rect x={x} y={y + height} width={width} height={size.height - (y + height)} fill={"#000a"}></Rect>
      <Grid x={x} y={y} width={width} height={height} layerWidth={size.width} layerHeight={size.height} />
      <Rect id="crop-marker" {...config} x={x} y={y} ref={shapeRef} onTransform={onTransform} />
      <Transformer
        rotateEnabled={false}
        ref={trRef}
        flipEnabled={false}
        anchorSize={10}
        anchorStroke="#ffffff"
        borderStroke="#ffffff"
        anchorCornerRadius={10}
      />
    </Layer>
  );
}
