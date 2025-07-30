import type { FormLayout, FormRow, FormColumn, FormField } from '@dnd';

export interface FormBuilderState {
  layout: FormLayout;
  selectedItem: { type: 'row' | 'column' | 'field'; id: string } | null;
}

export type FormBuilderAction =
  | { type: 'ADD_ROW'; row: FormRow }
  | { type: 'ADD_COLUMN'; rowId: string; column: FormColumn }
  | {
      type: 'ADD_COLUMN_TO_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      column: FormColumn;
    }
  | { type: 'ADD_FIELD'; rowId: string; columnId: string; field: FormField }
  | {
      type: 'ADD_FIELD_TO_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      columnId: string;
      field: FormField;
    }
  | { type: 'ADD_NESTED_ROW'; rowId: string; columnId: string; nestedRow: FormRow } // Add nested row action
  | { type: 'REMOVE_ROW'; rowId: string }
  | { type: 'REMOVE_COLUMN'; rowId: string; columnId: string }
  | {
      type: 'REMOVE_COLUMN_FROM_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      columnId: string;
    }
  | { type: 'REMOVE_FIELD'; rowId: string; columnId: string; fieldId: string }
  | {
      type: 'REMOVE_FIELD_FROM_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      columnId: string;
      fieldId: string;
    }
  | { type: 'REMOVE_NESTED_ROW'; rowId: string; columnId: string; nestedRowId: string } // Add nested row removal
  | {
      type: 'UPDATE_FIELD';
      rowId: string;
      columnId: string;
      fieldId: string;
      updates: Partial<FormField>;
    }
  | {
      type: 'UPDATE_FIELD_IN_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      columnId: string;
      fieldId: string;
      updates: Partial<FormField>;
    }
  | { type: 'UPDATE_COLUMN'; rowId: string; columnId: string; updates: Partial<FormColumn> }
  | {
      type: 'UPDATE_COLUMN_IN_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      columnId: string;
      updates: Partial<FormColumn>;
    }
  | { type: 'MOVE_ROW'; fromIndex: number; toIndex: number }
  | { type: 'MOVE_COLUMN'; rowId: string; fromIndex: number; toIndex: number }
  | {
      type: 'MOVE_COLUMN_IN_NESTED_ROW';
      parentRowId: string;
      parentColumnId: string;
      nestedRowId: string;
      fromIndex: number;
      toIndex: number;
    }
  | { type: 'MOVE_FIELD'; rowId: string; columnId: string; fromIndex: number; toIndex: number }
  | {
      type: 'MOVE_FIELD_BETWEEN_COLUMNS';
      fromRowId: string;
      fromColumnId: string;
      toRowId: string;
      toColumnId: string;
      fieldId: string;
      toIndex: number;
    }
  | { type: 'SELECT_ITEM'; itemType: 'row' | 'column' | 'field'; id: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'LOAD_LAYOUT'; layout: FormLayout };
