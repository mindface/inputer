import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../store/modules/reducer';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import { Card06 } from '../models/analy'

type propsSet = {
  nextAction:() => void;
  backAction:() => void;
}

const Content01Card01 = (props:propsSet) => {
  const dispatch = useDispatch();
  const card06:Card06 = useSelector((state:{base:RootStore}) => {
    return state.base.analy.card06;
  })
  const minDistance = 10;
  const [value1, setValue1] = useState<number | number[]>(0);
  const [value2, setValue2] = useState<string>("");

  const handleNext = () => {
    const sendCard06 = {
      value1: value1,
      value2: value2,
    }
    dispatch({type:'CARD06',card06:sendCard06})
    props.nextAction()
  };
  const handleBack = () => props.backAction();

  useEffect(() => {
    setValue1(card06.value1);
    setValue2(card06.value2);
  },[card06])

  return (
   <div className="content p-10 boxShadow">
    <p className="caption">自分の環境下で平均値と判断する評価</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={(e,r,t) => { setValue1(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">自分以外のパフォーマンスに対して、言葉上での自分の行動に発生するズレ</p>
    <FormControl fullWidth>
      <TextField
        id="outlined-multiline-flexible"
        label="body"
        multiline
        rows={4}
        value={value2}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setValue2(e.target.value)}}
        variant="standard"
      />
    </FormControl>
    <div>
      <Button
        variant="contained"
        onClick={() => handleNext()}
        sx={{ mt: 1, mr: 1 }}
      >
        Continue
      </Button>
      <Button
        onClick={handleBack}
        sx={{ mt: 1, mr: 1 }}
      >
        Back
      </Button>
    </div>

   </div>
  )
}

export default Content01Card01;
