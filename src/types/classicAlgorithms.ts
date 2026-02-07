export type AlgorithmCollection = {
    complexity: string,
    resume: string,
    algorithms: AlgorithmData[],
}

export type AlgorithmData = {
    name: string,
    source: string | undefined,
    sourceLink: string | undefined,
    code: string[],
    abstract: string,
}