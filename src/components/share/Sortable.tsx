import { PropsWithChildren, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";

export function SortableItem(props: PropsWithChildren<{ id: UniqueIdentifier }>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

export default function Sortable(props: {
  render: (id: UniqueIdentifier) => React.ReactNode;
  items: UniqueIdentifier[];
  setItems: (ids: UniqueIdentifier[]) => void;
}) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor)
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={props.items} strategy={verticalListSortingStrategy}>
        {props.items.map((id) => (
          <SortableItem key={id} id={id}>
            {props.render(id)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const oldIndex = props.items.indexOf(active.id);
      const newIndex = props.items.indexOf(over.id);
      props.setItems(arrayMove(props.items, oldIndex, newIndex));
    }
  }
}
