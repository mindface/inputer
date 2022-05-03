import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';


function Content03(){
  const dispatch = useDispatch();
  const minDistance = 10;
  const [age, setAge] = React.useState('');
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
     <h3 className="title">content03</h3>
    <Box sx={{ minWidth: 120, p: 2 }}>
      <p className="caption">parts 02</p>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">カテゴリ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ p: 2 }}>
      <p className="caption">parts 01</p>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
   </div>
  )
}

export default Content03;
