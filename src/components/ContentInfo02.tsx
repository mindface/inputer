import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AddPostData } from "../store/modules/data_action/post";
import { AppDispatch } from "../store/index";

export type PropsSet = {tabChange:() => void}

function ContentInfo02(props:PropsSet){
  const dispatch:AppDispatch = useDispatch();
  const [title, titleSet] = useState("");
  const [body, bodySet] = useState("");
  const [sub, subSet] = useState("");
  const [accout, accoutSet] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>,type:string) => {
    switch (type) {
      case 'title':
        titleSet(event.target.value);
        break;
      case 'body':
        bodySet(event.target.value);    
        break;
      case 'sub':
        subSet(event.target.value);    
        break;
      case 'accout':
        accoutSet(event.target.value);    
        break;
      default:
        break;
    }
  };

  const sendDataAction = () => {
    const sendData = {
      title: title,
      body: body,
      sub: sub,
      accout: accout,
    };
    dispatch(AddPostData(sendData)).then(() => {
      props.tabChange();
    })
  };

  return (
   <Card>
    <div className="content p-10 boxShadow">
      <h3 className="title p-1">新規登録</h3>
      <Box sx={{ minWidth: 120, p: 2 }}>
        <p className="caption">title</p>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-flexible"
            label="title"
            multiline
            maxRows={4}
            value={title}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e,'title')}}
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
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e,'body')}}
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
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e,'sub')}}
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
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChange(e,'accout')}}
          />
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, p: 2 }}>
        <Button variant="contained" onClick={sendDataAction}>Contained</Button>
      </Box>
    </div>
   </Card>
  )
}

export default ContentInfo02;
