import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { Content03chart } from "./Content03chart";
import Content03searchrt from "./Content03searchrt";

function Content03(){
  const dispatch = useDispatch();
  const minDistance = 10;
  const searchComponent = useRef<unknown>();
  const [age, setAge] = useState('');
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
   <div className="content p-10 boxShadow">
     <h3 className="title">結果算出のアルゴリズム(自分で調整する範囲をきめる、調べる範囲をきめる)</h3>
     <p>経験と使い方が存在しない場合に調べても情報を解釈できる前提がある。</p>
     <Content03chart />
     <Content03searchrt />
   </div>
  )
}

export default Content03;
