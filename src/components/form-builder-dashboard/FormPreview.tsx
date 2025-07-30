import { useFormBuilder } from '@context';
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

const FormPreview = () => {
  const { state } = useFormBuilder();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log('Form submitted with data:', data);
    // Here you would typically send the data to your backend
    alert('Form submitted! Check console for data.');
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select name={field.name}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return <Input name={field.name} type="date" required={field.required} />;

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox name={field.name} id={field.id} required={field.required} />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup name={field.name}>
            {field.options?.map((option: string, index: number) => (
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

  const renderColumn = (column: any) => {
    return (
      <div key={column.id} className={`col-span-${column.col}`}>
        <div className="space-y-4">
          {column.fields.map((field: any) => (
            <div key={field.id} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
              )}
              {renderField(field)}
            </div>
          ))}

          {/* Render nested rows if they exist */}
          {column.nestedRows?.map((nestedRow: any) => (
            <div key={nestedRow.id} className="border-l-2 border-gray-200 pl-4 mt-4">
              <div className="grid grid-cols-12 gap-4">
                {nestedRow.columns.map((nestedColumn: any) => renderColumn(nestedColumn))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRow = (row: any) => {
    return (
      <div key={row.id} className="grid grid-cols-12 gap-4 mb-6">
        {row.columns.map((column: any) => renderColumn(column))}
      </div>
    );
  };

  if (state.layout.rows.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No form content
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Add some form fields to see the preview here.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">{state.layout.rows.map((row: any) => renderRow(row))}</div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export { FormPreview };
