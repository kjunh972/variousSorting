import React from 'react';
import './AlgorithmSelector.css';

const algorithms = [
  '선택 정렬', '삽입 정렬', '버블 정렬', '병합 정렬',
  '힙 정렬', '퀵 정렬', '트리 정렬', '팀 정렬'
];

const AlgorithmSelector = ({ onSelect }) => {
  return (
    <div className="algorithm-selector-popup">
      <div className="popup-content">
        <h2>정렬 알고리즘 선택</h2>
        <div className="algorithm-list">
          {algorithms.map((algo) => (
            <button key={algo} onClick={() => onSelect(algo)}>
              {algo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;