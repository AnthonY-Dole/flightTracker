import React from "react";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import CssBaseLine from "@mui/material/CssBaseline";
import Router from "./routes/index";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseLine>
          <Router />
        </CssBaseLine>
      </ThemeProvider>
    </div>
  );
}

export default App;
