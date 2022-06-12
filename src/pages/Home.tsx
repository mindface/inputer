/* eslint-disable */

import React, { useEffect } from "react";
import FormSection from "../components/FormSection";
import Container from "@mui/material/Container";

function Home() {
  return (
    <div className="content home">
      <Container maxWidth="sm">
        <div id="area">認識に対する人の構造レベルを昇華する。</div>
        <FormSection />
      </Container>
    </div>
  );
}

export default Home;
