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
  const { title, subtitle, image, _id, qty, isInStock } = props;

  return (
    <Card className='transition' style={{ width: 310, margin: "10px" }}>
      <CardActionArea onClick={props.onCardAreaClick}>
        <CardMedia style={{ height: 180 }} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {subtitle ? `$${subtitle}` : null}
          </Typography>
        </CardContent>
      </CardActionArea>

      {!props.children ? (
        <CardActions>
          <BuyButton
            isInStock={isInStock}
            _id={_id}
            name={title}
            price={subtitle}
            image={image}
            qty={qty}
          />
        </CardActions>
      ) : (
        props.children
      )}
    </Card>
  );
}
