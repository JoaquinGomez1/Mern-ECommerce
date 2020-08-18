import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BuyButton from "./BuyButton";

const useStyles = makeStyles({
  root: {
    minWidth: 310,
  },
  media: {
    height: 180,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  const { title, subtitle, image, id } = props;

  return (
    <Card className={"transition"} style={{ minWidth: 310, margin: "10px" }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <BuyButton id={id} name={title} price={subtitle} image={image} />
      </CardActions>
    </Card>
  );
}
