import { useFormBuilder } from '@context';
import type { FormField, FormColumn } from '@dnd';
import { Input, Label, Button, Switch, Separator, Slider } from '@sb-components';
import { Plus, Trash2, Palette } from 'lucide-react';
import { useMemo, useCallback } from 'react';

export function PropertiesPanel() {
  const { state, dispatch } = useFormBuilder();

  // Memoized helper functions to avoid recalculation
  const { selectedField, selectedColumn, fieldLocation, columnLocation } = useMemo(() => {
    if (!state.selectedItem) {
      return {
        selectedField: null,
        selectedColumn: null,
        fieldLocation: null,
        columnLocation: null,
      };
    }

    let selectedField: FormField | null = null;
    let selectedColumn: FormColumn | null = null;
    let fieldLocation: { rowId: string; columnId: string } | null = null;
    let columnLocation: { rowId: string } | null = null;

    // Single pass through the layout to find selected item
    for (const row of state.layout.rows) {
      if (state.selectedItem.type === 'column') {
        const column = row.columns.find(c => c.id === state.selectedItem!.id);
        if (column) {
          selectedColumn = column;
          columnLocation = { rowId: row.id };
          break;
        }
      } else if (state.selectedItem.type === 'field') {
        for (const column of row.columns) {
          const field = column.fields.find(f => f.id === state.selectedItem!.id);
          if (field) {
            selectedField = field;
            fieldLocation = { rowId: row.id, columnId: column.id };
            break;
          }
        }
        if (selectedField) break;
      }
    }

    return { selectedField, selectedColumn, fieldLocation, columnLocation };
  }, [state.selectedItem, state.layout.rows]);

  // Memoized event handlers
  const handleFieldUpdate = useCallback(
    (updates: Partial<FormField>) => {
      if (!selectedField || !fieldLocation) return;

      dispatch({
        type: 'UPDATE_FIELD',
        rowId: fieldLocation.rowId,
        columnId: fieldLocation.columnId,
        fieldId: selectedField.id,
        updates,
      });
    },
    [selectedField, fieldLocation, dispatch],
  );

  const handleColumnUpdate = useCallback(
    (updates: Partial<FormColumn>) => {
      if (!selectedColumn || !columnLocation) return;

      dispatch({
        type: 'UPDATE_COLUMN',
        rowId: columnLocation.rowId,
        columnId: selectedColumn.id,
        updates,
      });
    },
    [selectedColumn, columnLocation, dispatch],
  );

  const handleAddOption = useCallback(() => {
    if (!selectedField || !fieldLocation) return;

    const newOptions = [
      ...(selectedField.options || []),
      `Option ${(selectedField.options?.length || 0) + 1}`,
    ];
    handleFieldUpdate({ options: newOptions });
  }, [selectedField, fieldLocation, handleFieldUpdate]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      if (!selectedField || !fieldLocation) return;

      const newOptions = selectedField.options?.filter((_, i) => i !== index) || [];
      handleFieldUpdate({ options: newOptions });
    },
    [selectedField, fieldLocation, handleFieldUpdate],
  );

  const handleUpdateOption = useCallback(
    (index: number, value: string) => {
      if (!selectedField || !fieldLocation) return;

      const newOptions = [...(selectedField.options || [])];
      newOptions[index] = value;
      handleFieldUpdate({ options: newOptions });
    },
    [selectedField, fieldLocation, handleFieldUpdate],
  );

  // Early return for no selection
  if (!state.selectedItem) {
    return (
      <div className="w-80 bg-muted/30 border-l border-builder-field-border p-6">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-muted-foreground rounded"></div>
          </div>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-muted/30 border-l border-builder-field-border p-6 overflow-y-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Properties</h3>

          {state.selectedItem.type === 'field' && selectedField ? (
            <div className="flex flex-col gap-4">
              {/* Label */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="field-label">Label</Label>
                <Input
                  id="field-label"
                  value={selectedField.label}
                  onChange={e => handleFieldUpdate({ label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>

              {/* Placeholder */}
              {selectedField.type !== 'checkbox' && selectedField.type !== 'radio' && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="field-placeholder">Placeholder</Label>
                  <Input
                    id="field-placeholder"
                    value={selectedField.placeholder || ''}
                    onChange={e => handleFieldUpdate({ placeholder: e.target.value })}
                    placeholder="Enter placeholder text"
                  />
                </div>
              )}

              {/* Required */}
              <div className="flex items-center justify-between">
                <Label htmlFor="field-required">Required</Label>
                <Switch
                  id="field-required"
                  checked={selectedField.required || false}
                  onCheckedChange={checked => handleFieldUpdate({ required: checked })}
                />
              </div>

              {/* Options for Select and Radio */}
              {(selectedField.type === 'select' || selectedField.type === 'radio') && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Options</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddOption}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {selectedField.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={e => handleUpdateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Field Type Info */}
              <div className="flex flex-col gap-2">
                <Label>Field Type</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm">{selectedField.type}</div>
              </div>
            </div>
          ) : state.selectedItem.type === 'column' && selectedColumn ? (
            <div className="flex flex-col gap-4">
              {/* Column Width */}
              <div className="flex flex-col gap-2">
                <Label className="pb-2">Column Width ({selectedColumn.col})</Label>
                <Slider
                  value={[selectedColumn.col]}
                  onValueChange={value => handleColumnUpdate({ col: value[0] })}
                  max={12}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <Separator />

              {/* Column Styling */}
              <div className="flex flex-col gap-4">
                {/* <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <Label className="text-sm font-medium">Styling</Label>
                </div> */}
                {/* Background Color */}
                {/* <div className="flex flex-col gap-2">
                  <Label htmlFor="column-bg">Background Color</Label>
                  <Input
                    id="column-bg"
                    type="color"
                    value={selectedColumn.style?.backgroundColor || '#ffffff'}
                    onChange={e =>
                      handleColumnUpdate({
                        style: { ...selectedColumn.style, backgroundColor: e.target.value },
                      })
                    }
                  />
                </div> */}
                
                {/* Border Color */}
                {/* <div className="flex flex-col gap-2">
                  <Label htmlFor="column-border">Border Color</Label>
                  <Input
                    id="column-border"
                    type="color"
                    value={selectedColumn.style?.borderColor || '#e5e7eb'}
                    onChange={e =>
                      handleColumnUpdate({
                        style: { ...selectedColumn.style, borderColor: e.target.value },
                      })
                    }
                  />
                </div> */}
                {/* Border Width */}
                {/* <div className="flex flex-col gap-2">
                  <Label>Border Width ({selectedColumn.style?.borderWidth || 1}px)</Label>
                  <Slider
                    value={[selectedColumn.style?.borderWidth || 1]}
                    onValueChange={value =>
                      handleColumnUpdate({
                        style: { ...selectedColumn.style, borderWidth: value[0] },
                      })
                    }
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div> */}
                {/* Padding */}
                {/* <div className="flex flex-col gap-2">
                  <Label>Padding ({selectedColumn.style?.padding || 16}px)</Label>
                  <Slider
                    value={[selectedColumn.style?.padding || 16]}
                    onValueChange={value =>
                      handleColumnUpdate({
                        style: { ...selectedColumn.style, padding: value[0] },
                      })
                    }
                    max={50}
                    min={0}
                    step={2}
                    className="w-full"
                  />
                </div> */}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                {state.selectedItem.type === 'row'
                  ? 'Row properties coming soon'
                  : 'Select an element to edit its properties'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
