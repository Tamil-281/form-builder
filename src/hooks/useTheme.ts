import { useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

// const getSystemTheme = (): 'light' | 'dark' => {
//   return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// };

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  if (theme === 'system') {
    localStorage.removeItem('theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDark);
  } else {
    localStorage.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
  }
};

// const getCurrentTheme = (): Theme => {
//   if (typeof window === 'undefined') return 'system';

//   const savedTheme = localStorage.theme as Theme;
//   if (savedTheme === 'light' || savedTheme === 'dark') {
//     return savedTheme;
//   }
//   return 'system';
// };

// const initializeTheme = () => {
//   document.documentElement.classList.toggle(
//     'dark',
//     localStorage.theme === 'dark' ||
//       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
//   );
// };

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const [systemTheme] = useState<'light' | 'dark'>('light');

  // useEffect(() => {
  //   // Initialize theme on mount
  //   initializeTheme();

  //   // Get initial theme
  //   setCurrentTheme(getCurrentTheme());
  //   setSystemTheme(getSystemTheme());

  //   // Listen for system theme changes
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     setSystemTheme(e.matches ? 'dark' : 'light');
  //     if (getCurrentTheme() === 'system') {
  //       applyTheme('system');
  //     }
  //   };

  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => mediaQuery.removeEventListener('change', handleChange);
  // }, []);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return {
    theme: currentTheme,
    systemTheme,
    setTheme,
  };
};
