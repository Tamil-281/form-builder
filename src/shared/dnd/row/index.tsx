import { useDrop } from 'react-dnd';
import type { RowProps } from './type';
import { useFormBuilder } from '@context';
import type { DragItem, FormColumn } from '@shared/dnd/type';
import { Button } from '@sb-components';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Column } from '@dnd';
import { getColSpanClass } from '@utils';

const Row = ({ row }: RowProps) => {
  const { dispatch } = useFormBuilder();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'FORM_ELEMENT',
    drop: (item: DragItem) => {
      if (item.type === 'column') {
        const newColumn: FormColumn = {
          id: `col-${Date.now()}`,
          col: 6,
          fields: [],
        };
        dispatch({ type: 'ADD_COLUMN', rowId: row.id, column: newColumn });
        return { handled: true }; // Prevent bubbling to parent drop zones
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && (monitor.getItem() as DragItem).type === 'column',
    }),
  });

  const handleDeleteRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'REMOVE_ROW', rowId: row.id });
  };

  const handleSelectRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_ITEM', itemType: 'row', id: row.id });
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`relative group border-2 border-dashed border-builder-field-border rounded-lg p-4
      hover:border-primary hover:bg-builder-field-hover transition-all duration-200
      ${isOver && canDrop ? 'border-primary bg-builder-drop-zone-active' : ''}
      `}
      onClick={handleSelectRow}
    >
      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant={'destructive'}
          size={'sm'}
          onClick={handleDeleteRow}
          className="h-6 w-6 p-0"
        >
          <Trash2Icon className="h-3 w-3" />
        </Button>
      </div>

      {row.columns.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-muted-foreground">
          <div className="text-center">
            <PlusIcon className="h-6 w-6 mx-auto mb-2" />
            <p className="text-sm">Drag and drop a column here</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {row.columns.map(column => {
            return (
              <div key={column.id} className={getColSpanClass(column.col)}>
                <Column column={column} rowId={row.id} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Row;
