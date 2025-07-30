import * as React from 'react';

import { DragItem } from '@components';
import { defaultItems } from '@routes/sidebar';
import { cn } from '@shared/utils';
import { ChevronLeft, ChevronRight, Rows } from 'lucide-react';

import type { SidebarProps } from './type';

import type { DragItemSubProps } from '@components/drag-item/type';

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      title = 'Components',
      subtitle = 'Drag and drop components to build your form',
      collapsible = false,
      collapsed = false,
      onToggleCollapse,
      className,
      width = 'w-80',
      emptyState,
      ...props
    },
    ref,
  ) => {
    const [searchTerm] = React.useState('');

    return (
      <div
        ref={ref}
        className={cn(
          'bg-builder-sidebar dark:bg-gray-900/80 border-r border-border  flex flex-col transition-all duration-300',
          width,
          collapsed && 'w-16',
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-6 border-b border-border ">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-builder-sidebar-foreground mb-2">
                  {title}
                </h2>
                <p className="text-sm text-builder-sidebar-foreground/70">{subtitle}</p>
              </div>
            )}
            {collapsible && (
              <button
                onClick={() => onToggleCollapse?.(!collapsed)}
                className="p-1 rounded-md hover:bg-builder-sidebar-hover text-builder-sidebar-foreground/70 hover:text-builder-sidebar-foreground transition-colors"
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.values(defaultItems).flat().length === 0 ? (
            emptyState || (
              <div className="text-center py-8">
                <Rows className="w-8 h-8 mx-auto text-builder-sidebar-foreground/30 mb-2" />
                <p className="text-sm text-builder-sidebar-foreground/50">
                  {searchTerm ? 'No components found' : 'No components available'}
                </p>
              </div>
            )
          ) : (
            <div className="h-[calc(100vh-222px)]">
              {Object.entries(defaultItems).map(([key, value]) => (
                <div key={key} className="space-y-3 py-3">
                  <h2 className="text-md font-semibold text-builder-sidebar-foreground capitalize tracking-wide">
                    {key}
                  </h2>
                  {(value as DragItemSubProps[]).map((item: DragItemSubProps, index: number) => (
                    <DragItem
                      key={index}
                      type={item.type}
                      fieldType={item.fieldType}
                      icon={item.icon}
                      label={item.label}
                      description={item.description}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Sidebar.displayName = 'Sidebar';
export { Sidebar };
