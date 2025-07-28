import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
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
    <Select.Root value={theme} onValueChange={handleValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-lg px-3 py-2 text-sm leading-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
        <Select.Value placeholder="Select theme" />
        <Select.Icon className="text-gray-500">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <Select.Viewport className="p-1">
            {themeOptions.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className="relative flex items-center px-8 py-2 text-sm text-black dark:text-white rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default ThemeToggle;
