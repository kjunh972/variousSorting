import React, { useState, useEffect } from 'react';
import SortingVisualizer from './SortingVisualizer';
import { generateSortingSteps } from './sortingAlgorithms';
import './App.css';

const algorithmOptions = [
  '선택 정렬', '삽입 정렬', '버블 정렬', '병합 정렬',
  '힙 정렬', '퀵 정렬', '트리 정렬', '팀 정렬'
];

const algorithmDescriptions = {
  '선택 정렬': "배열을 순회하면서 가장 작은 원소를 찾아 맨 앞으로 이동시키는 방식으로 정렬합니다.",
  '삽입 정렬': "배열의 각 원소를 이미 정렬된 부분 배열의 적절한 위치에 삽입하여 정렬합니다.",
  '버블 정렬': "인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 과정을 반복하여 정렬합니다.",
  '병합 정렬': "배열을 반으로 나누고, 각 부분을 정렬한 후 병합하는 과정을 재귀적으로 수행합니다.",
  '힙 정렬': "배열을 최대 힙으로 구성한 후, 루트 노드와 마지막 노드를 교환하며 정렬합니다.",
  '퀵 정렬': "피벗을 선택하고 피벗보다 작은 값과 큰 값을 분할한 후, 각 부분을 재귀적으로 정렬합니다.",
  '트리 정렬': "이진 검색 트리를 구성하고 중위 순회하여 정렬된 결과를 얻습니다.",
  '팀 정렬': "작은 부분에는 삽입 정렬을, 큰 부분에는 병합 정렬을 사용하는 하이브리드 정렬 알고리즘입니다."
};

const variableDescriptions = {
  i: "현재 기준 인덱스",
  j: "비교 대상 인덱스",
  key: "삽입할 현재 값",
  minIdx: "현재까지의 최소값 인덱스",
  pivot: "퀵정렬의 기준값",
  left: "왼쪽 포인터 또는 왼쪽 부분 배열",
  right: "오른쪽 포인터 또는 오른쪽 부분 배열",
  mid: "중간 인덱스",
  temp: "임시 저장 변수",
  root: "현재 노드의 값",
  low: "현재 부분 배열의 시작 인덱스",
  high: "현재 부분 배열의 끝 인덱스",
  l: "왼쪽 부분 배열의 시작 인덱스",
  m: "중간 인덱스",
  r: "오른쪽 부분 배열의 끝 인덱스",
  RUN: "삽입 정렬을 수행할 부분 배열의 크기"
};

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
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

  const addNumber = (num) => {
    if (!isNaN(num) && num !== '') {
      setNumbers(prev => [...prev, parseInt(num)]);
    }
  };

  const addRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    addNumber(randomNum);
  };

  const removeNumber = (index) => {
    setNumbers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>정렬 알고리즘 선택</h2>
        <div className="algorithm-buttons">
          {algorithmOptions.map(algo => (
            <button
              key={algo}
              onClick={() => setSelectedAlgorithm(algo)}
              className={selectedAlgorithm === algo ? 'selected' : ''}
            >
              {algo}
            </button>
          ))}
        </div>
        <div className="number-input">
          <input
            type="number"
            placeholder="숫자 입력"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addNumber(e.target.value);
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
      </div>
      <div className="main-content">
        <SortingVisualizer
          algorithm={selectedAlgorithm}
          steps={sortingSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          algorithmDescription={algorithmDescriptions[selectedAlgorithm]}
          variableDescriptions={variableDescriptions}
        />
      </div>
    </div>
  );
};

export default App;