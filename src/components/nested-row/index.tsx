import { Column } from '@components';
import { useFormBuilder } from '@context';
import { Button } from '@sb-components';
import { getColSpanClass } from '@utils';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useDrop } from 'react-dnd';

import type { NestedRowProps } from './type';

import type { DragItemType, FormColumn } from '@components';

const NestedRow = ({ nestedRow, rowId, columnId }: NestedRowProps) => {
  const { dispatch } = useFormBuilder();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'FORM_ELEMENT',
    drop: (item: DragItemType, monitor) => {
      if (!monitor.didDrop()) {
        if (item.type === 'column') {
          const newColumn: FormColumn = {
            id: `col-${Date.now()}`,
            col: 6,
            fields: [],
          };
          dispatch({
            type: 'ADD_COLUMN_TO_NESTED_ROW',
            parentRowId: rowId,
            parentColumnId: columnId,
            nestedRowId: nestedRow.id,
            column: newColumn,
          });
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && (monitor.getItem() as DragItemType).type === 'column',
    }),
  });

  const handleDeleteNestedRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'REMOVE_NESTED_ROW', rowId, columnId, nestedRowId: nestedRow.id });
  };

  const handleSelectNestedRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_ITEM', itemType: 'row', id: nestedRow.id });
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`
        relative group border-2 border-dashed border-builder-field-border rounded-lg p-3
        hover:border-primary hover:bg-builder-field-hover transition-all duration-200
        ${isOver && canDrop ? 'border-primary bg-builder-drop-zone-active shadow-lg' : ''}
        bg-builder-nested-row
      `}
      onClick={handleSelectNestedRow}
    >
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Nested Row (Drop columns here)
      </div>

      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant={'destructive'}
          size={'sm'}
          onClick={handleDeleteNestedRow}
          className="h-6 w-6 p-0"
        >
          <Trash2Icon className="h-3 w-3" />
        </Button>
      </div>

      {nestedRow.columns.length === 0 ? (
        <div className="flex items-center justify-center h-16 text-muted-foreground">
          <div className="text-center">
            <PlusIcon className="h-4 w-4 mx-auto mb-1" />
            <p className="text-xs">Drag and drop a column here</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-2">
          {nestedRow.columns.map(column => {
            return (
              <div key={column.id} className={getColSpanClass(column.col)}>
                <Column
                  column={column}
                  rowId={nestedRow.id}
                  parentRowId={rowId}
                  parentColumnId={columnId}
                  nestedRowId={nestedRow.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NestedRow;
