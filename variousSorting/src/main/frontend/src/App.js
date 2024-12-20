import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button, Select, MenuItem, Slider, TextField, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SortingVisualizer from './SortingVisualizer';
import axios from 'axios';
import './App.css';

// Material-UI 스타일링 컴포넌트 정의
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledControl = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// 사용 가능한 정렬 알고리즘 목록
const algorithmOptions = [
  '선택 정렬', '삽입 정렬', '버블 정렬', '병합 정렬',
  '힙 정렬', '트리 정렬',
];

// 백엔드 API를 호출하여 정렬 단계를 가져오는 함수
const generateSortingSteps = async (algorithm, arr) => {
  try {
    const response = await axios.post(`/api/sorting/${algorithm}`, arr);
    return response.data;
  } catch (error) {
    console.error('Error generating sorting steps:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

const App = () => {
  // 상태 관리를 위한 useState 훅 정의
  const [array, setArray] = useState([]); // 정렬할 배열
  const [algorithm, setAlgorithm] = useState('선택 정렬'); // 선택된 정렬 알고리즘
  const [steps, setSteps] = useState([]); // 정렬 단계들
  const [currentStep, setCurrentStep] = useState(0); // 현재 보여지는 단계
  const [isSorting, setIsSorting] = useState(false); // 정렬 진행 중 여부
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [speed, setSpeed] = useState(50); // 정렬 속도 (0-100)
  const [inputNumber, setInputNumber] = useState(''); // 사용자 입력 숫자

  // 자동 정렬 진행을 위한 useEffect
  useEffect(() => {
    if (isSorting && !isPaused && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000 - speed * 10); // 속도에 따른 타이머 설정
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length) {
      setIsSorting(false);
      setIsPaused(false);
    }
  }, [isSorting, isPaused, currentStep, steps, speed]);

  // 사용자가 입력한 숫자를 배열에 추가하는 함수
  const addNumber = () => {
    if (inputNumber && !isNaN(inputNumber)) {
      setArray([...array, parseInt(inputNumber)]);
      setInputNumber('');
    }
  };

  // 랜덤 숫자를 배열에 추가하는 함수
  const addRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setArray([...array, randomNumber]);
  };

  // 배열에서 특정 인덱스의 숫자를 제거하는 함수
  const removeNumber = (index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  // 정렬을 시작하는 함수
  const startSorting = async () => {
    try {
      const sortingSteps = await generateSortingSteps(algorithm, array);
      console.log('Received sorting steps:', sortingSteps);
      setSteps(sortingSteps);
      setIsSorting(true);
      setIsPaused(false);
      setCurrentStep(0);
    } catch (error) {
      console.error('Error starting sorting:', error);
    }
  };

  // 정렬을 초기화하는 함수
  const resetSorting = () => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSteps([]);
  };

  // 정렬 일시정지/재생 토글 함수
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // 다음 단계로 이동하는 함수
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로 이동하는 함수
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // UI 렌더링
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>정렬 알고리즘 시각화</Typography>
      <Grid container spacing={3}>
        {/* 컨트롤 패널 */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>컨트롤</Typography>
            {/* 알고리즘 선택 드롭다운 */}
            <StyledControl>
              <Select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                fullWidth
              >
                {algorithmOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </StyledControl>
            {/* 숫자 입력 필드 */}
            <StyledControl>
              <TextField
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                type="number"
                label="숫자 입력"
                variant="outlined"
                size="small"
                fullWidth
              />
            </StyledControl>
            {/* 숫자 추가 버튼 */}
            <StyledControl>
              <Button
                variant="contained"
                color="primary"
                onClick={addNumber}
                disabled={isSorting}
                fullWidth
              >
                숫자 추가
              </Button>
            </StyledControl>
            {/* 랜덤 숫자 추가 버튼 */}
            <StyledControl>
              <Button
                variant="contained"
                color="primary"
                onClick={addRandomNumber}
                disabled={isSorting}
                fullWidth
              >
                랜덤 숫자 추가
              </Button>
            </StyledControl>
            {/* 정렬 시작 버튼 */}
            <StyledControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={startSorting}
                fullWidth
                disabled={isSorting || array.length === 0}
              >
                정렬 시작
              </Button>
            </StyledControl>
            {/* 정렬 컨트롤 버튼들 */}
            {isSorting && (
              <StyledControl>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <IconButton onClick={stepBackward} disabled={currentStep === 0}>
                      <SkipPreviousIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={togglePause}>
                      {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={stepForward} disabled={currentStep === steps.length - 1}>
                      <SkipNextIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </StyledControl>
            )}
            {/* 리셋 버튼 */}
            <StyledControl>
              <Button
                variant="contained"
                color="primary"
                onClick={resetSorting}
                fullWidth
              >
                리셋
              </Button>
            </StyledControl>
            {/* 속도 조절 슬라이더 */}
            <Typography gutterBottom>속도</Typography>
            <Slider
              value={speed}
              onChange={(e, newValue) => setSpeed(newValue)}
              aria-labelledby="continuous-slider"
            />
            {/* 현재 배열 표시 */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>현재 배열:</Typography>
            <div>
              {array.map((num, index) => (
                <StyledChip
                  key={index}
                  label={num}
                  onDelete={() => removeNumber(index)}
                  disabled={isSorting}
                  deleteIcon={<ClearIcon />}
                />
              ))}
            </div>
          </StyledPaper>
        </Grid>
        {/* 시각화 영역 */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <SortingVisualizer
              algorithm={algorithm}
              steps={steps}
              currentStep={currentStep}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default App;