import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../store/modules/reducer';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import { Card05 } from '../models/analy'

type propsSet = {
  nextAction:() => void;
  backAction:() => void;
}

const Content01Card01 = (props:propsSet) => {
  const dispatch = useDispatch();
  const card05:Card05 = useSelector((state:{base:RootStore}) => {
    return state.base.analy.card05;
  });

  const [value1, setValue1] = useState<number | number[]>(0);
  const [value2, setValue2] = useState<number | number[]>(0);
  const [value3, setValue3] = useState<number | number[]>(0);

  const handleNext = () => {
    const sendCard05 = {
      value1: value1,
      value2: value2,
      value3: value3,
    }
    dispatch({type:'CARD05',card05:sendCard05})
    props.nextAction()
  };
  const handleBack = () => props.backAction();

  useEffect(() => {
    setValue1(card05.value1);
    setValue2(card05.value2);
    setValue3(card05.value3);
  },[card05])

  return (
   <div className="content p-10 boxShadow">
    <p className="caption">検証して目的達成数</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={(e,r,t) => { setValue1(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">事実と計画の分析</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value2}
      onChange={(e,r,t) => { setValue2(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">次回改修点までの実行回数</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value3}
      onChange={(e,r,t) => { setValue3(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
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
