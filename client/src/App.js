import { Container, Wrapper } from "./layout/layout";
import { StylesProvider } from "@material-ui/styles";
import FileExetensions from "./component/FileExetensions";
import FileUpload from "./component/FileUpload";
import { useState } from "react";

function App() {
  return (
    <StylesProvider injectFirst>
      <Container>
        <Wrapper>
          <FileExetensions />
        </Wrapper>
        <Wrapper>
          <FileUpload />
        </Wrapper>
      </Container>
    </StylesProvider>
  );
}

export default App;
