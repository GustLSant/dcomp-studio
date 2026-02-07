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
        question: 'Crie três variáveis do tipo string com os valores "estudo", "de" e "programação", e imprima uma frase com essas três strings ao mesmo tempo.',
        startCode: [
            '# Crie três variáveis do tipo string com os valores "estudo", "de" e "programação"',
            '# Imprima uma frase com essas três strings ao mesmo tempo',
            '# Output esperado: "estudo de programação"',
        ],
        codeAnswer: [
            'a = "estudo"',
            'b = "de"',
            'c = "programação"',
            'print(a,b,c)'
        ],
        expectedCodeOutput: 'estudo de programação',
        studyMaterialName: 'docs.python',
        studyMaterialLink: 'https://docs.python.org/3/library/string.html'
    },
    {
        id: 2,
        name: 'Variáveis 3',
        question: 'Crie uma variável do tipo "lista" com os valores: 1, 2, 3 e imprima a lista criada.',
        startCode: [
            '# Crie uma variável do tipo lista com os valores: 1, 2, 3',
            '# Imprima a lista criada',
            '# Output esperado: "[1, 2, 3]"',
        ],
        codeAnswer: [
            'lista = [1,2,3]',
            'print(lista)'
        ],
        expectedCodeOutput: '[1, 2, 3]',
        studyMaterialName: 'docs.python',
        studyMaterialLink: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator'
    }
]