import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { AppDispatch } from "../store/index";
import { AnalyData } from "../models/analy";
import { UpdateAnalyData } from "../store/modules/data_action/analy";

type propsSet = {
  analyData?: AnalyData;
  saveAction: () => void;
  closeAction: () => void;
};

function Content02EditContent(props: propsSet) {
  const dispatch: AppDispatch = useDispatch();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [editInfo, setEditInfo] = useState<AnalyData>({
    id: 0,
    card01_category: "",
    card01_value_s1: 0,
    card01_value1: [0, 10],
    card01_value2: [0, 10],
    card01_value3: [0, 10],

    card02_ability1: "",
    card02_value1: 0,
    card02_value2: [0, 10],

    card03_category: "",
    card03_value1: 0,
    card03_value2: 0,
    card03_value3: 0,

    card04_category: "",
    card04_value1: 0,
    card04_value2: 0,
    card04_value3: 0,

    card05_value1: 0,
    card05_value2: 0,
    card05_value3: 0,

    card06_value1: 0,
    card06_value2: "",
  });

  const handleValueChange = (
    name: string,
    value: number | number[] | string
  ) => {
    setEditInfo({ ...editInfo, [name]: value });
  };

  const saveAction = () => {
    dispatch(UpdateAnalyData(editInfo));
    props.saveAction();
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (props.analyData) {
      setEditInfo({ ...props.analyData });
    }
  }, [props.analyData]);

  return (
    <div className="content p-2">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 01</Typography>
          <Typography sx={{ color: "text.secondary" }}>??????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card01">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="card01_category">??????????????????????????????</InputLabel>
              <Select
                labelId="card01_category"
                id="card01_category"
                value={editInfo.card01_category}
                label="category"
                onChange={(e: SelectChangeEvent) => {
                  handleValueChange("card01_category", e.target.value);
                }}
              >
                <MenuItem value={10}>????????????</MenuItem>
                <MenuItem value={20}>???(????????????)</MenuItem>
                <MenuItem value={30}>?????????????????????</MenuItem>
                <MenuItem value={40}>?????????????????????????????????</MenuItem>
              </Select>
            </FormControl>
            <p className="caption">???????????????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card01_value_s1}
              onChange={(
                event: Event,
                newValue: number | number[],
                activeThumb: number
              ) => {
                handleValueChange("card01_value_s1", newValue);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <div className="caption border-b mb-1">???????????????</div>
            <div className="text">
              ????????????[0~40]
              <br />
              ?????????????????????[40~60]
              <br />
              ????????????????????????????????????[60~80]
              <br />
              ???????????????????????????[80~]
            </div>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card01_value1}
              onChange={(e, r, t) => {
                handleValueChange("card01_value1", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <div className="caption border-b mb-1">
              ????????????????????????????????????1????????????
            </div>
            <div className="text pb-1">
              1??????1???[0~10]
              <br />
              1??????2???[20~30]
              <br />
              1??????3???[40~50]
              <br />
              1??????4???[50~60]
              <br />
              1??????5???[60~70]
              <br />
              1??????6~???[80~]
            </div>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card01_value2}
              onChange={(e, r, t) => {
                handleValueChange("card01_value2", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <div className="caption border-b mb-1">???????????????????????????</div>
            <div className="text">
              ????????????[0~20]
              <br />
              ????????????????????????[40~60]
              <br />
              ?????????????????????????????????[60~80]
              <br />
              ??????????????????????????????????????????[80~]
            </div>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card01_value3}
              onChange={(e, r, t) => {
                handleValueChange("card01_value3", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 02</Typography>
          <Typography sx={{ color: "text.secondary" }}>??????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card02">
            <p className="caption">????????????</p>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={editInfo.card02_ability1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleValueChange("card02_ability1", e.target.value);
                }}
              />
            </FormControl>
            <p className="caption">
              ????????????????????? (??????) | ????????????????????? [{editInfo.card02_value1}%]
            </p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card02_value1}
              onChange={(e, r, t) => {
                handleValueChange("card02_ability1", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">
              ???????????????????????????????????????% [{editInfo.card02_value2[0]}% -{" "}
              {editInfo.card02_value2[1]}%]
            </p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card02_value2}
              onChange={(e, r, t) => {
                handleValueChange("card02_ability2", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 03</Typography>
          <Typography sx={{ color: "text.secondary" }}>????????????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card03">
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="card03_category">????????????????????????</InputLabel>
              <Select
                labelId="card03_category"
                id="card03_category"
                value={editInfo.card03_category}
                label="category"
                onChange={(e: SelectChangeEvent) => {
                  handleValueChange("card03_category", e.target.value);
                }}
              >
                <MenuItem value={10}>1?????????????????????1???</MenuItem>
                <MenuItem value={20}>1?????????????????????2???</MenuItem>
                <MenuItem value={30}>1?????????????????????3???</MenuItem>
                <MenuItem value={40}>1?????????????????????4???</MenuItem>
                <MenuItem value={50}>1?????????????????????5???</MenuItem>
                <MenuItem value={60}>1?????????????????????6???</MenuItem>
                <MenuItem value={70}>1?????????????????????7???</MenuItem>
                <MenuItem value={80}>1?????????????????????8???</MenuItem>
                <MenuItem value={90}>1?????????????????????9???</MenuItem>
                <MenuItem value={100}>1?????????????????????10???</MenuItem>
              </Select>
            </FormControl>
            <p className="caption">
              1??????????????????????????? [{editInfo.card03_value1}]??????
            </p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card03_value1}
              onChange={(e, r, t) => {
                handleValueChange("card03_value1", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">
              ???????????????????????????????????????????????? [{editInfo.card03_value2}]
            </p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card03_value2}
              onChange={(e, r, t) => {
                handleValueChange("card03_value2", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">
              ?????????????????????????????? [{editInfo.card03_value3}]
            </p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card03_value3}
              onChange={(e, r, t) => {
                handleValueChange("card03_value3", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 04</Typography>
          <Typography sx={{ color: "text.secondary" }}>??????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card04">
            <p className="caption">??????????????????</p>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                id="card04_category"
                multiline
                maxRows={4}
                value={editInfo.card04_category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleValueChange("card04_category", e.target.value);
                }}
              />
            </FormControl>
            <p className="caption">??????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card04_value1}
              onChange={(e, r, t) => {
                handleValueChange("card04_value1", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">???????????????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card04_value2}
              onChange={(e, r, t) => {
                handleValueChange("card04_value2", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">?????????????????????????????????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card04_value3}
              onChange={(e, r, t) => {
                handleValueChange("card04_value3", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 05</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            ?????????????????????
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card05">
            <p className="caption">?????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card05_value1}
              onChange={(e, r, t) => {
                handleValueChange("card04_value3", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card05_value2}
              onChange={(e, r, t) => {
                handleValueChange("card05_value2", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">????????????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card05_value3}
              onChange={(e, r, t) => {
                handleValueChange("card05_value3", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>card 06</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            ????????????(?????????????????????)?????????
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card06">
            <p className="caption">???????????????????????????????????????????????????</p>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={editInfo.card06_value1}
              onChange={(e, r, t) => {
                handleValueChange("card06_value1", r);
              }}
              valueLabelDisplay="auto"
              disableSwap
            />
            <p className="caption">
              ??????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            <FormControl fullWidth>
              <TextField
                id="outlined-multiline-flexible"
                label="body"
                multiline
                rows={4}
                value={editInfo.card06_value2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleValueChange("card06_value2", e.target.value);
                }}
                variant="standard"
              />
            </FormControl>
          </div>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ p: 2, border: "1px solid grey" }}>
        <div className="btn">
          <Button autoFocus onClick={() => props.closeAction()}>
            close
          </Button>
          <Button autoFocus onClick={() => saveAction()}>
            save
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Content02EditContent;
