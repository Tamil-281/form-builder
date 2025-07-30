import type { FormField } from '../type';

export interface FieldProps {
  field: FormField;
  rowId: string;
  columnId: string;
  parentRowId?: string;
  parentColumnId?: string;
  nestedRowId?: string;
}
