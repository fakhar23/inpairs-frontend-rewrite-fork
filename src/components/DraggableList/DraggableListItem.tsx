"use client";

import * as React from "react";
import { Draggable } from "@hello-pangea/dnd";

export type DraggableListItemProps = {
  id: string;
  index: number;
  children: React.ReactNode;
  className?: string;
};

const DraggableListItem = ({
  id,
  index,
  children,
  className,
}: DraggableListItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className={snapshot.isDragging ? "w-full" : "w-full"}
          className={className}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
