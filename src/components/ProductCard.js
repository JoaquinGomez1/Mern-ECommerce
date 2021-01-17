import React from "react";
import {
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";
import BuyButton from "./BuyButton";

export default function ProductCard(props) {
  const { itemObject } = props;
  const { name, price, img } = itemObject;

  return (
    <Card className="transition" style={{ width: 310, margin: "10px" }}>
      <CardActionArea onClick={props.onCardAreaClick}>
        <CardMedia style={{ height: 180 }} image={img} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price ? `$${price}` : null}
          </Typography>
        </CardContent>
      </CardActionArea>

      {!props.children ? (
        <CardActions>
          <BuyButton itemObject={itemObject} />
        </CardActions>
      ) : (
        props.children
      )}
    </Card>
  );
}
