import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = ({
  algorithm,
  steps,
  currentStep,
  setCurrentStep,
  algorithmDescription,
  variableDescriptions
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

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
      <div className="main-panel">
        <h2>{algorithm} 시각화</h2>
        <div className="algorithm-description">
          <h3>알고리즘 설명</h3>
          <p>{algorithmDescription}</p>
        </div>
        <div className="visualization-area">
          <div className="array-container">
            {currentStepData.array.map((value, idx) => (
              <div
                key={idx}
                className={`array-bar ${currentStepData.activeIndices?.includes(idx) ? 'active' : ''}`}
                style={{ height: `${value * 3}px` }}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="step-description">
            <h3>현재 단계 설명</h3>
            <p>{currentStepData.description}</p>
          </div>
          <div className="current-variables">
            <h3>현재 변수 값</h3>
            <div className="variables-grid">
              {Object.entries(currentStepData.variables || {}).map(([key, value]) => (
                <div key={key} className="variable-item">
                  <span className="variable-name">{key}:</span>
                  <span className="variable-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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