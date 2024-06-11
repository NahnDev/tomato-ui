import { KonvaEventObject } from "konva/lib/Node";
import { ShapeConfig, Shape } from "konva/lib/Shape";
import React, { useMemo, useRef } from "react";
import { KonvaNodeComponent, Rect, Circle, Image } from "react-konva";
import { TShape, TShapeType } from "./type";
import { TCoord, TSize } from "@/types";
import MakerBoardUtil from "./utils";
import { useBoardSize } from "./store/board";
import { useOnClickOutside } from "usehooks-ts";

type ShapeComponent = KonvaNodeComponent<Shape<ShapeConfig>, ShapeConfig>;
const SHAPES = {
  [TShapeType.Image]: Image,
  [TShapeType.Rect]: Rect,
  [TShapeType.Circle]: Circle,
};

export type TNodeProps = Readonly<{
  item: TShape;
  isSelected: boolean;
  onChange: (item: TShape) => void;
  onSelected: (node: Shape, shift: boolean) => void;
}>;

export default function MakerShape(props: TNodeProps) {
  const ref = useRef<Shape>(null);
  const size = useBoardSize();

  const Component = useMemo(() => SHAPES[props.item.type], [props.item.type]) as ShapeComponent;
  const { x, y } = useMemo(() => MakerBoardUtil.getAbsoluteCoord(size, props.item), [size, props.item]);

  const handleChange = (item: Partial<TShape> & TCoord) => {
    const nextShape = { ...props.item, ...item };
    props.onChange(MakerBoardUtil.getRelativeCoord(size, nextShape));
  };

  const onClick = (evt: KonvaEventObject<MouseEvent>) => {
    props.onSelected(ref.current!, evt.evt.shiftKey);
  };
  const onTransformEnd = () => handleChange(ref.current!.getAttrs() as TShape);
  const onDragEnd = (e: KonvaEventObject<DragEvent>) => handleChange(e.target.getAttrs() as TShape);
  const onWheel = (e: KonvaEventObject<WheelEvent>) => {
    if (!props.isSelected) return;
    if (e.evt.altKey) {
      e.evt.stopPropagation();
      e.evt.preventDefault();
      const scale = 1 - e.evt.deltaY / 5000;
      handleChange({
        x: x - (props.item.width * scale - props.item.width) / 4,
        y: y - (props.item.height * scale - props.item.height) / 4,
        width: props.item.width * scale,
        height: props.item.height * scale,
      });
    }
  };

  return (
    <Component
      {...props.item}
      x={x}
      y={y}
      ref={ref}
      draggable={props.isSelected}
      onClick={onClick}
      onTransform={onTransformEnd}
      onDragEnd={onDragEnd}
      onWheel={onWheel}
    />
  );
}
