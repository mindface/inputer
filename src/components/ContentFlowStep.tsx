import React from 'react';
import Box from '@mui/material/Box';

type propsSet = {
  viewnumber:number;
  phase:number;
}

function ContentFlowStep(props:propsSet) {
  return (
    <div>
     <p className="p">viewnumber: {props.viewnumber}</p>
     <p className="p">phase: {props.phase}</p>
    </div>
  );
}

export default ContentFlowStep
