import React, { useState, useEffect } from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import SortingVisualizer from './SortingVisualizer';
import './App.css';

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    if (selectedAlgorithm && numbers.length > 0) {
      const steps = generateSortingSteps(selectedAlgorithm, [...numbers]);
      setSortingSteps(steps);
      setCurrentStep(0);
    }
  }, [selectedAlgorithm, numbers]);

  const generateSortingSteps = (algorithm, arr) => {
    switch (algorithm) {
      case '선택 정렬': return selectionSort(arr);
      case '삽입 정렬': return insertionSort(arr);
      case '버블 정렬': return bubbleSort(arr);
      case '병합 정렬': return mergeSort(arr);
      case '힙 정렬': return heapSort(arr);
      case '퀵 정렬': return quickSort(arr);
      case '트리 정렬': return treeSort(arr);
      case '팀 정렬': return timSort(arr);
      default: return [];
    }
  };

  const addNumber = (num) => {
    setNumbers(prev => [...prev, num]);
  };

  const addRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    addNumber(randomNum);
  };

  const removeNumber = (index) => {
    setNumbers(prev => prev.filter((_, i) => i !== index));
  };

  const resetAlgorithm = () => {
    setShowPopup(true);
    setSelectedAlgorithm('');
    setSortingSteps([]);
    setCurrentStep(0);
  };

  return (
    <div className="app">
      {showPopup && (
        <AlgorithmSelector
          onSelect={(algorithm) => {
            setSelectedAlgorithm(algorithm);
            setShowPopup(false);
          }}
        />
      )}
      {!showPopup && (
        <>
          <div className="number-input">
            <input
              type="number"
              placeholder="숫자 입력"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addNumber(parseInt(e.target.value));
                  e.target.value = '';
                }
              }}
            />
            <button onClick={addRandomNumber}>랜덤 숫자 추가</button>
          </div>
          <div className="current-numbers">
            현재 숫자:
            {numbers.map((num, index) => (
              <span key={index} className="number-tag">
                {num}
                <button onClick={() => removeNumber(index)}>×</button>
              </span>
            ))}
          </div>
          <SortingVisualizer
            algorithm={selectedAlgorithm}
            steps={sortingSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <button className="reset-button" onClick={resetAlgorithm}>정렬 다시 선택</button>
        </>
      )}
    </div>
  );
};

const selectionSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      array: [...arr],
      activeIndices: [i],
      variables: { i, minIdx },
      description: `현재 인덱스 i=${i}에서 시작합니다. 최소값의 인덱스 minIdx=${minIdx}로 초기화합니다.`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [minIdx, j],
        variables: { i, j, minIdx },
        description: `현재 값 arr[${j}]=${arr[j]}와 최소값 arr[${minIdx}]=${arr[minIdx]}를 비교합니다.`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          activeIndices: [minIdx],
          variables: { i, j, minIdx },
          description: `새로운 최소값을 찾았습니다. minIdx를 ${j}로 업데이트합니다.`
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        activeIndices: [i, minIdx],
        variables: { i, minIdx },
        description: `arr[${i}]와 arr[${minIdx}]의 위치를 교환합니다.`
      });
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const insertionSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      activeIndices: [i],
      variables: { i, key, j },
      description: `현재 키 값 key=${key}를 선택합니다. j=${j}부터 비교를 시작합니다.`
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        variables: { i, key, j },
        description: `arr[${j}]=${arr[j]}를 오른쪽으로 이동합니다.`
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      activeIndices: [j + 1],
      variables: { i, key, j },
      description: `key=${key}를 arr[${j + 1}]에 삽입합니다.`
    });
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const bubbleSort = (arr) => {
  const steps = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        variables: { i, j },
        description: `arr[${j}]=${arr[j]}와 arr[${j + 1}]=${arr[j + 1]}를 비교합니다.`
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          variables: { i, j },
          description: `arr[${j}]와 arr[${j + 1}]의 위치를 교환합니다.`
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const mergeSort = (arr) => {
  const steps = [];

  const merge = (left, right) => {
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
        array: [...arr.slice(0, leftIndex + rightIndex), ...result, ...left.slice(leftIndex), ...right.slice(rightIndex)],
        activeIndices: [leftIndex + rightIndex],
        variables: { leftIndex, rightIndex },
        description: `${result[result.length - 1]}을 결과 배열에 추가합니다.`
      });
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSortRecursive = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    steps.push({
      array: [...arr],
      activeIndices: [],
      variables: { mid },
      description: `배열을 ${mid} 인덱스를 기준으로 분할합니다.`
    });

    return merge(mergeSortRecursive(left), mergeSortRecursive(right));
  };

  const sorted = mergeSortRecursive(arr);
  arr.splice(0, arr.length, ...sorted);

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const heapSort = (arr) => {
  const steps = [];

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        array: [...arr],
        activeIndices: [i, largest],
        variables: { i, largest },
        description: `arr[${i}]=${arr[i]}와 arr[${largest}]=${arr[largest]}의 위치를 교환합니다.`
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  };

  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...arr],
      activeIndices: [0, i],
      variables: { i },
      description: `루트 노드 arr[0]=${arr[0]}를 마지막 요소 arr[${i}]=${arr[i]}와 교환합니다.`
    });

    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const quickSort = (arr) => {
  const steps = [];

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      activeIndices: [high],
      variables: { pivot, low, high },
      description: `피벗을 arr[${high}]=${pivot}로 선택합니다.`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, high],
        variables: { pivot, i, j },
        description: `arr[${j}]=${arr[j]}를 피벗 ${pivot}과 비교합니다.`
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          activeIndices: [i, j],
          variables: { pivot, i, j },
          description: `arr[${i}]=${arr[i]}와 arr[${j}]=${arr[j]}의 위치를 교환합니다.`
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      activeIndices: [i + 1, high],
      variables: { pivot, i },
      description: `피벗을 올바른 위치로 이동합니다.`
    });

    return i + 1;
  };

  const quickSortRecursive = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  };

  quickSortRecursive(0, arr.length - 1);

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const treeSort = (arr) => {
  const steps = [];

  class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  const insert = (root, key) => {
    if (root === null) {
      root = new Node(key);
      steps.push({
        array: [...arr],
        activeIndices: [arr.indexOf(key)],
        variables: { key },
        description: `${key}를 트리에 삽입합니다.`
      });
      return root;
    }

    if (key < root.data) {
      root.left = insert(root.left, key);
    } else if (key > root.data) {
      root.right = insert(root.right, key);
    }

    return root;
  };

  const inorderTraversal = (root, result) => {
    if (root !== null) {
      inorderTraversal(root.left, result);
      result.push(root.data);
      steps.push({
        array: [...result, ...arr.slice(result.length)],
        activeIndices: [result.length - 1],
        variables: { current: root.data },
        description: `${root.data}를 결과 배열에 추가합니다.`
      });
      inorderTraversal(root.right, result);
    }
  };

  let root = null;
  for (let i = 0; i < arr.length; i++) {
    root = insert(root, arr[i]);
  }

  const sortedArr = [];
  inorderTraversal(root, sortedArr);

  arr.splice(0, arr.length, ...sortedArr);

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

const timSort = (arr) => {
  const steps = [];
  const RUN = 32;
  const n = arr.length;

  const insertionSort = (arr, left, right) => {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
      steps.push({
        array: [...arr],
        activeIndices: [j + 1],
        variables: { i, j, temp },
        description: `${temp}를 ${j + 2}번째 위치에 삽입했습니다.`
      });
    }
  };

  const merge = (arr, l, m, r) => {
    const len1 = m - l + 1, len2 = r - m;
    const left = new Array(len1), right = new Array(len2);
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
        activeIndices: [k],
        variables: { i, j, k },
        description: `${arr[k]}를 ${k + 1}번째 위치에 병합했습니다.`
      });
      k++;
    }

    while (i < len1) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        activeIndices: [k],
        variables: { i, k },
        description: `${arr[k]}를 ${k + 1}번째 위치에 병합했습니다.`
      });
      i++;
      k++;
    }

    while (j < len2) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        activeIndices: [k],
        variables: { j, k },
        description: `${arr[k]}를 ${k + 1}번째 위치에 병합했습니다.`
      });
      j++;
      k++;
    }
  };

  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min((i + RUN - 1), (n - 1)));
  }

  for (let size = RUN; size < n; size = 2 * size) {
    for (let start = 0; start < n; start += 2 * size) {
      const mid = start + size - 1;
      const end = Math.min((start + 2 * size - 1), (n - 1));
      merge(arr, start, mid, end);
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    variables: {},
    description: '정렬이 완료되었습니다.'
  });

  return steps;
};

export default App;