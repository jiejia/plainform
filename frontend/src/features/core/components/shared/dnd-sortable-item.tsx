import React, { HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DndSortableItemProps extends HTMLAttributes<HTMLLIElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function DndSortableItem({
  children,
  id,
  className,
  ...props
}: DndSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      className={className}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    >
      {children}
    </li>
  );
}
