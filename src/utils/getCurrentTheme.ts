import { getValue } from './storage';

export function getCurrentTheme(): ThemeMode {
  const localTheme = getValue('themeMode');
  if (localTheme) return localTheme;

  if (typeof window !== 'undefined') {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = colorSchemeQuery.matches ? 'dark' : 'light';
    return systemTheme;
  }
}
