import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function Header(){
  const pageList = [
    { id: "/",label:"home"},
    { id:"/about",label: "about"},
    {id:"/info", label: "info" }
  ];
  const navigate = useNavigate();
  const [state, setState] = React.useState(false)

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      setState(open);
    };

  const changePage = (id:string) => {
    navigate(id);
  }

  return (
    <>
    <header className="header boxShadow">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              tasklinks
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
      <React.Fragment>
      <Drawer
        anchor="left"
        open={state}
        onClose={toggleDrawer("left", false)}
      >
        <IconButton onClick={toggleDrawer("left", false)}>
        <ChevronLeftIcon />
        </IconButton>
        <div className="drawer">
          <div className="drawer__inner">
            <List>
              {pageList.map((item:{id:string,label:string}) => {
                return (<ListItem key={item.id} button onClick={() => changePage(item.id)} >
                <ListItemText primary={item.label} />
               </ListItem>)
              })
              }
            </List>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
    </>
  )
}

export default Header;
