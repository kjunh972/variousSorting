export const generateSortingSteps = (algorithm, arr) => {
  switch (algorithm) {
    case '선택 정렬':
      return selectionSort([...arr]);
    case '삽입 정렬':
      return insertionSort([...arr]);
    case '버블 정렬':
      return bubbleSort([...arr]);
    case '병합 정렬':
      return mergeSort([...arr]);
    case '힙 정렬':
      return heapSort([...arr]);
    case '퀵 정렬':
      return quickSort([...arr]);
    case '트리 정렬':
      return treeSort([...arr]);
    case '팀 정렬':
      return timSort([...arr]);
    default:
      return [];
  }
};

// 선택 정렬
const selectionSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      array: [...arr],
      description: `${i+1}번째 패스: 인덱스 ${i}부터 최소값을 찾기 시작합니다.`,
      variables: { i, minIdx }
    });

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          description: `새로운 최소값 ${arr[minIdx]}을(를) 인덱스 ${minIdx}에서 찾았습니다.`,
          variables: { i, j, minIdx },
          activeIndices: [i, j, minIdx]
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        description: `${arr[i]}과(와) ${arr[minIdx]}을(를) 교환했습니다.`,
        variables: { i, minIdx },
        activeIndices: [i, minIdx]
      });
    } else {
      steps.push({
        array: [...arr],
        description: `${arr[i]}이(가) 이미 올바른 위치에 있습니다.`,
        variables: { i, minIdx }
      });
    }
  }

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 삽입 정렬
const insertionSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      description: `${i}번째 원소 ${key}를 정렬된 부분에 삽입하기 시작합니다.`,
      variables: { i, key, j },
      activeIndices: [i]
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;

      steps.push({
        array: [...arr],
        description: `${arr[j+1]}을(를) 오른쪽으로 이동시킵니다.`,
        variables: { i, key, j },
        activeIndices: [j, j+1]
      });
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      description: `${key}를 인덱스 ${j+1}에 삽입했습니다.`,
      variables: { i, key, j },
      activeIndices: [j+1]
    });
  }

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 버블 정렬
const bubbleSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    steps.push({
      array: [...arr],
      description: `${i+1}번째 패스를 시작합니다.`,
      variables: { i }
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        description: `${arr[j]}와(과) ${arr[j+1]}을(를) 비교합니다.`,
        variables: { i, j },
        activeIndices: [j, j+1]
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          array: [...arr],
          description: `${arr[j]}와(과) ${arr[j+1]}을(를) 교환했습니다.`,
          variables: { i, j },
          activeIndices: [j, j+1]
        });
      }
    }

    if (!swapped) {
      steps.push({
        array: [...arr],
        description: "배열이 이미 정렬되어 있어 정렬을 종료합니다.",
        variables: { i }
      });
      break;
    }
  }

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 병합 정렬
const mergeSort = (arr) => {
  const steps = [];

  const merge = (left, right, start) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      steps.push({
        array: [...arr.slice(0, start), ...result, ...left.slice(leftIndex), ...right.slice(rightIndex), ...arr.slice(start + left.length + right.length)],
        description: `${result[result.length - 1]}을(를) 결과 배열에 추가했습니다.`,
        variables: { leftIndex, rightIndex },
        activeIndices: [start + result.length - 1]
      });
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSortHelper = (arr, start = 0) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    steps.push({
      array: [...arr],
      description: `배열을 ${left}와(과) ${right} 두 부분으로 나눕니다.`,
      variables: { mid },
      activeIndices: [start, start + arr.length - 1]
    });

    return merge(mergeSortHelper(left, start), mergeSortHelper(right, start + mid), start);
  };

  const sorted = mergeSortHelper(arr);
  arr.splice(0, arr.length, ...sorted);

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 힙 정렬
const heapSort = (arr) => {
  const steps = [];

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      array: [...arr],
      description: `힙을 구성합니다. 현재 노드: ${arr[i]}, 왼쪽 자식: ${arr[left]}, 오른쪽 자식: ${arr[right]}`,
      variables: { i, largest, left, right },
      activeIndices: [i, left, right].filter(idx => idx < n)
    });

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        array: [...arr],
        description: `${arr[i]}와(과) ${arr[largest]}을(를) 교환했습니다.`,
        variables: { i, largest },
        activeIndices: [i, largest]
      });

      heapify(n, largest);
    }
  };

  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    steps.push({
      array: [...arr],
      description: `최대값 ${arr[i]}을(를) 배열의 끝으로 이동시킵니다.`,
      variables: { i },
      activeIndices: [0, i]
    });

    heapify(i, 0);
  }

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 퀵 정렬
const quickSort = (arr) => {
  const steps = [];

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      description: `피벗으로 ${pivot}을(를) 선택했습니다.`,
      variables: { low, high, pivot },
      activeIndices: [high]
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        description: `${arr[j]}와(과) 피벗 ${pivot}을(를) 비교합니다.`,
        variables: { i, j, pivot },
        activeIndices: [j, high]
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          array: [...arr],
          description: `${arr[i]}와(과) ${arr[j]}을(를) 교환했습니다.`,
          variables: { i, j },
          activeIndices: [i, j]
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: [...arr],
      description: `피벗 ${pivot}을(를) 올바른 위치로 이동시켰습니다.`,
      variables: { i },
      activeIndices: [i + 1, high]
    });

    return i + 1;
  };

  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    description: "정렬이 완료되었습니다.",
    variables: {}
  });

  return steps;
};

// 트리 정렬
const treeSort = (arr) => {
  const steps = [];

  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  const insert = (root, value) => {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.value) {
      steps.push({
        array: [...arr],
        description: `${value}를 ${root.value}의 왼쪽에 삽입합니다.`,
        variables: { value, root: root.value },
      });
      root.left = insert(root.left, value);
    } else {
      steps.push({
        array: [...arr],
        description: `${value}를 ${root.value}의 오른쪽에 삽입합니다.`,
        variables: { value, root: root.value },
      });
      root.right = insert(root.right, value);
    }

    return root;
  };

  const inorderTraversal = (root, result) => {
    if (root !== null) {
      inorderTraversal(root.left, result);
      result.push(root.value);
      steps.push({
        array: [...result, ...arr.slice(result.length)],
        description: `${root.value}를 결과 배열에 추가합니다.`,
        variables: { current: root.value },
      });
      inorderTraversal(root.right, result);
    }
  };

  let root = null;
  for (let i = 0; i < arr.length; i++) {
    root = insert(root, arr[i]);
  }

  const result = [];
  inorderTraversal(root, result);

  steps.push({
    array: [...result],
    description: "트리 정렬이 완료되었습니다.",
    variables: {},
  });

  return steps;
};

// 팀 정렬
const timSort = (arr) => {
  const steps = [];
  const RUN = 32;

  const insertionSort = (arr, left, right) => {
    for (let i = left + 1; i <= right; i++) {
      let temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
      steps.push({
        array: [...arr],
        description: `${temp}를 인덱스 ${j + 1}에 삽입했습니다.`,
        variables: { left, right, i, j, temp },
        activeIndices: [j + 1],
      });
    }
  };

  const merge = (arr, l, m, r) => {
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1), right = new Array(len2);
    for (let x = 0; x < len1; x++) {
      left[x] = arr[l + x];
    }
    for (let x = 0; x < len2; x++) {
      right[x] = arr[m + 1 + x];
    }

    let i = 0, j = 0, k = l;

    while (i < len1 && j < len2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      steps.push({
        array: [...arr],
        description: `${arr[k]}를 병합된 배열에 추가했습니다.`,
        variables: { l, m, r, i, j, k },
        activeIndices: [k],
      });
      k++;
    }

    while (i < len1) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        description: `왼쪽 배열의 남은 요소 ${arr[k]}를 추가했습니다.`,
        variables: { k, i },
        activeIndices: [k],
      });
      k++;
      i++;
    }

    while (j < len2) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        description: `오른쪽 배열의 남은 요소 ${arr[k]}를 추가했습니다.`,
        variables: { k, j },
        activeIndices: [k],
      });
      k++;
      j++;
    }
  };

  for (let i = 0; i < arr.length; i += RUN) {
    insertionSort(arr, i, Math.min((i + RUN - 1), (arr.length - 1)));
  }

  for (let size = RUN; size < arr.length; size = 2 * size) {
    for (let start = 0; start < arr.length; start += 2 * size) {
      let mid = start + size - 1;
      let end = Math.min((start + 2 * size - 1), (arr.length - 1));

      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
  }

  steps.push({
    array: [...arr],
    description: "팀 정렬이 완료되었습니다.",
    variables: {},
  });

  return steps;
};