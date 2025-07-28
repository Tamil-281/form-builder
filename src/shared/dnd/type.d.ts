export interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'select' | 'date' | 'textarea' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  value?: string;
}

export interface FormColumn {
  id: string;
  col: number;
  fields: FormField[];
  nestedRows?: FormRow[]; // Add support for nested rows
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    padding?: number;
  };
}

export interface FormRow {
  id: string;
  columns: FormColumn[];
}

export interface FormLayout {
  rows: FormRow[];
}

export interface DragItem {
  type: 'row' | 'column' | 'field';
  fieldType?: FormField['type'];
  id?: string;
}

export interface DropResult {
  type: 'row' | 'column' | 'field';
  targetId?: string;
  position?: number;
}
