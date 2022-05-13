import React from 'react';
import { Content03chart } from "./Content03chart";
import Content03searchrt from "./Content03searchrt";

function Content03(){
  return (
   <div className="content p-10 boxShadow">
     <h3 className="title">結果算出のアルゴリズム(自分で調整する範囲をきめる、調べる範囲をきめる)</h3>
     <p>経験と使い方が存在しない場合に調べても情報を解釈できる前提がある。</p>
     <Content03chart />
     <Content03searchrt />
   </div>
  )
}

export default Content03;
