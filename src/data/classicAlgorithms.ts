import type { AlgorithmCollection, AlgorithmData } from "../types/classicAlgorithms";


// O(1)
export const SIMPLE_ARITHMETIC_ALGORITHM: AlgorithmData = {
    name: 'Operação Aritmética Simples',
    source: undefined,
    sourceLink: undefined,
    code: [
        "a = 10",
        "b = 5",
        "",
        "def soma(x, y):",
        "  return x + y",
        "",
        "resultado = soma(a, b)",
        "print(\"Resultado da soma:\", resultado)",
    ],
    abstract: `
        Uma operação aritmética simples, como soma, subtração, multiplicação ou divisão,
        executa sempre no mesmo tempo, independentemente do tamanho dos valores envolvidos.
        Por isso, esse tipo de operação possui complexidade O(1), pois não depende de loops
        nem do tamanho da entrada.
    `
}
export const ARRAY_INDEX_ACCESS_ALGORITHM: AlgorithmData = {
    name: 'Acesso a Array por Índice',
    source: 'geeksforgeeks.org',
    sourceLink: 'https://www.geeksforgeeks.org/python/python-arrays/',
    code: [
        "lista = [10, 20, 30, 40, 50]",
        "",
        "def acessar_indice(_lista, indice):",
        "  return _lista[indice]",
        "",
        "valor = acessar_indice(lista, 2)",
        "print(\"Valor no índice 2:\", valor)",
    ],
    abstract: `
        O acesso direto a um elemento de um array por meio de um índice é feito em tempo constante.
        Isso ocorre porque arrays são estruturas de dados contíguas em memória, permitindo que o
        endereço do elemento seja calculado diretamente. Dessa forma, o custo da operação não
        cresce com o tamanho do array, caracterizando complexidade O(1).
    `
}

// O(log n)
export const BINARY_SEARCH_ALGORITHM: AlgorithmData = {
    name: 'Binary Search',
    source: 'w3schools.com',
    sourceLink: 'https://www.w3schools.com/dsa/dsa_algo_binarysearch.php',
    code: [
        "lista = [1, 3, 5, 7, 9, 11, 13]",
        "",
        "def binary_search(_lista, alvo):",
        "  inicio = 0",
        "  fim = len(_lista) - 1",
        "",
        "  while inicio <= fim:",
        "    meio = (inicio + fim) // 2",
        "    if _lista[meio] == alvo:",
        "      return meio",
        "    elif _lista[meio] < alvo:",
        "      inicio = meio + 1",
        "    else:",
        "      fim = meio - 1",
        "",
        "  return -1",
        "",
        "print(binary_search(lista, 7))",
    ],
    abstract: `
        A busca binária localiza um elemento em uma lista ordenada dividindo
        repetidamente o espaço de busca pela metade. A cada iteração, metade
        dos elementos é descartada, resultando em complexidade O(log n).
    `
}
export const HEAP_INSERT_ALGORITHM: AlgorithmData = {
    name: 'Heap Insert (Heapify Up)',
    source: 'geeksforgeeks.org',
    sourceLink: 'https://www.geeksforgeeks.org/insertion-in-a-binary-heap/',
    code: [
        "heap = []",
        "",
        "def heap_insert(_heap, valor):",
        "  _heap.append(valor)",
        "  i = len(_heap) - 1",
        "",
        "  while i > 0:",
        "    pai = (i - 1) // 2",
        "    if _heap[pai] <= _heap[i]:",
        "      break",
        "",
        "    _heap[pai], _heap[i] = _heap[i], _heap[pai]",
        "    i = pai",
        "",
        "heap_insert(heap, 10)",
        "heap_insert(heap, 5)",
        "heap_insert(heap, 20)",
        "heap_insert(heap, 3)",
        "",
        "print(heap)",
    ],
    abstract: `
        A inserção em um heap binário mantém a propriedade do heap
        ajustando o elemento inserido em direção à raiz. Esse processo
        percorre no máximo a altura da árvore, que é logarítmica em
        relação ao número de elementos, resultando em complexidade O(log n).
    `
}

// O(n)
export const LINEAR_SEARCH_ALGORITHM: AlgorithmData = {
    name: 'Linear Search',
    source: 'geeksforgeeks.org',
    sourceLink: 'https://www.geeksforgeeks.org/linear-search/',
    code: [
        "lista = [4, 2, 7, 1, 9]",
        "",
        "def linear_search(_lista, alvo):",
        "  for i in range(len(_lista)):",
        "    if _lista[i] == alvo:",
        "      return i",
        "  return -1",
        "",
        "print(linear_search(lista, 7))",
    ],
    abstract: `
        A busca linear percorre todos os elementos da lista até encontrar
        o valor desejado ou chegar ao final. No pior caso, todos os elementos
        são visitados, caracterizando complexidade O(n).
    `
}
export const ARRAY_SUM_ALGORITHM: AlgorithmData = {
    name: 'Soma de Elementos do Array',
    source: 'w3schools.com',
    sourceLink: 'https://www.w3schools.com/python/python_arrays.asp',
    code: [
        "lista = [1, 2, 3, 4, 5]",
        "",
        "def somar_elementos(_lista):",
        "  total = 0",
        "  for valor in _lista:",
        "    total += valor",
        "  return total",
        "",
        "print(somar_elementos(lista))",
    ],
    abstract: `
        Para calcular a soma de todos os elementos de um array,
        é necessário percorrer cada posição exatamente uma vez.
        Isso resulta em complexidade linear O(n).
    `
}

// O(n log n)
export const QUICK_SORT_ALGORITHM: AlgorithmData = {
    name: 'Quick Sort',
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
}
export const MERGE_SORT_ALGORITHM: AlgorithmData = {
    name: 'Merge Sort',
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

// O(n^2)
export const BUBBLE_SORT_ALGORITHM: AlgorithmData = {
    name: 'Bubble Sort',
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
}
export const SELECTION_SORT_ALGORITHM: AlgorithmData = {
    name: 'Selection Sort',
    source: 'w3schools.com',
    sourceLink: 'https://www.w3schools.com/python/python_dsa_selectionsort.asp',
    code: [
        "lista = [64, 25, 12, 22, 11]",
        "",
        "def selection_sort(_lista):",
        "  n = len(_lista)",
        "  for i in range(n):",
        "    menor = i",
        "    for j in range(i + 1, n):",
        "      if _lista[j] < _lista[menor]:",
        "        menor = j",
        "    _lista[i], _lista[menor] = _lista[menor], _lista[i]",
        "",
        "  return _lista",
        "",
        "print(selection_sort(lista))",
    ],
    abstract: `
        O Selection Sort divide a lista em uma parte ordenada e outra não ordenada.
        A cada iteração, ele procura o menor elemento da parte não ordenada e o
        posiciona corretamente. Como utiliza dois loops aninhados, sua complexidade
        é O(n²).
    `
}





export const CLASSIC_ALGORITHMS: AlgorithmCollection[] = [
    {
        complexity: 'O(1)',
        resume: 'Algoritmos O(1) executam em tempo constante, independentemente do tamanho da entrada. O custo da operação é sempre o mesmo, é o caso ideal.',
        algorithms: [ SIMPLE_ARITHMETIC_ALGORITHM, ARRAY_INDEX_ACCESS_ALGORITHM ]
    },

    {
        complexity: 'O(log n)',
        resume: 'Algoritmos O(log n) reduzem o tamanho do problema a cada passo, normalmente pela metade. Esse comportamento é comum em estruturas hierárquicas e estratégias de divisão.',
        algorithms: [ BINARY_SEARCH_ALGORITHM, HEAP_INSERT_ALGORITHM ]
    },

    {
        complexity: 'O(n)',
        resume: 'Algoritmos O(n) percorrem todos os elementos da entrada uma única vez. O tempo de execução cresce de forma proporcional ao tamanho dos dados.',
        algorithms: [ ARRAY_SUM_ALGORITHM, ARRAY_SUM_ALGORITHM ]
    },
    
    {
        complexity: 'O(n log n)',
        resume: 'Algoritmos O(n log n) combinam divisão do problema com processamento linear. São comuns em algoritmos de ordenação eficientes.',
        algorithms:[ QUICK_SORT_ALGORITHM, MERGE_SORT_ALGORITHM ]
    },
    {
        complexity: 'O(n²)',
        resume: 'Algoritmos O(n²) utilizam loops aninhados para comparar ou processar pares de elementos. Seu custo cresce rapidamente e não escala bem para grandes entradas.',
        algorithms: [ BUBBLE_SORT_ALGORITHM, SELECTION_SORT_ALGORITHM ]
    },    
]