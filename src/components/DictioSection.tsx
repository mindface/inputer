import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import ContentDicto01 from "./ContentDicto01";
import ContentDicto02 from "./ContentDicto02";
import ContentDicto03 from "./ContentDicto03";

function DictioSection() {
  const [tab, setTab] = useState(0);

  const phaseBase = ["一覧", "登録", "検索"];
  const [phase, phaseSet] = useState(phaseBase);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <section className="section p-10 boxShadow">
      <Box sx={{ p: 2 }}>
        <Typography>
          辞書登録する内容を入力してください。これはタスク部分で実行されます。
        </Typography>
        <Tabs value={tab} onChange={handleChange}>
          {phase.map((item: string, index: number) => {
            return <Tab label={item} key={index} />;
          })}
        </Tabs>
      </Box>
      {tab === 0 && (
        <Box sx={{ width: "75%", m: "auto", p: 2 }}>
          <ContentDicto01 />
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ width: "75%", m: "auto", p: 2 }}>
          <ContentDicto02 />
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ width: "75%", m: "auto", p: 2 }}>
          <ContentDicto03 />
        </Box>
      )}
    </section>
  );
}

export default DictioSection;
