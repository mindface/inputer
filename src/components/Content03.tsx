import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { Content03chart } from "./Content03chart";
import Content03searchrt from "./Content03searchrt";
import { AppDispatch } from "../store/index";
import { RootStore } from "../store/modules/reducer";
import { AnalyData } from "../models/analy";
import { getAnalyData } from "../store/modules/data_action/analy";

function Content03() {
  const dispatch: AppDispatch = useDispatch();
  const analyData: AnalyData[] = useSelector((state: { base: RootStore }) => {
    return state.base.analy.setAnalies;
  });
  const [open, setOpen] = useState(false);
  const [selectData, setSelectData] = useState<AnalyData>();

  const [totalTime, setTotalTime] = useState(0);
  const [goalRate, setGoalRate] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectInfo = (item: AnalyData) => {
    setOpen(false);
    handleClose();
    setSelectData(item);

    setTotalTime(item.card03_value3 * item.card03_value1);
    setGoalRate(item.card05_value1 / item.card05_value3);
  };

  useEffect(() => {
    dispatch(getAnalyData());
  }, []);

  return (
    <div className="content p-10 boxShadow">
      <h3 className="title">
        結果算出のアルゴリズム(自分で調整する範囲をきめる、調べる範囲をきめる)
      </h3>
      <p>経験と使い方が存在しない場合に調べても情報を解釈できる前提がある。</p>
      <div className="box p-3">
        <Button variant="outlined" onClick={handleClickOpen}>
          Open List
        </Button>
        検索情報を変更するため、選んでください。
      </div>
      {selectData && (
        <div className="box p-2">
          <h4 className="title pb-1 mb-1 border-b">
            ラベル | {selectData.card04_category}
          </h4>
          <p>自分で使う方法やフォーム数 | {selectData.card03_value2}個</p>
          <p>これまでの練習時間 | {totalTime}時間</p>
          <p>検証数から目的成立率 | {goalRate}</p>
        </div>
      )}
      <Content03chart />
      <Content03searchrt analyData={selectData} />
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <List>
            {analyData.map((item: AnalyData, index: number) => {
              return (
                <ListItem key={index}>
                  <div className="box w-100">
                    <Grid container spacing={1}>
                      <Grid item>
                        <h4 className="title pb-1 mb-1 border-b">
                          ラベル | {item.card04_category}
                        </h4>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          onClick={() => selectInfo(item)}
                        >
                          select
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Content03;
