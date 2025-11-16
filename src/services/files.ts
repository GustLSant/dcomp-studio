import type { FileType } from "../types/entities";
import { IndexedDB } from "./indexedDB";


const dbInstance: IndexedDB = new IndexedDB('files');


export async function getAllFiles(): Promise<FileType[]> {
    try{
        return await dbInstance.getAll<FileType>();
    }
    catch{
        return [];
    }
}


export async function getFileById(_id: number): Promise<FileType | undefined> {
    try{
        return await dbInstance.getById<FileType>(_id);
    }
    catch(_error){
        console.error(_error);
        throw new Error("Error on addFile");
    }
}


export async function addFile(_file: FileType): Promise<number> {
    try{
        return await dbInstance.add(_file);
    }
    catch(_error){
        console.error(_error);
        throw new Error("Error on addFile");
    }
}


export async function getMostRecentFile(): Promise<FileType | undefined> {
    try{
        const files: FileType[] = await dbInstance.getAll();
        let mostRecentFileIdx: number = 0;

        if(files.length > 0){
            for(let i=0; i<files.length-1; i++){
                if(files[i]!.creationDate > files[mostRecentFileIdx]!.creationDate){
                    mostRecentFileIdx = i;
                }
            }
    
            return files[mostRecentFileIdx]!;
        }
        else{
            return undefined;
        }
    }
    catch(_error){
        console.error(_error);
        throw new Error("Error on getMostRecentFile");
    }
}


export async function getLastEditedFile(): Promise<FileType | undefined> {
    try{
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
        else{
            return undefined;
        }
    }
    catch(_error){
        console.error(_error);
        throw new Error("Error on getLastEditedFile");
    }
}