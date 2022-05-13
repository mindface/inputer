import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Slide from '@mui/material/Slide';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TransitionProps } from '@mui/material/transitions';
import { AppDispatch } from "../store/index";
import { AnalyData } from "../models/analy";
import { RootStore } from '../store/modules/reducer';
import { getAnalyData, deleteAnalyData } from "../store/modules/data_action/analy";

import Content02EditContent from "./Content02EditContent";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Content02(){
  const dispatch:AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [edit, setEditOpen] = useState(false);
  const [editInfo, setEditInfo] = useState<AnalyData>();

  const analyData:AnalyData[] = useSelector((state:{base:RootStore}) => {
    return state.base.analy.setAnalies;
  })

  const handleClickDialog = () => {
    setOpen(!open);
  };

  const handleEditSwtich = () => {
    setEditOpen(!edit);
  };

  const handleDeleteItem = (id:number) => {
    dispatch(deleteAnalyData(id));
  }

  const handleEditItem = (id:number) => {
    const viweItem = analyData.filter((item:AnalyData) => item.id === id);
    setEditInfo(viweItem[0]);
    console.log(viweItem[0])
    handleClickDialog();
    handleEditSwtich();
  }

  useEffect(() => {
    dispatch(getAnalyData());
  },[]);

  return (
   <div className="content p-10 boxShadow">
     <div className="content__title pb-2">
     <h3 className="title">入力一覧</h3>
      目的と現状の結果、リソースから検索情報への関与していきます。
      情報へのレベライズや自分の情報に対する構造をメタ化を目指します。
     </div>
     <Card sx={{ minWidth: 420, p: 2 }}>
      <List>
      {analyData.map((item:AnalyData,index:number) => {
        return (
          <ListItem key={index}>
            <div className='box w-100 pb-2'>
              <h4 className="title pb-1 mb-1 border-b">カードラベル | {item.card04_category}</h4>
              <Button autoFocus onClick={() => handleEditItem(item.id!)}>
                <ModeEditIcon />
              </Button>
              <Button autoFocus onClick={() => handleDeleteItem(item.id!)}>
                <DeleteOutlineIcon />
              </Button>
              <Button variant="outlined" onClick={handleClickDialog}>
                Open
              </Button>
            </div>
          </ListItem>)
      })}
      </List>
    </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClickDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
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
        { edit && <Content02EditContent saveAction={() => {handleClickDialog()}} analyData={editInfo} /> }
        { !edit &&
        <div className="t">
          検索結果の表示
        </div>}
      </Dialog>
   </div>
  )
}

export default Content02;
