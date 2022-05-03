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
  })
  const [category, setCategory] = useState('');

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
      <InputLabel id="demo-simple-select-label">フィードバックツール</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="category"
        onChange={handleChange}
      >
        <MenuItem value={10}>聞くこと</MenuItem>
        <MenuItem value={20}>本</MenuItem>
        <MenuItem value={30}>動画</MenuItem>
        <MenuItem value={40}>動画と経験の組み合わせ</MenuItem>
      </Select>
    </FormControl>
    <p className="caption">1日単位で使える時間</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value1}
      onChange={(e,r,t) => { setValue1(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">ツールやフィードバックされる範囲</p>
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value2}
      onChange={(e,r,t) => { setValue2(r) }}
      valueLabelDisplay="auto"
      disableSwap
    />
    <p className="caption">優先順位</p>
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
