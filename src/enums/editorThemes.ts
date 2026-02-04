export const editorThemeItems = [
    'default',
    'dr4cul4',
    'g1thubL1ght',
    'hacker90s',
    'l1ghtPlus',
    's0l4r1zedL1ght',
    's0l4r1z3dD4rk',
    'synthwave',
] as const;

export type EditorTheme = typeof editorThemeItems[number];