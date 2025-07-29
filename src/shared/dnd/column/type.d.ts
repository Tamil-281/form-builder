import type { FormColumn } from '../type';

export interface ColumnProps {
  column: FormColumn;
  rowId: string;
  parentRowId?: string;
  parentColumnId?: string;
  nestedRowId?: string;
}
