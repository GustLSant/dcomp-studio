import type { ExerciseData, ExerciseGroup } from '../types/exercises';

const EXERCISE_VARIAVEIS_1: ExerciseData = {
    id: 0,
    name: 'Variáveis 1',
    difficulty: 'Easy',
    question: 'Crie uma variável chamada x com valor 10 e imprima seu valor.',
    startCode: [
        '# Crie uma variável x com valor 10',
        '# Imprima o valor de x',
        '# Para printar o valor, utilize print(x)',
        '# Output esperado: "10"',
        '',
        '',
    ],
    codeAnswer: [
        'x = 10',
        'print(x)'
    ],
    expectedCodeOutput: '10',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator'
}
const EXERCISE_VARIAVEIS_2: ExerciseData = {
    id: 1,
    name: 'Variáveis 2',
    difficulty: 'Medium',
    question: 'Crie uma variável do tipo "lista" com os valores: 1, 2, 3 e imprima a lista criada.',
    startCode: [
        '# Crie uma variável do tipo lista com os valores: 1, 2, 3',
        '# Imprima a lista criada',
        '# Output esperado: "[1, 2, 3]"',
        '',
        '',
    ],
    codeAnswer: [
        'lista = [1,2,3]',
        'print(lista)'
    ],
    expectedCodeOutput: '[1, 2, 3]',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator'
}
const EXERCISE_VARIAVEIS_3: ExerciseData = {
    id: 2,
    name: 'Variáveis 3',
    difficulty: 'Hard',
    question: 'Crie três variáveis do tipo string com os valores "estudo", "de" e "programação", e imprima uma frase com essas três strings ao mesmo tempo.',
    startCode: [
        '# Crie três variáveis do tipo string com os valores "estudo", "de" e "programação"',
        '# Imprima uma frase com essas três strings ao mesmo tempo',
        '# Output esperado: "estudo de programação"',
        '',
        '',
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
}


const EXERCISE_ARRAYS_1: ExerciseData = {
    id: 3,
    name: 'Arrays 1',
    difficulty: 'Easy',
    question: 'Dado um array [1,2,3,4,5], some todos os seus elementos e printe o resultado (não use a função "sum" do Python).',
    startCode: [
        '# Some todos os valores do array',
        '# Imprima o valor da soma',
        '# Output esperado: "15"',
        '',
        'array = [1,2,3,4,5]',
        '',
        '',
    ],
    codeAnswer: [
        'total = 0',
        'for value in array:',
        '  total += value',
        'print(total)'
    ],
    expectedCodeOutput: '15',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements'
}

const EXERCISE_ARRAYS_2: ExerciseData = {
    id: 4,
    name: 'Arrays 2',
    difficulty: 'Medium',
    question: 'Dado um array [10, 5, 22, 37, 18, 40, 29, 12], imprima apenas o maior valor do array (não use a função max).',
    startCode: [
        '# Encontre o maior valor do array',
        '# Imprima o maior valor',
        '# Output esperado: "40"',
        '',
        'array = [10, 5, 22, 37, 18, 40, 29, 12]',
        '',
        '',
    ],
    codeAnswer: [
        'maior = array[0]',
        'for value in array:',
        '  if value > maior:',
        '    maior = value',
        'print(maior)'
    ],
    expectedCodeOutput: '40',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements'
}

const EXERCISE_ARRAYS_3: ExerciseData = {
    id: 5,
    name: 'Arrays 4',
    difficulty: 'Hard',
    question: 'Dado um array [3, 5, 3, 2, 5, 1], crie um novo array contendo apenas os valores únicos, mantendo a ordem original, e imprima o resultado (não use set).',
    startCode: [
        '# Crie um novo array apenas com valores únicos',
        '# Mantenha a ordem original',
        '# Não use set',
        '# Output esperado: "[3, 5, 2, 1]"',
        '',
        'array = [3, 5, 3, 2, 5, 1]',
        '',
        '',
    ],
    codeAnswer: [
        'unicos = []',
        'for value in array:',
        '  if value not in unicos:',
        '    unicos.append(value)',
        'print(unicos)'
    ],
    expectedCodeOutput: '[3, 5, 2, 1]',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists'
}


const EXERCISE_GENERAL_1: ExerciseData = {
    id: 6,
    name: 'Geral 1',
    difficulty: 'Easy',
    question: 'Crie um programa que verifique se um número N é par ou ímpar e imprima o resultado.',
    startCode: [
        '# Verifique se o número é par ou ímpar',
        '# Se for par, imprima "par"',
        '# Se for ímpar, imprima "ímpar"',
        '# Output esperado para n = 4: "par"',
        '',
        'n = 4',
        '',
        '',
    ],
    codeAnswer: [
        'if n % 2 == 0:',
        '  print("par")',
        'else:',
        '  print("ímpar")'
    ],
    expectedCodeOutput: 'par',
    studyMaterialName: 'w3schools',
    studyMaterialLink: 'https://www.w3schools.com/python/python_operators_arithmetic.asp'
}

const EXERCISE_GENERAL_2: ExerciseData = {
    id: 7,
    name: 'Geral 2',
    difficulty: 'Medium',
    question: 'Crie uma função recursiva que calcule o fatorial de um número inteiro positivo N.',
    startCode: [
        '# Crie uma função recursiva para calcular o fatorial',
        '# Imprima o resultado',
        '# Output esperado para n = 5: "120"',
        '',
        'n = 5',
        '',
        '',
    ],
    codeAnswer: [
        'def fatorial(n):',
        '  if n == 0 or n == 1:',
        '    return 1',
        '  return n * fatorial(n - 1)',
        '',
        'print(fatorial(n))'
    ],
    expectedCodeOutput: '120',
    studyMaterialName: 'datacamp',
    studyMaterialLink: 'https://www.datacamp.com/pt/tutorial/recursion-in-python'
}

const EXERCISE_GENERAL_3: ExerciseData = {
    id: 8,
    name: 'Geral 3',
    difficulty: 'Hard',
    question: 'Dado um número inteiro positivo n, determine se ele é um número primo. Imprima "primo" ou "não primo".',
    startCode: [
        '# Verifique se o número é primo',
        '# Imprima "primo" ou "não primo"',
        '# Output esperado para n = 7: "primo"',
        '',
        'n = 7',
        '',
        '',
    ],
    codeAnswer: [
        'if n <= 1:',
        '  print("não primo")',
        'else:',
        '  primo = True',
        '  for i in range(2, int(n ** 0.5) + 1):',
        '    if n % i == 0:',
        '      primo = False',
        '      break',
        '  print("primo" if primo else "não primo")'
    ],
    expectedCodeOutput: 'primo',
    studyMaterialName: 'docs.python',
    studyMaterialLink: 'https://docs.python.org/3/library/math.html'
}




export const EXERCISE_GROUPS: ExerciseGroup[] = [
    {
        id: 0,
        name: 'Variáveis',
        exercises: [ EXERCISE_VARIAVEIS_1, EXERCISE_VARIAVEIS_2, EXERCISE_VARIAVEIS_3 ]
    },
    {
        id: 1,
        name: 'Arrays',
        exercises: [ EXERCISE_ARRAYS_1, EXERCISE_ARRAYS_2, EXERCISE_ARRAYS_3 ]
    },
    {
        id: 2,
        name: 'Geral',
        exercises: [ EXERCISE_GENERAL_1, EXERCISE_GENERAL_2, EXERCISE_GENERAL_3 ]
    }
]