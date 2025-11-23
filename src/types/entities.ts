export type Entity = {
    id?: number,
    parentFolderId: number,
    name: string,
}

export type FolderType = Entity & {
    content: (FolderType | FileType)[]
}

export type FileType = Entity & {
    content: string,
    creationDate: Date,
    editDate: Date
}

