import type { FileType, FolderType } from "../types/entities";


export function getEntityType(_item: FolderType | FileType) : 'file' | 'folder' {
    if (Array.isArray(_item.content)) { return 'folder' }
    else { return 'file'; }
}


export function getDefaultFile(): FileType {
    return {
        name: 'new_file.py',
        content: 'print("Hello World")',
        parentFolderId: 0,
        creationDate: new Date(),
        editDate: new Date(),
    }
}

export function getDefaultFolder(): FolderType {
    return {
        name: 'new_folder',
        content: [],
        parentFolderId: 0,
    }
}