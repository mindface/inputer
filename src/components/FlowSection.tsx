import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ContentFlow from "./ContentFlow";
import Slider from "@mui/material/Slider";

function FlowSection() {
  const [tab, setTab] = useState(0);

  const [abr01, abr01Set] = useState(0);
  const [abr02, abr02Set] = useState(0);
  const [abr03, abr03Set] = useState(0);
  const [abr04, abr04Set] = useState(0);

  const phaseBase = [
    "フェーズ 01",
    "フェーズ 02",
    "フェーズ 03",
    "フェーズ 04",
    "フェーズ 05",
    "フェーズ 06",
    "フェーズ 07",
    "フェーズ 08",
  ];
  const [phase, phaseSet] = useState(phaseBase);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    let setNumber = 2;
    if (abr01 >= 10 && abr01 < 20) setNumber = 3;
    if (abr01 >= 20 && abr01 < 30) setNumber = 4;
    if (abr01 >= 30 && abr01 < 40) setNumber = 5;
    if (abr01 >= 40 && abr01 < 50) setNumber = 6;
    if (abr01 >= 50) setNumber = 7;
    const list = phaseBase.filter((item: string, index: number) => {
      if (index <= setNumber) {
        return item;
      }
    });

    phaseSet(list);
  }, [abr01]);

  return (
    <section className="section p-10 boxShadow">
      <Box sx={{ p: 2 }}>
        <Typography>問題解決できない場合レベル階層が深くなります。</Typography>
        <Tabs value={tab} onChange={handleChange}>
          {phase.map((item: string, index: number) => {
            return <Tab label={item} key={index} />;
          })}
        </Tabs>
      </Box>
      <Box sx={{ width: "75%", m: "auto", p: 2 }}>
        <ContentFlow phase={tab} />
      </Box>
      <Box width={350}>
        <p className="caption">環境因子</p>
        <Slider
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          value={abr01}
          onChange={(e: Event, r: number | number[]) => {
            abr01Set(r as number);
          }}
        />
        {abr01}
        <p className="caption">遺伝子</p>
        <Slider
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          value={abr02}
          onChange={(e: Event, r: number | number[]) => {
            abr02Set(r as number);
          }}
        />
        <p className="caption">自己評価</p>
        <Slider
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          value={abr03}
          onChange={(e: Event, r: number | number[]) => {
            abr03Set(r as number);
          }}
        />
        <p className="caption">状況把握</p>
        <Slider
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          value={abr04}
          onChange={(e: Event, r: number | number[]) => {
            abr04Set(r as number);
          }}
        />
      </Box>
    </section>
  );
}

export default FlowSection;
