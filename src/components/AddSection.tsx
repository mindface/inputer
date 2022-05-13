import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ContentInfo01 from "./ContentInfo01";
import ContentInfo02 from "./ContentInfo02";
import ContentInfo03 from "./ContentInfo03";


function FormSection(){
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
   <section className="section p-10 boxShadow">
    <Box sx={{ p: 2 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="一覧" />
        <Tab label="追加" />
        <Tab label="info" />
      </Tabs>
    </Box>
    {tab === 0 && <ContentInfo01 />}
    {tab === 1 && <ContentInfo02 tabChange={() => setTab(0)} />}
    {tab === 2 && <ContentInfo03 />}

   </section>
  )
}

export default FormSection;
