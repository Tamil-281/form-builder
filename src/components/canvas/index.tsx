import { Row } from '@components';
import { useFormBuilder } from '@context';
import { Plus } from 'lucide-react';
import { useDrop } from 'react-dnd';

import type { DragItemType, FormRow } from '@components';

const Canvas = () => {
  const { state, dispatch } = useFormBuilder();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FORM_ELEMENT',
    drop: (item: DragItemType, monitor) => {
      if (!monitor.didDrop()) {
        if (item.type === 'row') {
          const newRow: FormRow = {
            id: `row-${Date.now()}`,
            columns: [],
          };
          dispatch({ type: 'ADD_ROW', row: newRow });
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && (monitor.getItem() as DragItemType)?.type === 'row',
    }),
  }));

  const handleClearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  return (
    <div className="flex-1 bg-builder-canvas overflow-auto" onClick={handleClearSelection}>
      <div
        ref={drop as unknown as React.Ref<HTMLDivElement>}
        className={`
        min-h-full p-8 transition-all duration-200
        ${isOver && canDrop ? 'bg-builder-drop-zone-active' : ''}
      `}
      >
        {state.layout.rows.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-builder-drop-zone rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Start building your form</h3>
              <p className="text-muted-foreground">Drag a row from the sidebar to get started</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {state.layout.rows.map((row: FormRow) => (
              <Row key={row.id} row={row} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
