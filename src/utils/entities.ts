import eventBus from "../eventBus";
import { EVENT_OPEN_FILE_MENU } from "../events/entities";
import type { EntityKind, FileType, FolderType } from "../types/entities";


export function getDefaultFile(): FileType {
    return {
        name: 'new_file.py',
        content: 'print("Hello World")',
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