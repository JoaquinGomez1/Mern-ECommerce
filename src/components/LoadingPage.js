import React from "react";
import LoadingComponent from "./LoadingComponent";
import { Typography } from "@material-ui/core";
import "../static/css/LoadingPage.css";

const pageStyle = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,.92)",
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
};

export default function LoadingPage() {
  return (
    <div style={pageStyle}>
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-100%)",
        }}
      >
        <LoadingComponent />
        <Typography variant="h3" color="secondary" className="floatBigAndSmall">
          Welcome!
        </Typography>
        <Typography variant="h6" style={{ color: "rgba(255,255,255,.8)" }}>
          If this is your first time visiting us today
        </Typography>
        <Typography variant="h6" style={{ color: "rgba(255,255,255,.8)" }}>
          please wait a few seconds for our backend to respond.
        </Typography>
      </div>
    </div>
  );
}
