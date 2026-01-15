import { EditorSelection } from '@codemirror/state';
import { createPopup } from './popup';

const indent = "  ";


export function getFontSizeFromLocalStorage(): string { return localStorage.getItem('fontSize') ?? '12'; }


export function insertChar(_view: any, _char: string) {
    if (!_view) return;

    const pos = _view.state.selection.main.head;

    _view.dispatch({
        changes: { from: pos, to: pos, insert: _char },
        selection: EditorSelection.cursor(pos + _char.length),
        scrollIntoView: true
    });

    _view.focus();
}


export function moveCursorWordLeft(_view: any) {
    if (!_view) return;

    const state = _view.state;
    const pos = state.selection.main.head;

    const line = state.doc.lineAt(pos);
    const textBefore = line.text.slice(0, pos - line.from);

    const match = textBefore.match(/[\w]+(?=\W*$)/);
    const newPos = match
        ? pos - match[0].length
        : Math.max(line.from, pos - 1);

    _view.dispatch({
        selection: EditorSelection.cursor(newPos),
        scrollIntoView: true
    });

    _view.focus();
}


export function insertTabIndent(_view: any) {
    if (!_view) return;

    const state = _view.state;
    const pos = state.selection.main.head;

    const line = state.doc.lineAt(pos);
    const lineStart = line.from;

    _view.dispatch({
        changes: {
            from: lineStart,
            to: lineStart,
            insert: indent
        },
        selection: EditorSelection.cursor(pos + indent.length),
        scrollIntoView: true
    });

    _view.focus();
}


export function insertTab(_view: any) {
    if (!_view) return;

    const state = _view.state;
    const pos = state.selection.main.head;

    _view.dispatch({
        changes: {
            from: pos,
            to: pos,
            insert: indent
        },
        selection: EditorSelection.cursor(pos + indent.length),
        scrollIntoView: true
    });

    _view.focus();
}


export function insertParens(_view: any) {
    if (!_view) return;

    const pos = _view.state.selection.main.head;

    _view.dispatch({
        changes: { from: pos, to: pos, insert: '()' },
        selection: EditorSelection.cursor(pos + 1),
        scrollIntoView: true
    });

    _view.focus();
}


export function insertBrackets(_view: any) {
    if (!_view) return;

    const pos = _view.state.selection.main.head;

    _view.dispatch({
        changes: { from: pos, to: pos, insert: '[]' },
        selection: EditorSelection.cursor(pos + 1),
        scrollIntoView: true
    });

    _view.focus();
}


export function insertBraces(_view: any) {
    if (!_view) return;

    const pos = _view.state.selection.main.head;

    _view.dispatch({
        changes: { from: pos, to: pos, insert: '{}' },
        selection: EditorSelection.cursor(pos + 1),
        scrollIntoView: true
    });

    _view.focus();
}


export function moveCursorWordRight(_view: any) {
    if (!_view) return;

    const state = _view.state;
    const pos = state.selection.main.head;

    const line = state.doc.lineAt(pos);
    const textAfter = line.text.slice(pos - line.from);

    const match = textAfter.match(/^\W*([\w]+)/);
    const offset = match
        ? match[0].length
        : 1;

    const newPos = Math.min(line.to, pos + offset);

    _view.dispatch({
        selection: EditorSelection.cursor(newPos),
        scrollIntoView: true
    });

    _view.focus();
}


export function copy(_view: any) {
    if (!_view) return;

    navigator.clipboard.writeText(_view.state.selection)
    .catch((_err) => {
      createPopup('error', 'Falha ao copiar texto', 'Por favor, tente novamente');
    });

    _view.focus();
}



export function undo() {
    (document as any).execCommand('undo');
}


export function redo() {
    (document as any).execCommand('redo');
}








// function moveCursor(_view: any, _direction: 1 | -1, _amount: number = 1) {
//     if (!_view) return;

//     const state = _view.state;
//     const pos = _view.state.selection.main.head;
//     let newPos = 0;

//     newPos = Math.min(                        // limite superior
//         state.doc.length, 
//         Math.max(                             // limite inferior
//             0,
//             pos + (_direction * _amount)
//         )
//     );

//     _view.dispatch({
//         selection: EditorSelection.cursor(newPos),
//         scrollIntoView: true
//     });

//     _view.focus();
// }