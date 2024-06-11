import React from "react";

import { Layer, Rect } from "react-konva";
import { TSize } from "@/types";
import { TProject } from "./type";
import { useBoardSize } from "./store/board";
import { useProjectSize } from "./store/project";

const BACKDROP_COLOR = "#282c34";

export type TBackdropLayerProps = Readonly<{}>;

export default function BackdropLayer(props: TBackdropLayerProps) {
  const size = useBoardSize();
  const { width, height } = useProjectSize();

  const x = (size.width - width) / 2;
  const y = (size.height - height) / 2;

  return (
    <Layer listening={false} opacity={1}>
      <Rect x={0} y={0} width={x} height={size.height} fill={BACKDROP_COLOR}></Rect>
      <Rect x={x + width} y={0} width={size.width - (x + width)} height={size.height} fill={BACKDROP_COLOR}></Rect>
      <Rect x={0} y={0} width={size.width} height={y} fill={BACKDROP_COLOR}></Rect>
      <Rect x={0} y={y + height} width={size.width} height={size.height - (y + height)} fill={BACKDROP_COLOR}></Rect>
    </Layer>
  );
}
