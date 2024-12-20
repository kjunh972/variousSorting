import React from 'react';
import './SortingVisualizer.css';

const SortingSteps = {
  '선택 정렬': "배열을 순회하면서 가장 작은 원소를 찾아 맨 앞으로 이동시키는 방식으로 정렬합니다.",
  '삽입 정렬': "배열의 각 원소를 이미 정렬된 부분 배열의 적절한 위치에 삽입하여 정렬합니다.",
  '버블 정렬': "인접한 두 원소를 비교하여 큰 값을 뒤로 보내는 과정을 반복하여 정렬합니다.",
  '병합 정렬': "배열을 반으로 나누고, 각 부분을 정렬한 후 병합하는 과정을 재귀적으로 수행합니다.",
  '힙 정렬': "배열을 최대 힙으로 구성한 후, 루트 노드와 마지막 노드를 교환하며 정렬합니다.",
  '트리 정렬': "이진 탐색 트리를 구성한 후, 중위 순회하여 정렬된 결과를 얻습니다."
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

const SortingVisualizer = ({
  algorithm,
  steps,
  currentStep,
}) => {
  const currentStepData = (steps && steps.length > 0 && steps[currentStep]) || {
    numbers: [],
    stepDescription: '정렬을 시작해 주세요.',
    variables: {}
  };

  return (
    <div className="sorting-visualizer">
      <div className="main-panel">
        <h2>{algorithm || '알고리즘'} 시각화</h2>
        <div className="algorithm-description">
          <h3>알고리즘 설명</h3>
          <p>{SortingSteps[algorithm] || '알고리즘이 선택되지 않았습니다.'}</p>
        </div>
        <div className="visualization-area">
          <div className="array-container">
            {currentStepData.numbers && currentStepData.numbers.map((value, idx) => (
              <div
                key={idx}
                className={`array-bar ${currentStepData.activeIndices?.includes(idx) ? 'active' : ''}`}
                style={{
                  height: `${value * 3}px`,
                  backgroundColor: currentStepData.activeIndices?.includes(idx) ? '#ff6b6b' : '#3498db'
                }}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="step-description">
            <h3>현재 단계 설명</h3>
            <p>{currentStepData.stepDescription}</p>
          </div>
          <div className="current-variables">
            <h3>현재 변수 값</h3>
            <div className="variables-grid">
              {Object.entries(currentStepData.variables || {}).map(([key, value]) => (
                <div key={key} className="variable-item">
                  <span className="variable-name">{key}:</span>
                  <span className="variable-value">{value !== undefined ? value.toString() : 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="side-panel">
        <div className="variables-info">
          <h3>변수 설명</h3>
          <div className="variables-list">
            {Object.entries(variableDescriptions).map(([key, description]) => (
              <div key={key} className="variable-item">
                <span className="variable-name">{key}:</span>
                <span className="variable-description">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;