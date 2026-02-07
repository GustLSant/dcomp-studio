export type ExerciseData = {
    id: number,
    name: string,
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