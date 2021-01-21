import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";

export default function Alert(props) {
  const [success] = useState(props.success);
  const theme = useTheme();

  const backgroundColor = success ? green[600] : theme.palette.secondary.main;

  const boxStyle = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    padding: "20px 30px",
    borderRadius: "5px",
    boxShadow: "4px 6px 4px rgba(0,0,0,.2)",
    backgroundColor,
    color: "#fff",
  };

  return <Box style={boxStyle}>{props.children}</Box>;
}
