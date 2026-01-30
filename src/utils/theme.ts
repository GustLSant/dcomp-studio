import type { AppThemeType } from "../types/theme";

const DEFAULT_THEME: AppThemeType = 'dark';

export function getThemeFromLocalStorage(): AppThemeType {
    const themeFromLocalStorage: string | null = localStorage.getItem('theme');

    if (themeFromLocalStorage) { return themeFromLocalStorage as AppThemeType }
    else { return DEFAULT_THEME; }
}