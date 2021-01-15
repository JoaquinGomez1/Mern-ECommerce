import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "@material-ui/core/styles";
import MuiCustomTheme from "./MuiTheme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiCustomTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
