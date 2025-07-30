import { useFormBuilder } from '@context';
import type { ColumnProps } from './type';
import { useDrop, useDrag } from 'react-dnd';
import type { FormField, FormRow } from '@dnd';
import { getDefaultLabel, getDefaultPlaceholder } from '@utils';
import { Button } from '@sb-components';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Field } from '@dnd';
import NestedRow from '../nested-row';
import { useCallback, useMemo, useRef, useEffect } from 'react';

const Column = ({ column, rowId, parentRowId, parentColumnId, nestedRowId }: ColumnProps) => {
  const { state, dispatch } = useFormBuilder();

  // Use ref to get current state in drop handler
  const stateRef = useRef(state);

  // Update ref when state changes
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Memoized drag item to prevent unnecessary re-renders
  const dragItem = useMemo(
    () => ({
      type: 'column' as const,
      id: column.id,
      rowId,
      parentRowId,
      parentColumnId,
      nestedRowId,
    }),
    [column.id, rowId, parentRowId, parentColumnId, nestedRowId],
  );

  // Drag functionality for reordering
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'COLUMN_REORDER',
    item: dragItem,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Drop functionality
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['FORM_ELEMENT', 'COLUMN_REORDER'],
    drop: (item: any, monitor: any) => {
      // Only handle the drop if it wasn't handled by a child component
      if (monitor.didDrop()) return;

      if (item.type === 'field' && item.fieldType) {
        const newField: FormField = {
          id: `field-${Date.now()}`,
          name: `field-${Date.now()}`,
          type: item.fieldType,
          label: getDefaultLabel(item.fieldType),
          placeholder: getDefaultPlaceholder(item.fieldType),
          required: false,
          options:
            item.fieldType === 'select' || item.fieldType === 'radio'
              ? ['Option 1', 'Option 2']
              : undefined,
        };

        if (parentRowId && parentColumnId && nestedRowId) {
          dispatch({
            type: 'ADD_FIELD_TO_NESTED_ROW',
            parentRowId,
            parentColumnId,
            nestedRowId,
            columnId: column.id,
            field: newField,
          });
        } else {
          dispatch({ type: 'ADD_FIELD', rowId, columnId: column.id, field: newField });
        }
      } else if (item.type === 'row') {
        const newNestedRow: FormRow = {
          id: `nested-row-${Date.now()}`,
          columns: [],
        };
        dispatch({ type: 'ADD_NESTED_ROW', rowId, columnId: column.id, nestedRow: newNestedRow });
      } else if (item.type === 'column' && item.id !== column.id) {
        // Handle column reordering with swapping
        if (parentRowId && parentColumnId && nestedRowId) {
          // Handle nested row column reordering
          const parentRow = stateRef.current.layout.rows.find(r => r.id === parentRowId);
          if (parentRow) {
            const parentColumn = parentRow.columns.find(c => c.id === parentColumnId);
            if (parentColumn?.nestedRows) {
              const nestedRow = parentColumn.nestedRows.find(nr => nr.id === nestedRowId);
              if (nestedRow) {
                const fromIndex = nestedRow.columns.findIndex(c => c.id === item.id);
                const toIndex = nestedRow.columns.findIndex(c => c.id === column.id);

                // Only dispatch if indices are valid and different
                if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
                  console.log(
                    `Swapping columns in nested row: from index ${fromIndex} to index ${toIndex}`,
                  );
                  dispatch({
                    type: 'MOVE_COLUMN_IN_NESTED_ROW',
                    parentRowId,
                    parentColumnId,
                    nestedRowId,
                    fromIndex,
                    toIndex,
                  });
                }
              }
            }
          }
        } else {
          // Handle regular row column reordering
          const currentRow = stateRef.current.layout.rows.find(r => r.id === rowId);
          if (currentRow) {
            const fromIndex = currentRow.columns.findIndex(c => c.id === item.id);
            const toIndex = currentRow.columns.findIndex(c => c.id === column.id);

            console.log(`Swapping columns: from index ${fromIndex} to index ${toIndex}`);
            console.log('Swapping===', currentRow.columns);
            // Only dispatch if indices are valid and different
            if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
              dispatch({
                type: 'MOVE_COLUMN',
                rowId,
                fromIndex,
                toIndex,
              });
            }
          }
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop:
        monitor.canDrop() &&
        ((monitor.getItem() as any)?.type === 'field' ||
          (monitor.getItem() as any)?.type === 'row' ||
          (monitor.getItem() as any)?.type === 'column'),
    }),
  }));

  // Memoized event handlers
  const handleDeleteColumn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (parentRowId && parentColumnId && nestedRowId) {
        dispatch({
          type: 'REMOVE_COLUMN_FROM_NESTED_ROW',
          parentRowId,
          parentColumnId,
          nestedRowId,
          columnId: column.id,
        });
      } else {
        dispatch({ type: 'REMOVE_COLUMN', rowId, columnId: column.id });
      }
    },
    [parentRowId, parentColumnId, nestedRowId, column.id, rowId, dispatch],
  );

  const handleSelectColumn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch({ type: 'SELECT_ITEM', itemType: 'column', id: column.id });
    },
    [column.id, dispatch],
  );

  // Memoized computed values
  const isColumnReorderDrop = useMemo(() => isOver && canDrop, [isOver, canDrop]);
  const isEmpty = useMemo(
    () => column.fields.length === 0 && (!column.nestedRows || column.nestedRows.length === 0),
    [column.fields.length, column.nestedRows],
  );

  // Memoized className
  const containerClassName = useMemo(
    () => `
    relative group border-2 border-dashed border-builder-field-border rounded-lg p-4
    hover:border-primary hover:bg-builder-field-hover transition-all duration-200 min-h-[100px]
    ${isColumnReorderDrop ? 'border-primary bg-builder-drop-zone-active shadow-lg' : ''}
    ${isDragging ? 'opacity-50 scale-105' : ''}
  `,
    [isColumnReorderDrop, isDragging],
  );

  return (
    <div
      ref={node => {
        drop(node);
        dragPreview(node);
      }}
      className={containerClassName}
      onClick={handleSelectColumn}
    >
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Column ({column.col}) - Drag to reorder
      </div>

      {/* Drop indicator */}
      {isColumnReorderDrop && (
        <div className="absolute inset-0 border-2 border-primary bg-primary/10 rounded-lg pointer-events-none" />
      )}

      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button
          ref={drag as unknown as React.Ref<HTMLButtonElement>}
          onMouseDown={e => e.stopPropagation()}
          variant="destructive"
          size="sm"
          className="h-6 w-6 p-0 bg-white hover:bg-muted"
        >
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteColumn}
          className="h-6 w-6 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center h-16 text-muted-foreground">
          <div className="text-center">
            <Plus className="h-5 w-5 mx-auto mb-2" />
            <p className="text-xs">Drop a field or row here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Render fields */}
          {column.fields.map(field => (
            <Field
              key={field.id}
              field={field}
              rowId={rowId}
              columnId={column.id}
              parentRowId={parentRowId}
              parentColumnId={parentColumnId}
              nestedRowId={nestedRowId}
            />
          ))}

          {/* Render nested rows */}
          {column.nestedRows &&
            column.nestedRows.map(nestedRow => (
              <NestedRow
                key={nestedRow.id}
                nestedRow={nestedRow}
                rowId={rowId}
                columnId={column.id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Column;
