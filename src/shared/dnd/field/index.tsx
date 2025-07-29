import { useFormBuilder } from '@context';
import type { FieldProps } from './type';
import {
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Button,
} from '@sb-components';
import { Settings, Trash2 } from 'lucide-react';

const Field = ({ field, rowId, columnId, parentRowId, parentColumnId, nestedRowId }: FieldProps) => {
  const { dispatch } = useFormBuilder();

  const handleDeleteField = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (parentRowId && parentColumnId && nestedRowId) {
      // This is a field inside a nested row
      dispatch({ 
        type: 'REMOVE_FIELD_FROM_NESTED_ROW', 
        parentRowId, 
        parentColumnId, 
        nestedRowId, 
        columnId, 
        fieldId: field.id 
      });
    } else {
      // This is a regular field
      dispatch({ type: 'REMOVE_FIELD', rowId, columnId, fieldId: field.id });
    }
  };

  const handleSelectField = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_ITEM', itemType: 'field', id: field.id });
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            disabled
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            disabled
            className="bg-builder-field resize-none"
            rows={3}
          />
        );

      case 'select':
        return (
          <Select disabled>
            <SelectTrigger className="bg-builder-field">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return <Input type="date" disabled className="bg-builder-field" />;

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.id} disabled />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup disabled>
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="relative group p-4 border border-builder-field-border rounded-lg  hover:bg-builder-field-hover hover:border-primary transition-all duration-200"
      onClick={handleSelectField}
    >
      {/* Field Controls */}
      <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        {field.type}
      </div>

      <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button variant="outline" size="sm" onClick={handleSelectField} className="h-6 w-6 p-0">
          <Settings className="h-3 w-3" />
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDeleteField} className="h-6 w-6 p-0">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Field Content */}
      <div className="space-y-2">
        {field.type !== 'checkbox' && (
          <Label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {renderField()}
      </div>
    </div>
  );
};

export default Field;
