import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

export default function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{ color: "white", fontWeight: "bold" }}>
        {props.text}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {props.children}
      </Menu>
    </div>
  );
}
