import React, {useState,useImperativeHandle,forwardRef} from 'react';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Posts } from '../models/Posts';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AppDispatch } from "../store/index";
import { AddPostData, UpdatePostData } from "../store/modules/data_action/post";

export type PropsSet = {
  dialogAction:(post:Posts) => void;
}

const PartDialog = forwardRef<PropsSet>((props,ref) => {
  const dispatch:AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, titleSet] = useState("");
  const [body, bodySet] = useState("");
  const [sub, subSet] = useState("");
  const [accout, accoutSet] = useState("");
  const theme = useTheme();
  const [viewItem, setViewItem] = useState<Posts>({id:0,
    title: "",
    body: "",
    sub: "",
    accout: ""});
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id:number) => {
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
    dispatch(UpdatePostData(sendData))
    setOpen(false);
  };
  
  useImperativeHandle(ref,()=> ({
    dialogAction:(post:Posts) => {
      setViewItem(post);
      titleSet(post.title);
      bodySet(post.body);
      subSet(post.sub);
      accoutSet(post.accout?post.accout:"");
      setOpen(!open);
    }
  }));

  return (
   <div className="dialog-box">
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="sresponsive-dialog-title"
    >
      <DialogTitle id="sresponsive-dialog-title">
        編集モーダル
      </DialogTitle>
      <DialogContent 
        sx={{ minWidth: 275, maxWidth: 320, m: 2 }}
      >
      <Box sx={{ minWidth: 220, p: 2 }}>
          <p className="caption">title</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="title"
              multiline
              maxRows={4}
              value={title}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {titleSet(e.target.value)}}
            />
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, p: 2 }}>
          <p className="caption">body</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="body"
              multiline
              rows={4}
              value={body}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {bodySet(e.target.value)}}
              variant="standard"
            />
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, p: 2 }}>
          <p className="caption">sub</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="sub"
              multiline
              maxRows={4}
              value={sub}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {subSet(e.target.value)}}
            />
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, p: 2 }}>
          <p className="caption">accout</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="accout"
              multiline
              maxRows={4}
              value={accout}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {accoutSet(e.target.value)}}
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
  )
})

export default PartDialog;
