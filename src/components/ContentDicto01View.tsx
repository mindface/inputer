import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Dictio } from "../models/Dictio";

type Props = {
  editInfo: Dictio;
};

function ContentDicto01View(props: Props) {
  return (
    <>
      <Card sx={{ minWidth: 420, m: 1, p: 2 }}>
        <Typography variant="h5" component="div">
          {props.editInfo.name}
        </Typography>
        <Box component="div" sx={{ p: 2, borderBottom: "1px solid grey" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            補足
          </Typography>
          <Typography variant="body1">{props.editInfo.body}</Typography>
        </Box>
        <Box component="div" sx={{ p: 2, borderBottom: "1px solid grey" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            環境の前提情報
          </Typography>
          <Typography variant="body2">{props.editInfo.env}</Typography>
        </Box>
        <Box component="div" sx={{ p: 2, borderBottom: "1px solid grey" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            データ構造レベル
          </Typography>
          <Typography variant="body2">{props.editInfo.meanlevel}</Typography>
        </Box>
      </Card>
    </>
  );
}

export default ContentDicto01View;
