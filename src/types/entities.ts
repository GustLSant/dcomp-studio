export type EntityKind = 'folder' | 'file';

export type Entity = {
    id?: number,
    parentFolderId: number,
    kind: EntityKind,
    name: string,
}

export type FolderType = Entity & {
    kind: 'folder',
}

export type FileType = Entity & {
    content: string,
    kind: 'file',
    creationDate: Date,
    editDate: Date,
}

export type EntityPreviewPropType = {
    name: string,
    icon: string,
    interactable: boolean
}