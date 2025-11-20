import type { FileType } from "../types/entities";


export function getDefaultFile(): FileType {
    return {
        name: 'new_file.py',
        content: 'print("Hello World")',
        parentFolderId: 1,
        creationDate: new Date(),
        editDate: new Date(),
    }
}