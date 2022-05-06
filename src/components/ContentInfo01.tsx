import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PartDialog, { PropsSet } from "./PartDialog";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getPostData, deletePostData } from "../store/modules/data_action/post";
import { Posts } from '../models/Posts';
import { RootStore } from '../store/modules/reducer';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AppDispatch } from "../store/index";

function ContentInfo01(){
  const dispatch:AppDispatch = useDispatch();
  const listItems = useSelector((state:{base:RootStore}) => {
    return state.base.post.postItems;
  })
  const theme = useTheme();
  const dialogRef = useRef<PropsSet>(null);
  useEffect(() => {
    dispatch(getPostData());
  },[]);

  const minDistance = 10;
  const [open, setOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Posts>({id:0,
    title: "",
    body: "",
    sub: "",
    accout: ""});
  const [value1, setValue1] = useState<number[]>([20, 37]);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id:number) => {
    setOpen(true);
    handleViewItem(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewItem = (id:number) => {
    const item:Posts[] = listItems.filter((item:Posts) => id === item.id);
    setViewItem(item[0]);
  }

  const handleDeleteItem = (id:number) => {
    dispatch(deletePostData(id));
  }

  const editDialogHandle = (id:number) => {
    const item:Posts[] = listItems.filter((item:Posts) => id === item.id);
    setViewItem(item[0]);
    if(dialogRef.current) {
      dialogRef.current?.dialogAction(item[0]);
    }
  }

  return (
   <div className="content boxShadow">
     <h3 className="title p-1">一覧</h3>
    <div style={{ display: 'flex', height: '100%' }}>
      {listItems.map((item:Posts) => {
        return (
          <Card key={item.id} sx={{ minWidth: 275, maxWidth: 320, m: 2 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={e => handleClickOpen(item.id)}>詳細</Button>
              <Button size="small" onClick={e => editDialogHandle(item.id)}>edit</Button>
            </CardActions>
          </Card>)
      }) }
    </div>
    <PartDialog ref={dialogRef} />
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {viewItem.title}
      </DialogTitle>
      <DialogContent 
        sx={{ minWidth: 275, maxWidth: 320, m: 2 }}
      >
        <DialogContentText>
        {viewItem.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          close
        </Button>
        <Button autoFocus onClick={() => handleDeleteItem(viewItem.id)}>
          <DeleteOutlineIcon />
        </Button>
      </DialogActions>
    </Dialog>
   </div>
  )
}

export default ContentInfo01;
