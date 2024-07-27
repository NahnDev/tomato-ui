import React, { PropsWithChildren, ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";

// export type SortableItemProps = PropsWithChildren<{
//   id: UniqueIdentifier;
//   draggable: boolean;
//   handler: (
//     activatorRef: ReturnType<typeof useSortable>["setActivatorNodeRef"],
//     listeners: ReturnType<typeof useSortable>["listeners"]
//   ) => ReactNode;
// }>;
// export function SortableItem(props: SortableItemProps) {
//   const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({
//     id: props.id,
//   });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return <div ref={setNodeRef} style={style} {...attributes} {...listeners} draggable={props.draggable}>

//   </div>;
// }

export type ListSortableProps = PropsWithChildren<{
  items: UniqueIdentifier[];
  setItems: (ids: UniqueIdentifier[]) => void;
}>;
export default function ListSortable(props: ListSortableProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor)
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={props.items} strategy={verticalListSortingStrategy}>
        {props.children}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over?.id && active.id !== over.id) {
      const oldIndex = props.items.indexOf(active.id);
      const newIndex = props.items.indexOf(over.id);
      const x = arrayMove(props.items, oldIndex, newIndex);
      props.setItems(x);
    }
  }
}
