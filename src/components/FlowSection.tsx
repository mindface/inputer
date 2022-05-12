import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ContentFlow from "./ContentFlow";

function FlowSection(){
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
   <section className="section p-10 boxShadow">
    <Box sx={{ p: 2 }}>
      <Typography>問題解決できない場合レベル階層が深くなります。</Typography>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="フェーズ 01" />
        <Tab label="フェーズ 02" />
        <Tab label="フェーズ 03" />
      </Tabs>
    </Box>
    <Box sx={{ width: '75%', m: 'auto', p: 2 }}>
      <ContentFlow phase={tab} />
    </Box>
   </section>
  )
}

export default FlowSection;
