import type { ExerciseData } from '../types/exercises';

export const EXERCISES: ExerciseData[] = [
    {
        id: 0,
        name: 'Variáveis 1',
        question: 'Crie uma variável chamada x com valor 10 e imprima seu valor.',
        startCode: [
            '# Crie uma variável x com valor 10',
            '# Imprima o valor de x',
            '# Para printar o valor, utilize print(x)',
            '# Output esperado: "10"',
        ],
        completed: false,
        codeAnswer: [
            'x = 10',
            'print(x)'
        ],
        expectedCodeOutput: '10',
        studyMaterialName: 'docs.python',
        studyMaterialLink: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator'
    },
    {
        id: 1,
        name: 'Variáveis 2',
        question: 'Crie uma variável do tipo "lista" com os valores: 1, 2, 3 e imprima a lista criada.',
        startCode: [
            '# Crie uma variável do tipo lista com os valores: 1, 2, 3',
            '# Imprima a lista criada',
            '# Output esperado: "[1, 2, 3]"',
        ],
        completed: false,
        codeAnswer: [
            'lista = [1,2,3]',
            'print(lista)'
        ],
        expectedCodeOutput: '[1, 2, 3]',
        studyMaterialName: 'docs.python',
        studyMaterialLink: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator'
    }
]