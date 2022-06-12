import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { PartDialog, PropsSet } from "./PartDialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getPostData, deletePostData } from "../store/modules/data_action/post";
import { getDictioData } from "../store/modules/data_action/dictio";
import { Posts } from "../models/Posts";
import { Dictio } from "../models/Dictio";
import { RootStore } from "../store/modules/reducer";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AppDispatch } from "../store/index";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { SpeedDialAction } from "@mui/material";

const discBoxStyle = "position: relative; display: inline-block;";
const discInfoBoxStyle =
  "display: none; position: absolute; z-index:1; top: 100%; left: 0; width:160px; padding:5px; line-height:1.7; background-color: #fff;box-shadow: 0 0 10px 0 #ccc;";
const onmouseoverCode =
  "this.getElementsByClassName('disc')[0].style.display = 'inline-block'";
const onmouseoutCode =
  "this.getElementsByClassName('disc')[0].style.display = 'none'";

function ContentInfo01() {
  const dispatch: AppDispatch = useDispatch();
  const listDictios = useSelector((state: { base: RootStore }) => {
    return state.base.dictio.dictios;
  });
  const listItems = useSelector((state: { base: RootStore }) => {
    return state.base.post.postItems;
  });
  const theme = useTheme();
  const dialogRef = useRef<PropsSet>(null);

  useEffect(() => {
    dispatch(getPostData());
    dispatch(getDictioData());
  }, []);

  const minDistance = 10;
  const [open, setOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Posts>({
    id: 0,
    title: "",
    body: "",
    sub: "",
    accout: "",
  });
  const [value1, setValue1] = useState<number[]>([20, 37]);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (id: number) => {
    setOpen(true);
    handleViewItem(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewItem = (id: number) => {
    const item: Posts[] = listItems.filter((item: Posts) => id === item.id);
    setViewItem(item[0]);
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deletePostData(id));
  };

  const editDialogHandle = (id: number) => {
    const item: Posts[] = listItems.filter((item: Posts) => id === item.id);
    setViewItem(item[0]);
    if (dialogRef.current) {
      dialogRef.current?.dialogAction(item[0]);
    }
  };

  const setViewBody = (text: string) => {
    const setComponent = (text: string, disc: string): any => {
      const setElement = `<div class="text-mean" style="${discBoxStyle}" onmouseover="${onmouseoverCode}" onmouseout="${onmouseoutCode}">
          ${text}
          <span class="disc" style="${discInfoBoxStyle}">${disc}</>
          </div>`;
      return setElement;
    };
    let reText = text;
    listDictios.forEach((item: Dictio) => {
      const ngx = new RegExp(item.name, "g");
      reText = reText.replace(ngx, setComponent(item.name, item.disc));
    });
    return reText;
  };

  return (
    <div className="content boxShadow">
      <h3 className="title p-1">一覧</h3>
      <div style={{ display: "flex", height: "100%" }}>
        {listItems.map((item: Posts) => {
          return (
            <Card key={item.id} sx={{ minWidth: 275, maxWidth: 520, m: 2 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                ></Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(e) => handleClickOpen(item.id)}>
                  詳細
                </Button>
                <Button size="small" onClick={(e) => editDialogHandle(item.id)}>
                  edit
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
      <PartDialog ref={dialogRef} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ overflowY: "visible" }}
      >
        <DialogTitle id="responsive-dialog-title">{viewItem.title}</DialogTitle>
        <DialogContent sx={{ minWidth: 275, maxWidth: 520, m: 2, pb: 2 }}>
          <div
            dangerouslySetInnerHTML={{ __html: setViewBody(viewItem.body) }}
          ></div>
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
  );
}

export default ContentInfo01;
