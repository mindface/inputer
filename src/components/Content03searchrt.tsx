import React, { useEffect, useState, useRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ViewListIcon from "@mui/icons-material/ViewList";
import { AnalyData } from "../models/analy";
import setText01 from "../json/setText01.json";
import setText02 from "../json/setText02.json";
import { type } from "os";

type propsSet = {
  analyData?: AnalyData;
};

type textJson = {
  id: number;
  text: string;
  disc: string;
};

function Content03searchrt(props: propsSet) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectJsonNumber, setSelectJsonNumber] = useState<string>("1");
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const serchAction = async () => {
    const APIKEY = process.env.REACT_APP_APIKEY;
    const CX = process.env.REACT_APP_CX;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${APIKEY}&cx=${CX}&q=${searchText}`,
      params
    );
    res.json().then((res) => {
      console.log(res);
    });
    handleClickOpen("paper");
  };

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const setJson = (number: string) => {
    let list: textJson[] | [] = [];
    switch (number) {
      case "1":
        list = setText01;
        break;
      case "2":
        list = setText02;
        break;
    }
    return list;
  };

  // useEffect(() => {
  //   console.log(props.analyData)
  // },[props.analyData])

  return (
    <div className="search-box">
      <h3 className="title p-1">検索文字列</h3>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
      </FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectJsonNumber}
        onChange={(
          event: React.ChangeEvent<HTMLInputElement>,
          value: string
        ) => {
          setSelectJsonNumber(value);
        }}
      >
        <FormControlLabel value="1" control={<Radio />} label="神経系" />
        <FormControlLabel value="2" control={<Radio />} label="記憶系" />
      </RadioGroup>
      <Button variant="contained" sx={{ mt: 1, mr: 1 }} onClick={serchAction}>
        実行
      </Button>
      {searchText !== "" && (
        <Button onClick={handleClickOpen("paper")}>
          <ViewListIcon />
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">検索文字列</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {setJson(selectJsonNumber).map((item: textJson) => {
            return (
              <p key={item.id}>
                <a
                  href={`https://www.google.com/search?q=${searchText}${item.text}`}
                  target="_branck"
                >
                  {searchText}
                  {item.text}
                </a>
              </p>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Content03searchrt;
