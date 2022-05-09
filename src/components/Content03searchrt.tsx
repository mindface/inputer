import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ViewListIcon from '@mui/icons-material/ViewList';

function Content03searchrt() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const serchAction = async () => {
    const APIKEY = process.env.REACT_APP_APIKEY;
    const CX = process.env.REACT_APP_CX;

    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${APIKEY}&cx=${CX}&q=${searchText}`,params);
    res.json().then((res) => {
      console.log(res)
    })
  }

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div className="search-box">
     <h3 className="title p-1">検索文字列<Button onClick={handleClickOpen('paper')}><ViewListIcon /></Button></h3>
      <FormControl
        fullWidth
        sx={{ mb: 2 }}
      >
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={searchText}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setSearchText(e.target.value)}}
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ mt: 1, mr: 1 }}
        onClick={serchAction}>実行</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Content03searchrt;
