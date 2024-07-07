import { useDrop, useDrag, ConnectDropTarget } from "react-dnd";
import { TResourceItem } from "./seed";
import { useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function useResourceDrop(resource: TResourceItem, onDrop: (item: TResourceItem) => any) {
  return useDrop({
    accept: "resource",
    collect: (monitor) => ({ isOver: monitor.isOver(), item: monitor.getItem() }),
    options: { dropEffect: "move" },
    canDrop: (item) => (item as any)._id !== resource._id && !!resource.isDirectory,
    drop: (item) => onDrop(item as any),
  });
}

export function useResourceDrag(item: TResourceItem) {
  return useDrag({
    type: "resource",
    item: item,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    options: { dropEffect: "move" },
  });
}

export function useOverCallback(callback: () => void, isOver: boolean) {
  const debounce = useDebounceCallback(callback, 1000);
  useEffect(() => {
    if (isOver) {
      debounce();
    } else {
      debounce.cancel();
    }
    return debounce.cancel;
  }, [debounce, isOver]);
}
