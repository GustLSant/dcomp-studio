import type { FolderType } from "../types/entities";

let nextAvailableId: number = 0;

export function getAvailableId(): number{
    const id = nextAvailableId;
    nextAvailableId += 1;
    return id;
}


export function saveUserDataOnLocalStorage(_userData: FolderType): void {
    const stringData: string = JSON.stringify(_userData);
    localStorage.setItem('userData', stringData);
}


export function getuserDataFromLocalStorage(): FolderType | undefined {
    const stringData: string | null = localStorage.getItem('userData');

    if(stringData === null){ return undefined; }
    else{
        return JSON.parse(stringData) as FolderType;
    }
}