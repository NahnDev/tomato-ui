import { Shape } from "konva/lib/Shape";
import { useState } from "react";
import { TShape } from "./type";

export function useNodes() {
  const [nodes, setNodes] = useState<Shape[]>([]);

  const toggle = (node: Shape, shift: boolean = false) => {
    setNodes((prev) => {
      const exist = prev.some((el) => el.id === node.id);
      if (exist) return prev.filter((el) => el.id !== node.id);
      if (shift) return [...prev, node];
      return [node];
    });
  };

  return [nodes, toggle, setNodes] as [Shape[], typeof toggle, typeof setNodes];
}
