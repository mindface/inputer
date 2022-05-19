import React from "react";
import FormSection from "../components/FormSection";
import Container from "@mui/material/Container";

function Home() {
  return (
    <div className="content home">
      <Container maxWidth="sm">
        <FormSection />
      </Container>
    </div>
  );
}

export default Home;
