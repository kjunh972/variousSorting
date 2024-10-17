import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const variableDescriptions = {
  i: "현재 기준 인덱스",
  j: "비교 대상 인덱스",
  key: "삽입할 현재 값",
  minIdx: "현재까지의 최소값 인덱스",
  pivot: "퀵정렬의 기준값",
  left: "왼쪽 포인터",
  right: "오른쪽 포인터",
  mid: "중간 인덱스",
};

const SortingVisualizer = ({ algorithm, steps, currentStep, setCurrentStep }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showVariableInfo, setShowVariableInfo] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps, playbackSpeed, setCurrentStep]);

  const currentStepData = steps[currentStep] || { array: [], description: '', variables: {} };

  return (
    <div className="sorting-visualizer">
      <h2>{algorithm} 시각화</h2>
      <div className="array-container">
        {currentStepData.array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar ${currentStepData.activeIndices.includes(idx) ? 'active' : ''}`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="variables-container">
        <h3>현재 변수 <button className="info-button" onClick={() => setShowVariableInfo(!showVariableInfo)}>?</button></h3>
        <div className="variables">
          {Object.entries(currentStepData.variables).map(([key, value]) => (
            <span key={key} className="variable">
              {key}: {value}
            </span>
          ))}
        </div>
        {showVariableInfo && (
          <div className="variable-info">
            {Object.entries(variableDescriptions).map(([key, description]) => (
              <p key={key}><strong>{key}</strong>: {description}</p>
            ))}
          </div>
        )}
      </div>
      <div className="description">{currentStepData.description}</div>
      <div className="controls">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>이전</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? '일시정지' : '재생'}
        </button>
        <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>다음</button>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.5"
          value={playbackSpeed}
          onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
        />
        <span>재생 속도: {playbackSpeed}x</span>
      </div>
    </div>
  );
};

export default SortingVisualizer;