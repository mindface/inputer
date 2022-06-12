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

import { useQuill } from "react-quilljs";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
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
  ],
};

export type PropsSet = {
  dialogAction: (post: Posts) => void;
};
// eslint-disable-next-line react/display-name
export const PartDialog = forwardRef<PropsSet>((props, ref) => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, titleSet] = useState("");
  const [body, bodySet] = useState("");
  const [sub, subSet] = useState("");
  const [accout, accoutSet] = useState("");
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [viewItem, setViewItem] = useState<Posts>({
    id: 0,
    title: "",
    body: "",
    sub: "",
    accout: "",
  });
  const editor = useRef<any>(null);
  const { quill, quillRef } = useQuill();

  const handleEditerOpen = (e: any) => {
    console.log(";;;;;;;;;;;;;");
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

  useImperativeHandle(ref, () => ({
    dialogAction: (post: Posts) => {
      setViewItem(post);
      titleSet(post.title);
      bodySet(post.body);
      subSet(post.sub);
      accoutSet(post.accout ? post.accout : "");
      setOpen(!open);
    },
  }));

  return (
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
                rows={8}
                value={body}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  bodySet(e.target.value);
                }}
                variant="standard"
              />
            </FormControl>
          </Box>
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
  );
});
