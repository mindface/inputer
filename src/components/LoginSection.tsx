import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { loginData } from "../store/modules/data_action/user";
import { RootStore } from '../store/modules/reducer';
import { AppDispatch } from "../store/index";

function LoginSection(){
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:{base:RootStore}) => {
    return state.base.user.user;
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(user.id !== 0) {
      navigate('/')
    }
  },[user]);

  const handleClick = () => {
    const sendData = {
      email: email,
      password: password
    }
    dispatch(loginData(sendData));
  };

  return (
   <section className="section p-10 boxShadow">
    <FormControl
      fullWidth
      sx={{ mb: 2 }}
    >
      <Typography id="demo-simple-select-label">email</Typography>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={email}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
      />
      <Typography id="demo-simple-select-label">password</Typography>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={password}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
      />
      <Button autoFocus onClick={() => handleClick()}>
        ログイン
      </Button>
    </FormControl>
   </section>
  )
}

export default LoginSection;
