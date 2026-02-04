export type ExerciseData = {
    id: number,
    name: string,
    question: string,
    completed: boolean,
    startCode: string[],
    codeAnswer: string[],
    expectedCodeOutput: string,
    studyMaterialName?: string,
    studyMaterialLink?: string,
}