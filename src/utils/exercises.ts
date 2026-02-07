import { EXERCISES } from "../data/exercises";
import type { ExerciseData, ExerciseRecord } from "../types/exercises";


export function createNewExerciseRecordObj(_exerciseId: number, _fileId?: number): ExerciseRecord {
    const fileIds: number[] = [];
    if (_fileId) fileIds.push(_fileId);

    return {
        exerciseId: _exerciseId,
        completed: false,
        fileIds: fileIds,
    } satisfies ExerciseRecord;
}


export function getExerciseDataById(_id: number): ExerciseData {
    return EXERCISES[_id]!;
}


export function compareCodeOutputs(_code1: string, _code2: string): boolean {
    return normalizeCodeOutput(_code1) === normalizeCodeOutput(_code2);
}


export function normalizeCodeOutput(_output: string): string {
    return _output
        .replace(/\r\n/g, '\n')
        .trim();
}
