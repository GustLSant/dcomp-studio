import { EXERCISE_GROUPS } from "../data/exercises";
import { getAllExerciseRecords } from "../services/exercises";
import type { ExerciseData, ExerciseGroup, ExerciseRecord } from "../types/exercises";


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
    for (const group of EXERCISE_GROUPS) {
        const exercise = group.exercises.find(e => e.id === _id);
        if (exercise) return exercise;
    }

    throw new Error(`ExerciseData com id ${_id} não encontrado`);
}


export function compareCodeOutputs(_code1: string, _code2: string): boolean {
    return normalizeCodeOutput(_code1) === normalizeCodeOutput(_code2);
}


export function normalizeCodeOutput(_output: string): string {
    return _output
        .replace(/\r\n/g, '\n')
        .trim();
}

export async function getFullExercisesProgress(): Promise<number> {
    try {
        const totalExercises = EXERCISE_GROUPS.reduce(
            (total, group) => total + group.exercises.length,
            0
        );

        const completed = (await getAllExerciseRecords()).filter(r => r.completed).length;

        return Math.min(Math.floor((completed / totalExercises) * 100), 100);
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function getExerciseGroupProgress(_groupId: number): Promise<number> {
    try {
        const group: ExerciseGroup | undefined = EXERCISE_GROUPS.find(g => g.id === _groupId);

        if (!group || group.exercises.length === 0) return 0;

        const exerciseIds = new Set<number>(
            group.exercises.map(e => e.id)
        );

        const completedCount = (await getAllExerciseRecords())
            .filter((r: ExerciseRecord) =>
                r.completed && exerciseIds.has(r.exerciseId)
            )
            .length;

        const progress = (completedCount / group.exercises.length) * 100;

        return Math.min(Math.floor(progress), 100);
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}


export async function checkIsExerciseCompleted(_exerciseId: number): Promise<boolean> {
    try {
        const records: ExerciseRecord[] = await getAllExerciseRecords();

        const record = records.find(
            (r: ExerciseRecord) => r.exerciseId === _exerciseId
        );

        return record?.completed === true;
    }
    catch (_error) {
        const message = _error instanceof Error ? _error.message : String(_error);
        throw new Error(message);
    }
}