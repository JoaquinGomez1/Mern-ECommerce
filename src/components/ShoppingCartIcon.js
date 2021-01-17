import React from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 0,
    padding: "0 4px",
    fontWeight: "bold",
    border: "1px solid #fff",
  },
}))(Badge);

export default function CustomizedBadges({ badgeContent }) {
  return (
    <StyledBadge badgeContent={badgeContent} color="secondary">
      <ShoppingCartIcon style={{ color: "#fff" }} />
    </StyledBadge>
  );
}
