export function normalizeCodeOutput(_output: string): string {
    return _output
        .replace(/\r\n/g, '\n')
        .trim();
}
