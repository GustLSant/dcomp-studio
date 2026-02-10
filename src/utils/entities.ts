import eventBus from "../eventBus";
import { EVENT_OPEN_FILE_MENU } from "../events/entities";
import type { EntityKind, FileType, FolderType } from "../types/entities";


export function getDefaultFile(): FileType {
    return {
        name: 'new_file.py',
        content: 'print("Hello World")\n',
        parentFolderId: 0,
        kind: 'file',
        creationDate: new Date(),
        editDate: new Date(),
    }
}

export function getDefaultFolder(): FolderType {
    return {
        name: 'new_folder',
        parentFolderId: 0,
        kind: 'folder',
    }
}


export function openEntityMenu(_id: number, _kind: EntityKind): void {
    eventBus.dispatchEvent(
        new CustomEvent(EVENT_OPEN_FILE_MENU, { detail: { id: _id, kind: _kind } })
    );
}


export function exportFile(_file: FileType): void {
    const json = JSON.stringify(
        {
            ..._file,
            exerciseId: undefined,
        },
        null,
        2
    );

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${_file.name}.json`;
    a.click();

    URL.revokeObjectURL(url);
}


export function importFile(): Promise<FileType> {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) {
                reject(new Error('Nenhum arquivo selecionado'));
                return;
            }

            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const parsed = JSON.parse(reader.result as string);

                    const imported: FileType = {
                        ...parsed,
                        creationDate: new Date(parsed.creationDate),
                        editDate: new Date(parsed.editDate),
                        kind: 'file',
                    };

                    resolve(imported);
                }
                catch { reject(new Error('Arquivo inválido')); }
            };

            reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
            reader.readAsText(file);
        };

        input.click();
    });
}