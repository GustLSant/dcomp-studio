export const editorThemeItems = [
    'default',
    'dracula',
    'githubLight',
    'hacker90s',
    'lightPlus',
    'solarizedLight',
    'solarizedDark',
    'synthwave',
] as const;

export type EditorTheme = typeof editorThemeItems[number];