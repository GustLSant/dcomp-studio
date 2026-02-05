import { EXERCISES } from "../data/exercises";
import type { ExerciseData } from "../types/exercises";

export function getExerciseDataById(_id: number | undefined): ExerciseData | null {
    if (_id === undefined || EXERCISES[_id] === undefined) {
        return null;
    }

    else return EXERCISES[_id];
}