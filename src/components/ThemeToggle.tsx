import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@sb-components/select';

import { useTheme } from '../hooks/useTheme';

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const;

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleValueChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
  };

  return (
    <Select value={theme} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themeOptions.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ThemeToggle;
