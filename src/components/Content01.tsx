import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Content01Card01 from "./Content01Card01";
import Content01Card02 from "./Content01Card02";
import Content01Card03 from "./Content01Card03";
import Content01Card04 from "./Content01Card04";
import Content01Card05 from "./Content01Card05";
import Content01Card06 from "./Content01Card06";

import { AddAnalyData } from "../store/modules/data_action/analy";
import { AppDispatch } from "../store/index";

const steps = [
  {
    label: '環境',
    description: `環境因子に対して数値化してください。`,
  },
  {
    label: '遺伝',
    description:
      '身体能力や情報に対する解釈',
  },
  {
    label: 'リソース',
    description: `自分が扱えるリソース(資源)を数値化`,
  },
  {
    label: '目的',
    description: `行動を決定する評価因子として優先順位を確認する。`,
  },
  {
    label: '現状の実行結果',
    description: `行動した結果をフィードバックするために`,
  },
  {
    label: "平均評価(ヒューティクス)との差",
    description: `一般論で使われる情報と自分が扱う言語情報の差を規定する`,
  }
];

function Content01(){
  const dispatch:AppDispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSave = () => {
    dispatch(AddAnalyData())
  };

  return (
   <div className="content p-10 boxShadow">
     <h3 className="title">順番に入力してください。</h3>
    <Box sx={{ maxWidth: 400, pb: 8 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Card sx={{ minWidth: 420, p: 2 }}>
                <Typography>{step.description}</Typography>
                { index === 0 && <CardContent><Content01Card01 nextAction={handleNext} backAction={handleBack} /></CardContent>}
                { index === 1 && <CardContent><Content01Card02 nextAction={handleNext} backAction={handleBack} /></CardContent>}
                { index === 2 && <CardContent><Content01Card03 nextAction={handleNext} backAction={handleBack} /></CardContent>}
                { index === 3 && <CardContent><Content01Card04 nextAction={handleNext} backAction={handleBack} /></CardContent>}
                { index === 4 && <CardContent><Content01Card05 nextAction={handleNext} backAction={handleBack} /></CardContent>}
                { index === 5 && <CardContent><Content01Card06 nextAction={handleNext} backAction={handleBack} /></CardContent>}
              </Card>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>全ての入力を完了しました。次は結果をご確認ください。</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
          <Button onClick={handleSave} sx={{ mt: 1, mr: 1 }}>
            SAVE
          </Button>
        </Paper>
      )}
    </Box>
   </div>
  )
}

export default Content01;
