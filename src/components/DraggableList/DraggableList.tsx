"use client";

import DraggableListItem, { DraggableListItemProps } from "./DraggableListItem";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

export type DraggableListProps = {
  items: React.ReactNode;
  onDragEnd: OnDragEndResponder;
};

const DraggableList = ({ items, onDragEnd }: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"list"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;

// {items.map((item, index) => (
//     <DraggableListItem index={index} key={item.id} id={item.id}>
//       {item.children}
//     </DraggableListItem>
//   ))}
