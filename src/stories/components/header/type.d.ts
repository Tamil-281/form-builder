export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
  showThemeToggle?: boolean;
  showNavigation?: boolean;
  logo?: React.ReactNode;
  navigationItems?: NavigationItem[];
  navigationAlign?: 'left' | 'center' | 'right';
}
