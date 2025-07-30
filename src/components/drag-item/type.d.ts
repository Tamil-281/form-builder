import type { DragItemType } from '@components';

export interface DragItemProps {
  Layout: DragItemSubProps[];
  'Form Field': DragItemSubProps[];
}

export interface DragItemSubProps {
  type?: DragItemType['type'];
  fieldType?: DragItemType['fieldType'];
  icon: React.ReactNode;
  label: string;
  description?: string;
}
