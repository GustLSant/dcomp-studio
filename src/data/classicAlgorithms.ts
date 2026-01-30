import type { AlgorithmData } from "../types/classicAlgorithms";

export const CLASSIC_ALGORITHMS: AlgorithmData[] = [
    {
        name: 'Bubble Sort',
        complexity: 'O(n²)',
        source: 'medium.com',
        sourceLink: 'https://medium.com/@josianebarros/bubble-sort-defini%C3%A7%C3%A3o-e-exemplo-em-python-d7f2939d5b2e',
        code: [
            "lista = [5,4,3,2,1]",
            "",
            "def bubble_sort(_lista):",
            "  n = len(_lista)",
            "  for i in range(n):",
            "    for j in range(0, n - i - 1):",
            "        if _lista[j] > _lista[j + 1]:",
            "          _lista[j], _lista[j + 1] = _lista[j + 1], _lista[j]",
            "  return _lista",
            "",
            "print(\"Lista ordenada:\", bubble_sort(lista))",
        ],
        abstract: `O Bubble Sort é um algoritmo de ordenação que percorre repetidamente a 
            lista comparando cada par de elementos adjacentes e trocando-os se estiverem fora de ordem. 
            A cada iteração da lista, o maior elemento entre os valores ainda não ordenados "sobe" para o final. 
            Esse processo de comparação e troca continua até que a lista esteja completamente ordenada em ordem crescente.
        `
    },
    {
        name: 'Quick Sort',
        complexity: 'O(n log n)',
        source: 'w3schools.com',
        sourceLink: 'https://www.w3schools.com/python/python_dsa_quicksort.asp',
        code: [
            "lista = [64, 34, 25, 5, 22, 11, 90, 12]",
            "",
            "def particionar(_vetor, _inicio, _fim):",
            "  pivo = _vetor[_fim]",
            "  i = _inicio - 1",
            "",
            "  for j in range(_inicio, _fim):",
            "    if _vetor[j] <= pivo:",
            "      i += 1",
            "      _vetor[i], _vetor[j] = _vetor[j], _vetor[i]",
            "",
            "  _vetor[i + 1], _vetor[_fim] = _vetor[_fim], _vetor[i + 1]",
            "  return i + 1",
            "",
            "def quicksort(_vetor, _inicio=0, _fim=None):",
            "  if _fim is None:",
            "    _fim = len(_vetor) - 1",
            "",
            "  if _inicio < _fim:",
            "    indice_pivo = particionar(_vetor, _inicio, _fim)",
            "    quicksort(_vetor, _inicio, indice_pivo - 1)",
            "    quicksort(_vetor, indice_pivo + 1, _fim)",
            "",
            "quicksort(lista)",
            "print(\"Lista ordenada:\", lista)",
        ],
        abstract: `O Quicksort é um algoritmo de ordenação rápido que funciona 
            usando a estratégia dividir e conquistar. Ele escolhe um valor da lista 
            como pivô (no exemplo de W3Schools, normalmente o último elemento) e reorganiza 
            a lista para que todos os valores menores que o pivô fiquem à esquerda e 
            os maiores à direita. Depois disso, o algoritmo chama a si mesmo recursivamente 
            para ordenar as duas partes à esquerda e à direita do pivô até que toda a lista 
            esteja ordenada.
        `
    },
    {
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        source: 'w3schools.com',
        sourceLink: 'https://www.w3schools.com/python/python_dsa_mergesort.asp',
        code: [
            "lista = [3, 7, 6, -10, 15, 23.5, 55, -13]",
            "",
            "def merge_sort(_lista):",
            "  if len(_lista) <= 1:",
            "    return _lista",
            "",
            "  meio = len(_lista) // 2",
            "  metade_esquerda = _lista[:meio]",
            "  metade_direita = _lista[meio:]",
            "",
            "  ordenados_esquerda = merge_sort(metade_esquerda)",
            "  ordenados_direita = merge_sort(metade_direita)",
            "",
            "  return mesclar(ordenados_esquerda, ordenados_direita)",
            "",
            "def mesclar(_esquerda, _direita):",
            "  resultado = []",
            "  i = j = 0",
            "",
            "  while i < len(_esquerda) and j < len(_direita):",
            "    if _esquerda[i] < _direita[j]:",
            "      resultado.append(_esquerda[i])",
            "      i += 1",
            "    else:",
            "      resultado.append(_direita[j])",
            "      j += 1",
            "",
            "  resultado.extend(_esquerda[i:])",
            "  resultado.extend(_direita[j:])",
            "",
            "  return resultado",
            "",
            "lista_ordenada = merge_sort(lista)",
            "print(\"Lista ordenada:\", lista_ordenada)",
        ],
        abstract: `
            O Merge Sort é um algoritmo de ordenação que usa a 
            técnica dividir e conquistar para ordenar um array. Primeiro ele divide 
            recursivamente o array em duas metades até que cada subarray tenha no 
            máximo um elemento (que já é considerado ordenado). Depois ele conquista 
            juntando essas pequenas partes em uma nova lista ordenada, comparando 
            elementos das duas metades e sempre escolhendo o menor para construir 
            o array final. Esse processo de divisão e mesclagem continua até que toda 
            a lista esteja ordenada.
        `
    }
]