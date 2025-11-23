import type { FileType, FolderType } from "../types/entities";
import { getAllFiles } from "./files";
import { IndexedDB } from "./indexedDB";


const dbInstance: IndexedDB = new IndexedDB('folders');


export async function getRootFolder(): Promise<FolderType> {
    try {
        const allFolders: FolderType[] = await getAllFolders();
        const allFiles: FileType[] = await getAllFiles();

        const allEntities: (FolderType | FileType)[] = [...allFolders, ...allFiles];

        const rootFolderContent = allEntities.filter((_entitie) => { return (_entitie.parentFolderId === 0); });
        
        return {
            id: 0,
            name: 'root',
            content: rootFolderContent,
            parentFolderId: 0,
        } satisfies FolderType;
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function getAllFolders(): Promise<FolderType[]> {
    try {
        return await dbInstance.getAll<FolderType>();
    }
    catch(_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function getFolderById(_id: number): Promise<FolderType> {
    try {
        return await dbInstance.getById<FolderType>(_id);
    }
    catch(_error: unknown) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function addFolder(_folder: FolderType): Promise<number> {
    try {
        return await dbInstance.add(_folder);
    }
    catch(_error) {
        console.error(_error);
        throw new Error("Error on addFolder");
    }
}


export async function updateFolder(_folder: FolderType): Promise<void> {
    const folderToBeSaved: FolderType = { ..._folder };

    if(_folder.id === undefined){
        console.error('Folder.id is undefined', _folder);
        throw new Error("Error on updateFolder");
    }

    try {
        return await dbInstance.update(folderToBeSaved);
    }
    catch(_error) {
        console.error(_error);
        throw new Error("Error on updateFolder");
    }
}