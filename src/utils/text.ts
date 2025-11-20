export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

export function countOccurrences(_text: string, _sub: string): number {
    if (!_sub) return 0;

    let count = 0;
    let pos = 0;

    while (true) {
        const i = _text.indexOf(_sub, pos);
        if (i === -1) break;

        count++;
        pos = i + _sub.length;
    }

    return count;
}