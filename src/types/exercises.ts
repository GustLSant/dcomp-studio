export type ExerciseGroup = {
    id: number,
    name: string,
    exercises: ExerciseData[],
}

export type ExerciseData = {
    id: number,
    name: string,
    difficulty: ExerciseDifficulty,
    question: string,
    startCode: string[],
    codeAnswer: string[],
    expectedCodeOutput: string,
    studyMaterialName?: string,
    studyMaterialLink?: string,
}

export type ExerciseRecord = {
    id?: number,
    exerciseId: number,
    completed: boolean,
    fileIds: number[],
}

export type ExerciseDifficulty = 'Easy' | 'Medium' | 'Hard';