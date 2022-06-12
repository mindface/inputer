import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { AppDispatch } from "../store/index";
import { AddDictioData } from "../store/modules/data_action/dictio";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Content02() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [name, nameSet] = useState<string>("");
  const [disc, discSet] = useState<string>("");
  const [body, bodySet] = useState<string>("");
  const [envInfo, envInfoSet] = useState<string>("");
  const [meanlevel, meanlevelSet] = useState<string>("");
  const [value, setValue] = useState("");

  const handleClickDialog = () => {
    setOpen(!open);
  };

  const sendData = () => {
    const sendData = {
      name: name,
      disc: disc,
      body: body,
      env: envInfo,
      meanlevel: meanlevel,
    };
    dispatch(AddDictioData(sendData));
  };

  return (
    <div className="content p-10 boxShadow">
      <div className="content__title pb-2">
        <h3 className="title">辞書入力</h3>
      </div>
      <Card sx={{ minWidth: 420, p: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <TextField
            id="outlined-multiline-name"
            label="タイトル"
            sx={{ mb: 2 }}
            multiline
            maxRows={4}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              nameSet(e.target.value);
            }}
          />
          <TextField
            id="outlined-multiline-disc"
            label="意味詳細"
            sx={{ mb: 2 }}
            multiline
            rows={4}
            value={disc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              discSet(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="outlined-multiline-body"
            label="補足"
            sx={{ mb: 2 }}
            multiline
            rows={4}
            value={body}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              bodySet(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="outlined-multiline-envInfo"
            label="環境の前提情報"
            sx={{ mb: 2 }}
            multiline
            rows={4}
            value={envInfo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              envInfoSet(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="outlined-multiline-meanlevel"
            label="データ構造レベル"
            sx={{ mb: 2 }}
            multiline
            rows={4}
            value={meanlevel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              meanlevelSet(e.target.value);
            }}
            variant="standard"
          />
          <Button
            variant="contained"
            onClick={() => sendData()}
            sx={{ mt: 1, mr: 1 }}
          >
            sendData
          </Button>
        </FormControl>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClickDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClickDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              編集
            </Typography>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}

export default Content02;
