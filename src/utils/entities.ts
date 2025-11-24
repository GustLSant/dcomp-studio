import type { FileType, FolderType } from "../types/entities";


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