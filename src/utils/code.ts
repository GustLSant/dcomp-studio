import { loadPyodide, type PyodideInterface } from "pyodide";
import { type Diagnostic, linter } from "@codemirror/lint";

let pyodide: PyodideInterface | null = await loadPyodide({ indexURL: "/pyodide/" });

export async function runPythonCode(_code: string): Promise<string> {
    if (!pyodide) {
        console.error('Error on runCode: pyodide not loaded');
        return 'Error';
    }

    try {
        await pyodide.runPythonAsync(`
            import io, sys
            sys.stdout = io.StringIO()
        `);

        await pyodide.runPythonAsync(_code);

        const result = await pyodide.runPythonAsync("sys.stdout.getvalue()");
        return result;
    }
    catch (_err: any) {
        console.error('Error on runCode: ', _err);
        throw new Error(_err);
    }
}



const BLOCK_KEYWORDS = /^(def|if|elif|else|for|while|class|try|except|with)\b/;

export const pythonLinter = linter(view => {
    const diagnostics: Diagnostic[] = [];
    const lines = view.state.doc.toString().split('\n');

    let paren = 0;    // ()
    let bracket = 0;  // []
    let brace = 0;    // {}

    lines.forEach((line, i) => {
        const lineNo = i + 1;
        const lineInfo = view.state.doc.line(lineNo);

        // Contadores separados
        paren   += (line.match(/\(/g)?.length || 0);
        paren   -= (line.match(/\)/g)?.length || 0);

        bracket += (line.match(/\[/g)?.length || 0);
        bracket -= (line.match(/\]/g)?.length || 0);

        brace   += (line.match(/{/g)?.length || 0);
        brace   -= (line.match(/}/g)?.length || 0);

        // Blocos sem :
        if (
            BLOCK_KEYWORDS.test(line.trim()) &&
            !line.trim().endsWith(':')
        ) {
            diagnostics.push({
                from: lineInfo.from,
                to: lineInfo.to,
                severity: "error",
                message: "SyntaxError: ':' esperado"
            });
        }
    });

    if (paren !== 0) {
        diagnostics.push({
            from: 0,
            to: view.state.doc.length,
            severity: "error",
            message: "SyntaxError: parênteses não balanceados"
        });
    }

    if (bracket !== 0) {
        diagnostics.push({
            from: 0,
            to: view.state.doc.length,
            severity: "error",
            message: "SyntaxError: colchetes não balanceados"
        });
    }

    if (brace !== 0) {
        diagnostics.push({
            from: 0,
            to: view.state.doc.length,
            severity: "error",
            message: "SyntaxError: chaves não balanceadas"
        });
    }

    return diagnostics;
});
