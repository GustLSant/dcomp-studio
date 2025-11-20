import { loadPyodide, type PyodideInterface } from "pyodide";

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