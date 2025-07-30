import { Grip } from 'lucide-react';
import { useDrag } from 'react-dnd';

import type { DragItemSubProps } from './type';

const DragItem = ({ type, fieldType, icon, label, description }: DragItemSubProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FORM_ELEMENT',
    item: { type, fieldType },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={node => {
        drag(node);
      }}
      className={`p-4 bg-builder-field border border-builder-field-border rounded-lg cursor-move
        hover:bg-builder-field-hover hover:border-border hover:shadow-md transition-all duration-200 group
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-builder-drop-zone rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
        <Grip className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default DragItem;
