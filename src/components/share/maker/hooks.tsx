import { Shape } from "konva/lib/Shape";
import { useState } from "react";

export function useNodes() {
  const [nodes, setNodes] = useState<Shape[]>([]);

  const toggle = (node: Shape, shift: boolean = false) => {
    const exist = nodes.some((el) => el.attrs.id === node.attrs.id);
    if (exist) return setNodes(nodes.filter((el) => el.attrs.id !== node.attrs.id));
    if (shift) return setNodes([...nodes, node]);
    return setNodes([node]);
  };

  return [nodes, toggle, setNodes] as [Shape[], typeof toggle, typeof setNodes];
}
