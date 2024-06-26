import Konva from "konva";
import React, { useRef } from "react";
import { Layer, Transformer as RKTransformer } from "react-konva";

export type TTransformLayerProps = Readonly<{
  nodes: Konva.Shape[];
}>;

export default function TransformLayer(props: TTransformLayerProps) {
  const trRef = useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (!trRef.current) return;
    trRef.current.nodes(props.nodes);
    trRef.current.getLayer()?.batchDraw();
  }, [props.nodes]);
  return (
    <Layer>
      <RKTransformer ref={trRef} flipEnabled={false} anchorCornerRadius={9999} />
    </Layer>
  );
}
