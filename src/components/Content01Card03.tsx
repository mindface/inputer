import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from '../store/modules/reducer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import { Card03 } from '../models/analy'

type propsSet = {
  nextAction:() => void;
  backAction:() => void;
}

const Content01Card01 = (props:propsSet) => {
  const dispatch = useDispatch();
  const card03:Card03 = useSelector((state:{base:RootStore}) => {
    return state.base.analy.card03;
  });
  const [category, setCategory] = useState<string>('');
  const [value1, setValue1] = useState<number | number[]>(0);
  const [value2, setValue2] = useState<number | number[]>(0);
  const [value3, setValue3] = useState<number | number[]>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleNext = () => {
    const sendCard03 = {
      category: category,
      value1: value1,
      value2: value2,
      value3: value3,
    }
    dispatch({type:'CARD03',card03:sendCard03})
    props.nextAction()
  };
  const handleBack = () => props.backAction();

  useEffect(() => {
    setCategory(card03.category);
    setValue1(card03.value1);
    setValue2(card03.value2);
    setValue3(card03.value3);
  },[card03])

  return (
   <div className="content p-10 boxShadow">
    <FormControl
      fullWidth
      sx={{ mb: 2 }}
    >
      <InputLabel id="demo-simple-select-label">過ごす時間の割合</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="category"
        onChange={handleChange}
      >
        <MenuItem value={10}>1日の活動時間の1割</MenuItem>
        <MenuItem value={20}>1日の活動時間の2割</MenuItem>
        <MenuItem value={30}>1日の活動時間の3割</MenuItem>
        <MenuItem value={40}>1日の活動時間の4割</MenuItem>
        <MenuItem value={50}>1日の活動時間の5割</MenuItem>
        <MenuItem value={60}>1日の活動時間の6割</MenuItem>
        <MenuItem value={70}>1日の活動時間の7割</MenuItem>
        <MenuItem value={80}>1日の活動時間の8割</MenuItem>
        <MenuItem value={90}>1日の活動時間の9割</MenuItem>
        <MenuItem value={100}>1日の活動時間の10割</MenuItem>
      </Select>
    </FormControl>
    <p className="caption">1日単位で使える時間 [{value1}]時間</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={(e,r,t) => { setValue1(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">ツールやフィードバックされる回数 [{value2}]</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value2}
      onChange={(e,r,t) => { setValue2(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">優先順位 [{value3}]</p>
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
