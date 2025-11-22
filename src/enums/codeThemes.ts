const themeItems = [
    'default',
    'dracula',
    'githubLight',
    'hacker90s',
    'lightPlus',
    'solarizedLight',
    'solarizedDark',
    'synthwave',
] as const;

export type CodeTheme = typeof themeItems[number];