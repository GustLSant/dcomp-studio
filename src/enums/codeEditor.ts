export const codeEditorButtonItems = [
    'left',
    'right',
    'tab',
    'shift',
    'home',
    'end',
    'copy',
    'paste',
    'undo',
    'redo',
    'brackets',
    'braces'
] as const;


export type CodeEditorButton = typeof codeEditorButtonItems[number];