import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Content01 from "./Content01";
import Content02 from "./Content02";
import Content03 from "./Content03";

function FormSection(){
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
   <section className="section p-10 boxShadow">
    <Box sx={{ p: 2 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="入力値" />
        <Tab label="結果" />
        <Tab label="行動と結果について" />
      </Tabs>
    </Box>
    {tab === 0 && <Content01 />}
    {tab === 1 && <Content02 />}
    {tab === 2 && <Content03 />}

   </section>
  )
}

export default FormSection;
