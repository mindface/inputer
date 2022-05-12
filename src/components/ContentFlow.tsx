import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import ContentFlowStep from "./ContentFlowStep";

type propsSet = {
  phase:number;
}

const OuterComponent = styled('div')({
  width: '100%%',
  p: 6,
  color: 'white',
});


function ContentFlow(props:propsSet) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    if(props.phase === 0) setSteps(['計画', '実行', '目的を達成 ']);
    if(props.phase === 1) setSteps(['計画', '実行', 'フィードバック', '調整モデル', '目的に対する実行評価']);
    if(props.phase === 2) setSteps(['計画', '実行', '観察と実行の繰り返し', '調整方法で言葉と結果を調整', 'フィードバック']);
  },[props.phase])

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const stepClear = () => {
    setCompleted({});
  }

  return (
    <Box sx={{ width: '100%', overflow: 'scroll'}}>
      <OuterComponent>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            
            <ContentFlowStep phase={props.phase} viewnumber={activeStep} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
            </Box>
            <Box sx={{ flex: '1 1 auto' }} >
              <Button onClick={stepClear} sx={{ mr: 1 }}>
                Step Reset
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} すでにクリア
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'ステップをクリア済みにする'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      </OuterComponent>
    </Box>
  );
}

export default ContentFlow
