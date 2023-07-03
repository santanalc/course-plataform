import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";

interface Props<T> {
  items: T[];
  onDragEnd: (items: T[]) => void;
  children: JSX.Element[];
}

/**
 * A SortableList component that just needs an initial array
 * and an array of elements.
 *
 * With that, on every drag executed, it returns a
 * @param props
 * @returns
 */
export default function SortableList<T>(props: Props<T>) {
  const { children, items, onDragEnd } = props;

  // Create an array of items that can be dragged around and map to the original ones,
  // so that later we can remap them, for example if the list on drag end is 1, 0, 2
  // we now that someone dragged the first item down
  const [orderedArrayOfItems, setOrderedArrayOfItems] = useState(
    new Array(children.length).fill(0).map((_, i) => `${i}`)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrderedArrayOfItems((orderedItems) => {
        const oldIndex = orderedItems.indexOf(active.id);
        const newIndex = orderedItems.indexOf(over.id);

        let newArray = arrayMove(orderedItems, oldIndex, newIndex);

        // This new array has the new order of items, just map and return it
        onDragEnd(newArray.map((itemIndex) => items[parseInt(itemIndex)]));

        return newArray;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[
        restrictToVerticalAxis,
        restrictToFirstScrollableAncestor,
        restrictToWindowEdges,
      ]}
    >
      <SortableContext
        items={orderedArrayOfItems}
        strategy={verticalListSortingStrategy}
      >
        {orderedArrayOfItems.map((id) => props.children[parseInt(id, 10)])}
      </SortableContext>
    </DndContext>
  );
}
