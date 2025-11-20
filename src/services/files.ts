import type { FileType } from "../types/entities";
import { IndexedDB } from "./indexedDB";


const dbInstance: IndexedDB = new IndexedDB('files');


export async function getAllFiles(): Promise<FileType[]> {
    try {
        return await dbInstance.getAll<FileType>();
    }
    catch(_error) {
        console.error(_error);
        return [];
    }
}


export async function getFileById(_id: number): Promise<FileType> {
    try {
        return await dbInstance.getById<FileType>(_id);
    }
    catch(_error: unknown) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function addFile(_file: FileType): Promise<number> {
    try {
        return await dbInstance.add(_file);
    }
    catch(_error) {
        console.error(_error);
        throw new Error("Error on addFile");
    }
}


export async function updateFile(_file: FileType): Promise<void> {
    const fileToBeSaved: FileType = { ..._file };

    if(_file.id === undefined){
        console.error('File.id is undefined', _file);
        throw new Error("Error on updateFile");
    }

    try {
        return await dbInstance.update(fileToBeSaved);
    }
    catch(_error) {
        console.error(_error);
        throw new Error("Error on updateFile");
    }
}


export async function getMostRecentFile(): Promise<FileType | undefined> {
    try {
        const files: FileType[] = await dbInstance.getAll();
        let mostRecentFileIdx: number = 0;

        if(files.length > 0) {
            for(let i=0; i<files.length-1; i++){
                if(files[i]!.creationDate > files[mostRecentFileIdx]!.creationDate){
                    mostRecentFileIdx = i;
                }
            }
    
            return files[mostRecentFileIdx]!;
        }
        else {
            return undefined;
        }
    }
    catch(_error) {
        console.error(_error);
        return undefined;
    }
}


export async function getRecentFiles(_count: number): Promise<FileType[]> {
    try {
        const files: FileType[] = await dbInstance.getAll();

        files.sort((file1, file2) => { return (file2.editDate.getDate() - file1.editDate.getDate()) });

        return [...files.slice(0, _count)];
    }
    catch (_error) {
        console.error(_error);
        return [];
    }
}


export async function getLastEditedFile(): Promise<FileType | undefined> {
    try {
        const files: FileType[] = await dbInstance.getAll();
        let lastEditedFileIdx: number = 0;

        if(files.length > 0){
            for(let i=0; i<files.length-1; i++){
                if(files[i]!.editDate > files[lastEditedFileIdx]!.editDate){
                    lastEditedFileIdx = i;
                }
            }
    
            return files[lastEditedFileIdx]!;
        }
        else {
            return undefined;
        }
    }
    catch(_error) {
        console.error(_error);
        return undefined;
    }
}