import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../store/modules/reducer";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import { Card04 } from "../models/analy";

type propsSet = {
  nextAction: () => void;
  backAction: () => void;
};

const Content01Card01 = (props: propsSet) => {
  const dispatch = useDispatch();
  const card04: Card04 = useSelector((state: { base: RootStore }) => {
    return state.base.analy.card04;
  });
  const [category, setCategory] = useState<string>("");
  const [value1, setValue1] = useState<number | number[]>(0);
  const [value2, setValue2] = useState<number | number[]>(0);
  const [value3, setValue3] = useState<number | number[]>(0);
  const [value4, setValue4] = useState<number | number[]>(0);

  const handleNext = () => {
    const sendCard04 = {
      category: category,
      value1: value1,
      value2: value2,
      value3: value3,
      value4: value4,
    };
    dispatch({ type: "CARD04", card04: sendCard04 });
    props.nextAction();
  };
  const handleBack = () => props.backAction();

  useEffect(() => {
    setCategory(card04.category);
    setValue1(card04.value1);
    setValue2(card04.value2);
    setValue3(card04.value3);
    setValue4(card04.value4);
  }, [card04]);

  return (
    <div className="content p-10 boxShadow">
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-label">目的のラベル</InputLabel>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCategory(e.target.value);
          }}
        />
      </FormControl>
      <p className="caption">目的から計画の立案率</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={(e, r, t) => {
          setValue1(r);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <p className="caption">実装時における計画の変更率</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value2}
        onChange={(e, r, t) => {
          setValue2(r);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <p className="caption">目的で問題を細分化したときのプロセス数</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value3}
        onChange={(e, r, t) => {
          setValue3(r);
        }}
        valueLabelDisplay="auto"
        disableSwap
      />
      <p className="caption">目的設定で情報収集した時間</p>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value4}
        onChange={(e, r, t) => {
          setValue4(r);
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
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Content01Card01;
