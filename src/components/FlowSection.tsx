import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ContentFlow01 from "./ContentFlow01";
import ContentInfo02 from "./ContentInfo02";
import ContentInfo03 from "./ContentInfo03";

function FlowSection(){
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
   <section className="section p-10 boxShadow">
    <Box sx={{ p: 2 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Level 01" />
        <Tab label="Level 02" />
        <Tab label="Level 03" />
      </Tabs>
    </Box>
    {tab === 0 && <ContentFlow01 phase={tab} />}
    {tab === 1 && <ContentInfo02 tabChange={() => setTab(0)} />}
    {tab === 2 && <ContentInfo03 />}

   </section>
  )
}

export default FlowSection;
