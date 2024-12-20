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

const algorithmOptions = [
  '선택 정렬', '삽입 정렬', '버블 정렬', '병합 정렬',
  '힙 정렬', '트리 정렬',
];

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
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('선택 정렬');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [inputNumber, setInputNumber] = useState('');

  useEffect(() => {
    if (isSorting && !isPaused && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1000 - speed * 10);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length) {
      setIsSorting(false);
      setIsPaused(false);
    }
  }, [isSorting, isPaused, currentStep, steps, speed]);

  const addNumber = () => {
    if (inputNumber && !isNaN(inputNumber)) {
      setArray([...array, parseInt(inputNumber)]);
      setInputNumber('');
    }
  };

  const addRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setArray([...array, randomNumber]);
  };

  const removeNumber = (index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

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

  const resetSorting = () => {
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setArray([]);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>정렬 알고리즘 시각화</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>컨트롤</Typography>
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
            <Typography gutterBottom>속도</Typography>
            <Slider
              value={speed}
              onChange={(e, newValue) => setSpeed(newValue)}
              aria-labelledby="continuous-slider"
            />
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