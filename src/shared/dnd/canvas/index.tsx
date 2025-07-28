import { useFormBuilder } from '@context';
import { useDrop } from 'react-dnd';
import type { DragItem, FormRow } from '@shared/dnd/type';
import { Row } from '@dnd';
import { Plus } from 'lucide-react';

const Canvas = () => {
  const { state, dispatch } = useFormBuilder();

  console.log('state', state);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FORM_ELEMENT',
    drop: (item: DragItem, monitor) => {
      console.log('Canvas drop', item);
      // Only handle the drop if it wasn't handled by a child component
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
      // Only show drop zone when hovering directly over canvas, not child elements
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && (monitor.getItem() as DragItem)?.type === 'row',
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
            {state.layout.rows.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
