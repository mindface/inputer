import { useState, useImperativeHandle, forwardRef, ReactChild } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Posts } from "../models/Posts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AppDispatch } from "../store/index";
import { UpdatePostData } from "../store/modules/data_action/post";

export type dialogPropsSet = {
  dialogAction: (post: Posts) => void;
  children?: ReactChild;
};

const PartDialo = forwardRef((props: dialogPropsSet, ref) => {
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
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (id: number) => {
    setOpen(true);
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
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="sresponsive-dialog-title"
      >
        <DialogTitle id="sresponsive-dialog-title">編集モーダル</DialogTitle>
        <DialogContent sx={{ minWidth: 275, maxWidth: 320, m: 2 }}>
          {props?.children}
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

export default PartDialo;
