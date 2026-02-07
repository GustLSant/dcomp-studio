import { IndexedDB } from "./indexedDB";
import type { ExerciseData, ExerciseRecord } from "../types/exercises";
import { compareCodeOutputs, createNewExerciseRecordObj, getExerciseDataById } from "../utils/exercises";


const dbInstance: IndexedDB = new IndexedDB('exercise_records');


export async function getAllExerciseRecords(): Promise<ExerciseRecord[]> {
    try {
        return await dbInstance.getAll<ExerciseRecord>();
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function getExerciseRecordById(_id: number): Promise<ExerciseRecord> {
    try {
        const foundRecord: ExerciseRecord | undefined = await dbInstance.getById(_id);

        if (!foundRecord) throw new Error('ExerciseRecord not Found');
        else return foundRecord; 
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function getExerciseRecordByExerciseId(_exerciseDataId: number): Promise<ExerciseRecord | undefined> {
    try {
        const records: ExerciseRecord[] = await dbInstance.getAll();
        const foundRecord: ExerciseRecord | undefined = records.find((_record) => _record.exerciseId === _exerciseDataId);
        return foundRecord;
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function addNewExerciseRecord(_exerciseDataId: number): Promise<number> {
    try {
        const foundRecord: ExerciseRecord | undefined = await getExerciseRecordByExerciseId(_exerciseDataId);
        
        if (foundRecord) return foundRecord.id!;

        const newRecord = createNewExerciseRecordObj(_exerciseDataId);
        return await dbInstance.add(newRecord);
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function updateRecordCompletion(_recordId: number, _codeOutput: string): Promise<boolean> {
    try {
        const record: ExerciseRecord = await dbInstance.getById(_recordId);
        const expectedCodeOutput: string = getExerciseDataById(record.exerciseId).expectedCodeOutput;
        
        if (compareCodeOutputs(expectedCodeOutput, _codeOutput)) {
            await markExerciseRecordAsCompleted(record);
            return true;
        }
        else {
            return false;
        }
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function addFileToExerciseRecord(_recordId: number, _fileId: number): Promise<void> {
    try {
        const exerciseRecord: ExerciseRecord = await dbInstance.getById(_recordId);
        if (!exerciseRecord.fileIds.includes(_fileId)) { exerciseRecord.fileIds.push(_fileId); }
        dbInstance.update(exerciseRecord);
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function markExerciseRecordAsCompleted(_record: ExerciseRecord): Promise<void> {
    try {
        _record.completed = true;
        dbInstance.update(_record);
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}