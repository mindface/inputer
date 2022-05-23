import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import flowStep01 from "../json/flowStep01.json";
import flowStep02 from "../json/flowStep02.json";
import flowStep03 from "../json/flowStep03.json";
import flowStep04 from "../json/flowStep04.json";

type propsSet = {
  viewnumber: number;
  phase: number;
};

const OuterComponent = styled("div")({
  height: 300,
  width: "100%",
  padding: 8,
  margin: 16,
  color: "white",
  backgroundColor: "#1976d2",
  borderRadius: 4,
});

function ContentFlowStep(props: propsSet) {
  const [info, setInfo] = useState<{ id: number; info: string; disc: string }>({
    id: 0,
    info: "",
    disc: "",
  });

  useEffect(() => {
    if (props.phase === 0) setInfo(flowStep01[props.viewnumber]);
    if (props.phase === 1) setInfo(flowStep02[props.viewnumber]);
    if (props.phase === 2 || props.phase === 3 || props.phase === 4) {
      setInfo(flowStep03[props.viewnumber]);
    }
    if (props.phase === 5 || props.phase === 6 || props.phase === 7) {
      setInfo(flowStep04[props.viewnumber]);
    }
  }, [props.viewnumber, props.phase]);

  return (
    <OuterComponent>
      <Typography sx={{ pb: 2 }} className="p">
        フェーズ: 0{props.phase + 1} | viewnumber: {props.viewnumber}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ borderBottom: "1px solid white" }}
      >
        {info.info}
      </Typography>
      <Typography variant="body1" gutterBottom component="div">
        {info.disc}
      </Typography>
    </OuterComponent>
  );
}

export default ContentFlowStep;
