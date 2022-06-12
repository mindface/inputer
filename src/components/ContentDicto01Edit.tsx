import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { AppDispatch } from "../store/index";
import { Dictio } from "../models/Dictio";
import { RootStore } from "../store/modules/reducer";
import { UpdateDictioData } from "../store/modules/data_action/dictio";

type Props = {
  editInfo: Dictio;
};

function ContentDicto01Edit(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [editInfo, editInfoSet] = useState<Dictio>({
    id: 0,
    user_id: "",
    name: "",
    body: "",
    disc: "",
    env: "",
    meanlevel: "",
  });

  const sendData = () => {
    console.log(editInfo);
    const userId = props.editInfo.user_id ? props.editInfo.user_id : "none";
    dispatch(UpdateDictioData({ ...editInfo, user_id: userId }));
  };

  useEffect(() => {
    editInfoSet(props.editInfo);
  }, [props.editInfo]);

  return (
    <>
      <FormControl sx={{ p: 2, mb: 2 }}>
        <TextField
          id="outlined-multiline-name"
          label="タイトル"
          sx={{ mb: 2 }}
          multiline
          maxRows={4}
          value={editInfo.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editInfoSet({ ...editInfo, name: e.target.value });
          }}
        />
        <TextField
          id="outlined-multiline-disc"
          label="意味詳細"
          sx={{ mb: 2 }}
          multiline
          rows={4}
          value={editInfo.disc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editInfoSet({ ...editInfo, disc: e.target.value });
          }}
          variant="standard"
        />
        <TextField
          id="outlined-multiline-body"
          label="補足"
          sx={{ mb: 2 }}
          multiline
          rows={4}
          value={editInfo.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editInfoSet({ ...editInfo, body: e.target.value });
          }}
          variant="standard"
        />
        <TextField
          id="outlined-multiline-envInfo"
          label="環境の前提情報"
          sx={{ mb: 2 }}
          multiline
          rows={4}
          value={editInfo.env}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editInfoSet({ ...editInfo, env: e.target.value });
          }}
          variant="standard"
        />
        <TextField
          id="outlined-multiline-meanlevel"
          label="データ構造レベル"
          sx={{ mb: 2 }}
          multiline
          rows={4}
          value={editInfo.meanlevel}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editInfoSet({ ...editInfo, meanlevel: e.target.value });
          }}
          variant="standard"
        />
        <Button
          variant="contained"
          onClick={() => sendData()}
          sx={{ mt: 1, mr: 1 }}
        >
          update
        </Button>
      </FormControl>
    </>
  );
}

export default ContentDicto01Edit;
