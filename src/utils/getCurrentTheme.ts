import { getValue } from './storage';

export function getCurrentTheme() {
  const localTheme = getValue('themeMode');
  if (localTheme) return localTheme as ThemeMode;

  if (typeof window !== 'undefined') {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = colorSchemeQuery.matches ? 'dark' : 'light';
    return systemTheme as ThemeMode;
  }
}
