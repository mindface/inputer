import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Posts } from "../models/Posts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../store/index";
import { AddPostData, UpdatePostData } from "../store/modules/data_action/post";

import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image"],
];

export type PropsSet = {
  post: Posts;
};
// eslint-disable-next-line react/display-name
export const PartsDialog = (props: PropsSet) => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, titleSet] = useState("");
  const [body, bodySet] = useState("");
  const [sub, subSet] = useState("");
  const [accout, accoutSet] = useState("");
  const theme = useTheme();
  const [viewItem, setViewItem] = useState<Posts>({
    id: 0,
    title: "",
    body: "",
    sub: "",
    accout: "",
  });
  const editor = useRef(null);

  const handleEditerOpen = () => {
    console.log(";;;;;;;;;;;;;");
    const __editor = document.getElementsByClassName("editor")[0];
    const quill = new Quill(".editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "文章を入力してください。",
      readOnly: false,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateDataAction = () => {
    const sendData = {
      id: viewItem.id,
      title: title,
      body: body,
      sub: sub,
      accout: accout,
    };
    dispatch(UpdatePostData(sendData));
    setOpen(false);
  };

  const dialogAction = () => {
    setViewItem(props.post);
    titleSet(props.post.title);
    bodySet(props.post.body);
    subSet(props.post.sub);
    accoutSet(props.post.accout ? props.post.accout : "");
    setOpen(!open);
    handleEditerOpen();
  };

  useEffect(() => {
    console.log(editor.current);
  }, [editor.current]);

  return (
    <>
      <div className="btn-box">
        <Button size="small" onClick={(e) => dialogAction()}>
          詳細
        </Button>
      </div>
      <div className="dialog-box">
        <Dialog
          fullScreen={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="sresponsive-dialog-title"
          sx={{ m: 4 }}
        >
          <DialogTitle id="sresponsive-dialog-title">編集モーダル</DialogTitle>
          <DialogContent sx={{ maxWidth: "lg", width: "100%", m: 2 }}>
            <Box sx={{ minWidth: 220, p: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-flexible"
                  label="タイトル"
                  multiline
                  maxRows={4}
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    titleSet(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, p: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-flexible"
                  label="詳細"
                  multiline
                  rows={4}
                  value={body}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    bodySet(e.target.value);
                  }}
                  variant="standard"
                />
              </FormControl>
            </Box>
            <div ref={editor}>
              <div className="editor">editor</div>
            </div>
            <Box sx={{ minWidth: 120, p: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-flexible"
                  label="補足"
                  multiline
                  maxRows={4}
                  value={sub}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    subSet(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, p: 2 }}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-flexible"
                  label="accout"
                  multiline
                  maxRows={4}
                  value={accout}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    accoutSet(e.target.value);
                  }}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              close
            </Button>
            <Button autoFocus onClick={updateDataAction}>
              save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
