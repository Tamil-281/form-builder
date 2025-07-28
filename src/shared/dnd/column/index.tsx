import { useFormBuilder } from '@context';
import type { ColumnProps } from './type';
import { useDrop } from 'react-dnd';
import type { DragItemType, FormField, FormRow } from '@dnd';
import { getDefaultLabel, getDefaultPlaceholder } from '@utils';
import { Button } from '@sb-components';
import { Plus, Settings, Trash2 } from 'lucide-react';
import { Field } from '@dnd';
import NestedRow from '../nested-row';

const Column = ({ column, rowId }: ColumnProps) => {
  const { dispatch } = useFormBuilder();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'FORM_ELEMENT',
    drop: (item: DragItemType) => {
      if (item.type === 'field' && item.fieldType) {
        const newField: FormField = {
          id: `field-${Date.now()}`,
          type: item.fieldType,
          label: getDefaultLabel(item.fieldType),
          placeholder: getDefaultPlaceholder(item.fieldType),
          required: false,
          options:
            item.fieldType === 'select' || item.fieldType === 'radio'
              ? ['Option 1', 'Option 2']
              : undefined,
        };
        dispatch({ type: 'ADD_FIELD', rowId, columnId: column.id, field: newField });
        return { handled: true }; // Prevent bubbling to parent drop zones
      } else if (item.type === 'row') {
        // Create nested row
        const newNestedRow: FormRow = {
          id: `nested-row-${Date.now()}`,
          columns: [],
        };
        dispatch({ type: 'ADD_NESTED_ROW', rowId, columnId: column.id, nestedRow: newNestedRow });
        return { handled: true }; // Prevent bubbling to parent drop zones
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && 
        ((monitor.getItem() as DragItemType)?.type === 'field' || 
         (monitor.getItem() as DragItemType)?.type === 'row'),
    }),
  }));

  const handleDeleteColumn = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'REMOVE_COLUMN', rowId, columnId: column.id });
  };

  const handleSelectColumn = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_ITEM', itemType: 'column', id: column.id });
  };

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`
        relative group border-2 border-dashed border-builder-field-border rounded-lg p-4
        hover:border-primary hover:bg-builder-field-hover transition-all duration-200 min-h-[100px]
        ${isOver && canDrop ? 'border-primary bg-builder-drop-zone-active' : ''}
      `}
      onClick={handleSelectColumn}
    >
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Column ({column.col})
      </div>

      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeleteColumn}
          className="h-6 w-6 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {column.fields.length === 0 && (!column.nestedRows || column.nestedRows.length === 0) ? (
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
            <Field key={field.id} field={field} rowId={rowId} columnId={column.id} />
          ))}
          
          {/* Render nested rows */}
          {column.nestedRows && column.nestedRows.map(nestedRow => (
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
