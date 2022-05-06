import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { AppDispatch } from "../store/index";
import { AnalyData } from "../models/analy";
import { UpdateAnalyData } from "../store/modules/data_action/analy";

type propsSet = {
  analyData?:AnalyData,
  saveAction: () => void
}

function Content02EditContent(props:propsSet){
  const dispatch:AppDispatch = useDispatch();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [editInfo, setEditInfo] = useState<AnalyData>({
    id:0,
    card01_category:"",
    card01_value_s1:0,
    card01_value1:[0,10],
    card01_value2:[0,10],
    card01_value3:[0,10],
  
    card02_ability1:"",
    card02_value1:0,
    card02_value2:[0,10],
  
    card03_category:"",
    card03_value1:0,
    card03_value2:0,
    card03_value3:0,
  
    card04_category:"",
    card04_value1:0,
    card04_value2:0,
    card04_value3:0,
  
    card05_value1:0,
    card05_value2:0,
    card05_value3:0,
  
    card06_value1:0,
    card06_value2:"",
  });

  const handleValueChange = (name:string,value:(number|number[]|string)) => {
    setEditInfo({...editInfo,[name]:value})
  }

  const saveAction = () => {
    dispatch(UpdateAnalyData(editInfo));
    props.saveAction();
  }

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if(props.analyData) {
      setEditInfo({...props.analyData});
    }
  },[props.analyData]);

  return (
   <div className="content p-2">
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 01</Typography>
        <Typography sx={{ color: 'text.secondary' }}>環境</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card01">
          <FormControl 
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel id="card01_category">環境の情報収集ツール</InputLabel>
            <Select
              labelId="card01_category"
              id="card01_category"
              value={editInfo.card01_category}
              label="category"
              onChange={(e:SelectChangeEvent) => { handleValueChange('card01_category',e.target.value) }}
            >
              <MenuItem value={10}>聞くこと</MenuItem>
              <MenuItem value={20}>本(テキスト)</MenuItem>
              <MenuItem value={30}>動画とテキスト</MenuItem>
              <MenuItem value={40}>動画と経験の組み合わせ</MenuItem>
            </Select>
          </FormControl>
          <p className="caption">カテゴリ内での情報収集範囲</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card01_value_s1}
            onChange={(
              event: Event,
              newValue: number | number[],
              activeThumb: number,
            ) => { handleValueChange('card01_value_s1',newValue) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <div className="caption border-b mb-1">調査の範囲</div>
          <div className="text">聞くのみ[0~40]<br/>ネットで調べる[40~60]<br/>調べた情報からさらに収集[60~80]<br/>収集した情報を検証[80~]</div>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card01_value1}
            onChange={(e,r,t) => { handleValueChange('card01_value1',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <div className="caption border-b mb-1">計画した内容を実行可能な1日の回数</div>
          <div className="text pb-1">1週間1回[0~10]<br/>1週間2回[20~30]<br/>1週間3回[40~50]<br/>1週間4回[50~60]<br/>1週間5回[60~70]<br/>1週間6~回[80~]</div>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card01_value2}
            onChange={(e,r,t) => { handleValueChange('card01_value2',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <div className="caption border-b mb-1">情報を質問可能な人</div>
          <div className="text">知り合い[0~20]<br/>専門の知識保有者[40~60]<br/>専門の知識保有者の教授[60~80]<br/>専門の知識保有者の概念定義者[80~]</div>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card01_value3}
            onChange={(e,r,t) => { handleValueChange('card01_value3',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 02</Typography>
        <Typography sx={{ color: 'text.secondary' }}>遺伝</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card02">
          <p className="caption">主軸能力</p>
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <TextField
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
              value={editInfo.card02_ability1}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleValueChange('card02_ability1',e.target.value)}}
            />
          </FormControl>
          <p className="caption">基礎体力の結果 (運動) | 記憶力のテスト [{editInfo.card02_value1}%]</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card02_value1}
            onChange={(e,r,t) => { handleValueChange('card02_ability1',r)}}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">練習で計画をベース成長可能% [{editInfo.card02_value2[0]}% - {editInfo.card02_value2[1]}%]</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card02_value2}
            onChange={(e,r,t) => { handleValueChange('card02_ability2',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 03</Typography>
        <Typography sx={{ color: 'text.secondary' }}>リソース</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card03">
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <InputLabel id="card03_category">過ごす時間の割合</InputLabel>
            <Select
              labelId="card03_category"
              id="card03_category"
              value={editInfo.card03_category}
              label="category"
              onChange={(e:SelectChangeEvent) => { handleValueChange('card03_category',e.target.value) }}
            >
              <MenuItem value={10}>1日の活動時間の1割</MenuItem>
              <MenuItem value={20}>1日の活動時間の2割</MenuItem>
              <MenuItem value={30}>1日の活動時間の3割</MenuItem>
              <MenuItem value={40}>1日の活動時間の4割</MenuItem>
              <MenuItem value={50}>1日の活動時間の5割</MenuItem>
              <MenuItem value={60}>1日の活動時間の6割</MenuItem>
              <MenuItem value={70}>1日の活動時間の7割</MenuItem>
              <MenuItem value={80}>1日の活動時間の8割</MenuItem>
              <MenuItem value={90}>1日の活動時間の9割</MenuItem>
              <MenuItem value={100}>1日の活動時間の10割</MenuItem>
            </Select>
          </FormControl>
          <p className="caption">1日単位で使える時間 [{editInfo.card03_value1}]時間</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card03_value1}
            onChange={(e,r,t) => { handleValueChange('card03_value1',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">ツールやフィードバックされる回数 [{editInfo.card03_value2}]</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card03_value2}
            onChange={(e,r,t) => { handleValueChange('card03_value2',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">優先順位 [{editInfo.card03_value3}]</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card03_value3}
            onChange={(e,r,t) => { handleValueChange('card03_value3',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 04</Typography>
        <Typography sx={{ color: 'text.secondary' }}>目的</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card04">
          <p className="caption">目的のラベル</p>
          <FormControl
            fullWidth
            sx={{ mb: 2 }}
          >
            <TextField
              id="card04_category"
              multiline
              maxRows={4}
              value={editInfo.card04_category}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleValueChange('card04_category',e.target.value)}}
            />
        </FormControl>
        <p className="caption">目的から計画の立案率</p>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={editInfo.card04_value1}
          onChange={(e,r,t) => { handleValueChange('card04_value1',r) }}
          valueLabelDisplay="auto"
          disableSwap
        />
        <p className="caption">実装時における計画の変更率</p>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={editInfo.card04_value2}
          onChange={(e,r,t) => { handleValueChange('card04_value2',r) }}
          valueLabelDisplay="auto"
          disableSwap
        />
        <p className="caption">目的で問題を細分化したときのプロセス数</p>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={editInfo.card04_value3}
          onChange={(e,r,t) => { handleValueChange('card04_value3',r) }}
          valueLabelDisplay="auto"
          disableSwap
        />
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 05</Typography>
        <Typography sx={{ color: 'text.secondary' }}>現状の実行結果</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card05">
          <p className="caption">検証方法の範囲</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card05_value1}
            onChange={(e,r,t) => { handleValueChange('card04_value3',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">事実と計画の分析</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card05_value2}
            onChange={(e,r,t) => { handleValueChange('card05_value2',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">次回改修点までの実行回数</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card05_value3}
            onChange={(e,r,t) => { handleValueChange('card05_value3',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>card 06</Typography>
        <Typography sx={{ color: 'text.secondary' }}>平均評価(ヒューティクス)との差</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card06">
          <p className="caption">自分の環境下で平均値と判断する評価</p>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={editInfo.card06_value1}
            onChange={(e,r,t) => { handleValueChange('card06_value1',r) }}
            valueLabelDisplay="auto"
            disableSwap
          />
          <p className="caption">自分以外のパフォーマンスに対して、言葉上での自分の行動に発生するズレ</p>
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="body"
              multiline
              rows={4}
              value={editInfo.card06_value2}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleValueChange('card06_value2',e.target.value)}}
              variant="standard"
            />
          </FormControl>
        </div>
      </AccordionDetails>
    </Accordion>
    <Box sx={{ p: 2, border: '1px solid grey' }}>
      <div className="btn">
      <Button autoFocus onClick={() => props.saveAction()}>close</Button>
      <Button autoFocus onClick={() => saveAction()}>save</Button>
      </div>
    </Box>
   </div>
  )
}

export default Content02EditContent;
