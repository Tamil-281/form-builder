import type { ReactNode } from 'react';

import type { DragItemProps } from '@dnd';

export interface SidebarProps {
  title?: string;
  subtitle?: string;
  items?: DragItemProps[];
  categories?: string[];
  showCategories?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
  width?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyState?: ReactNode;
}
