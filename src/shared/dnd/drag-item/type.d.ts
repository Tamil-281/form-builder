import type { DragItem } from '../type';

export interface DragItemProps {
  Layout: DragItemSubProps[];
  'Form Field': DragItemSubProps[];
}

export interface DragItemSubProps {
  type?: DragItem['type'];
  fieldType?: DragItem['fieldType'];
  icon: React.ReactNode;
  label: string;
  description?: string;
}
