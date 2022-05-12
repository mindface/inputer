import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../store/modules/reducer';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Card02 } from '../models/analy'

type propsSet = {
  nextAction:() => void;
  backAction:() => void;
}

const Content01Card02 = (props:propsSet) => {
  const dispatch = useDispatch();
  const card02:Card02 = useSelector((state:{base:RootStore}) => {
    return state.base.analy.card02;
  });
  const minDistance = 10
  const [ability1, setAbility1] = useState<string>("");
  const [value1, setValue1] = useState<number | number[]>(20);
  const [value2, setValue2] = useState<number[]>([20, 37]);

  const handleNext = () => {
    const sendCard02 = {
      ability1: ability1,
      value1: value1,
      value2: value2,
    }
    dispatch({type:'CARD02',card02:sendCard02})
    props.nextAction()
  };
  const handleBack = () => props.backAction();

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
    setNumber: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let getValue:number[] = [];
    let setValue:number[] = [];
    if(setNumber === 0)getValue = value2;
    
    if (activeThumb === 0) {
      setValue = [Math.min(newValue[0], getValue[1] - minDistance), getValue[1]];
    } else {
      setValue = [getValue[0], Math.max(newValue[1], getValue[0] + minDistance)];
    }

    switch (setNumber) {
      case 0:
        setValue2(setValue);
        break;
      case 1:
        break;
    }
  };

  useEffect(() => {
    setAbility1(card02.ability1);
    setValue1(card02.value1);
    setValue2(card02.value2);
  },[card02])

  return (
   <div className="content p-10 boxShadow">
    <p className="caption">主軸能力</p>
    <FormControl
      fullWidth
      sx={{ mb: 2 }}
    >
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={ability1}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setAbility1(e.target.value)}}
      />
    </FormControl>
    <p className="caption">基礎体力の結果 (運動) | 記憶力のテスト [{value1}%]</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={(
        event: Event,
        newValue: (number | number[]),
        activeThumb: number,
      ) => { setValue1(newValue) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">練習で計画をベース成長可能% [{value2[0]}% - {value2[1]}%]</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value2}
      onChange={(e,r,t) => { handleChange1(e,r,t,0) }}
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

export default Content01Card02;
