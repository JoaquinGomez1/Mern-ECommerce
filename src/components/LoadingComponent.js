import React from "react";
import "../static/css/Loader.css";
import { useTheme } from "@material-ui/core/styles";

export default function LoadingComponent() {
  const theme = useTheme();
  const items = [];
  const numberOfLoadingItems = 5;
  for (let i = 0; i < numberOfLoadingItems; i++) {
    items.push(
      <div
        key={Math.random()}
        className="loader-item"
        style={{ backgroundColor: theme.palette.secondary.main }}
      ></div>
    );
  }

  return <div className="loader-container">{items}</div>;
}
