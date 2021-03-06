import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import { Card01 } from "../models/analy";

type propsSet = {
  nextAction: () => void;
  backAction: () => void;
};

const Content01Card01 = (props: propsSet) => {
  const dispatch = useDispatch();
  const card01: Card01 = useSelector((state: { base: RootStore }) => {
    return state.base.analy.card01;
  });
  const minDistance = 10;
  const [category, setCategory] = useState<string>("");
  const [valueS1, setValueS1] = useState<number | number[]>(20);
  const [value1, setValue1] = useState<number[]>([20, 37]);
  const [value2, setValue2] = useState<number[]>([20, 37]);
  const [value3, setValue3] = useState<number[]>([20, 37]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleNext = () => {
    const sendCard01 = {
      category: category,
      valueS1: valueS1,
      value1: value1,
      value2: value2,
      value3: value3,
    };
    dispatch({ type: "CARD01", card01: sendCard01 });
    props.nextAction();
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
    let getValue: number[] = [];
    let setValue: number[] = [];
    if (setNumber === 0) getValue = value1;
    if (setNumber === 1) getValue = value2;
    if (setNumber === 2) getValue = value3;

    if (activeThumb === 0) {
      setValue = [
        Math.min(newValue[0], getValue[1] - minDistance),
        getValue[1],
      ];
    } else {
      setValue = [
        getValue[0],
        Math.max(newValue[1], getValue[0] + minDistance),
      ];
    }

    switch (setNumber) {
      case 0:
        setValue1(setValue);
        break;
      case 1:
        setValue2(setValue);
        break;
      case 2:
        setValue3(setValue);
        break;
    }
  };

  useEffect(() => {
    setCategory(card01.category);
    setValueS1(card01.valueS1);
    setValue1(card01.value1);
    setValue2(card01.value2);
    setValue3(card01.value3);
  }, [card01]);

  return (
    <div className="content p-10 boxShadow">
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">
          ??????????????????????????????
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={10}>????????????</MenuItem>
          <MenuItem value={20}>???(????????????)</MenuItem>
          <MenuItem value={30}>?????????????????????</MenuItem>
          <MenuItem value={40}>?????????????????????????????????</MenuItem>
        </Select>
      </FormControl>
      <p className="caption">???????????????????????????????????????</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={valueS1}
        onChange={(
          event: Event,
          newValue: number | number[],
          activeThumb: number
        ) => {
          setValueS1(newValue);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="caption border-b mb-1">???????????????</div>
      <div className="text">
        ????????????[0~40]
        <br />
        ?????????????????????[40~60]
        <br />
        ????????????????????????????????????[60~80]
        <br />
        ???????????????????????????[80~]
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={(e, r, t) => {
          handleChange1(e, r, t, 0);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="caption border-b mb-1">
        ????????????????????????????????????1????????????
      </div>
      <div className="text pb-1">
        1??????1???[0~10]
        <br />
        1??????2???[20~30]
        <br />
        1??????3???[40~50]
        <br />
        1??????4???[50~60]
        <br />
        1??????5???[60~70]
        <br />
        1??????6~???[80~]
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value2}
        onChange={(e, r, t) => {
          handleChange1(e, r, t, 1);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="caption border-b mb-1">???????????????????????????</div>
      <div className="text">
        ????????????[0~20]
        <br />
        ????????????????????????[40~60]
        <br />
        ?????????????????????????????????[60~80]
        <br />
        ??????????????????????????????????????????[80~]
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value3}
        onChange={(e, r, t) => {
          handleChange1(e, r, t, 2);
        }}
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
        <Button onClick={handleBack} disabled={true} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Content01Card01;
