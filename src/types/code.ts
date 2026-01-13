export type CodeOutput = {
    type: 'success' | 'error',
    content: string,
}

export type EditorFooterButtonLabel = '=' | '()' | ':' | ',' | '"' | '[]' | '{}' | '&' | '|' | '_' | '#' | '<' | '>' | '!' | 'tab';

export type EditorFooterButton = {
    id: number,
    label: EditorFooterButtonLabel,
    function: (_view: any) => void
}