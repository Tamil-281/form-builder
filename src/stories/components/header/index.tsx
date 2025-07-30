import { memo, useMemo, useState } from 'react';

import ThemeToggle from '@components/ThemeToggle';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@shared/utils';
import { Menu, X } from 'lucide-react';

import type { HeaderProps, NavigationItem as NavigationItemType } from './type';

const NavigationItem = memo<{ item: NavigationItemType }>(({ item }) => (
  <a
    href={item.href}
    className={cn(
      'text-sm font-medium transition-colors duration-200',
      'hover:text-blue-600 dark:hover:text-blue-400',
      item.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300',
    )}
  >
    {item.label}
  </a>
));

NavigationItem.displayName = 'NavigationItem';

const MobileNavigationItem = memo<{ item: NavigationItemType }>(({ item }) => (
  <a
    href={item.href}
    className={cn(
      'block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
      'hover:text-blue-600 dark:hover:text-blue-400',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      item.active
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'text-gray-700 dark:text-gray-300',
    )}
  >
    {item.label}
  </a>
));

MobileNavigationItem.displayName = 'MobileNavigationItem';

const DefaultLogo = memo(() => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">F</span>
    </div>
    <span className="text-xl font-bold text-white dark:text-white">Form Builder</span>
  </div>
));

DefaultLogo.displayName = 'DefaultLogo';

const MobileMenuToggle = memo<{
  isOpen: boolean;
  onToggle: () => void;
}>(({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    aria-label="Toggle mobile menu"
    aria-expanded={isOpen}
  >
    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
));

MobileMenuToggle.displayName = 'MobileMenuToggle';

const Header = ({
  className,
  children,
  showThemeToggle = true,
  showNavigation = true,
  logo,
  navigationItems = [],
  navigationAlign = 'center',
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Memoize navigation rendering to prevent unnecessary re-renders
  const navigation = useMemo(() => {
    if (!showNavigation || navigationItems.length === 0) return null;

    return (
      <nav className="hidden md:flex items-center space-x-8">
        {navigationItems.map(item => (
          <NavigationItem key={item.label} item={item} />
        ))}
      </nav>
    );
  }, [showNavigation, navigationItems]);

  const mobileNavigation = useMemo(() => {
    if (!showNavigation && !showThemeToggle && !children) return null;

    return (
      <div
        className={cn(
          'md:hidden border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 py-2 space-y-1">
          {showNavigation &&
            navigationItems.map(item => <MobileNavigationItem key={item.label} item={item} />)}
          {children && (
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <div className="space-y-2">{children}</div>
            </div>
          )}
          {showThemeToggle && (
            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [showNavigation, showThemeToggle, navigationItems, isMobileMenuOpen, children]);

  const logoElement = useMemo(
    () => <div className="flex items-center space-x-4">{logo || <DefaultLogo />}</div>,
    [logo],
  );

  const rightSection = useMemo(
    () => (
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          {children}
          {showThemeToggle && <ThemeToggle />}
        </div>
        {(showNavigation || showThemeToggle || children) && (
          <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        )}
      </div>
    ),
    [children, showThemeToggle, showNavigation, isMobileMenuOpen],
  );

  const headerClasses = useMemo(
    () =>
      cn(
        'sticky top-0 z-50 w-full bg-builder-sidebar border-b border-builder-field-border ',
        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm bg-builder-sidebar border-b border-builder-field-border',
        'transition-all duration-300 ease-in-out',
        className,
      ),
    [className],
  );

  return (
    <Slot>
      <header className={headerClasses}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-4">
          <div className="flex-shrink-0">{logoElement}</div>

          {showNavigation && navigationAlign === 'center' && (
            <div className="flex-1 flex justify-center">{navigation}</div>
          )}

          <div className="flex-shrink-0">{rightSection}</div>
        </div>

        {mobileNavigation}
      </header>
    </Slot>
  );
};

export { Header };
