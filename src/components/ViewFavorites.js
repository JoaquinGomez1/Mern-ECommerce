import React, { useContext, useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { myUserContext } from "../context/UserContext";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function ViewFavorites() {
  const { currentUser } = useContext(myUserContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Do not use useFetch custom hook because the http request must be sent
    //after currentUser has been defined
    const Fetch = async () => {
      const currentUserParsed = await JSON.stringify(currentUser);
      const req = await fetch("http://192.168.0.8:3100/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: currentUserParsed,
      });
      const response = await req.json();
      setData(response);
      setIsLoading(false);
    };
    if (currentUser) {
      // currentUser will be initialized as undefined.
      //To prevent sending an empty body, we first check if the current user has been defined
      Fetch();
    }
  }, [currentUser]);

  return (
    <>
      <Container style={{ minWidth: "80%" }}>
        <Grid container>
          {!isLoading && (
            <Pagination>
              {data &&
                data.map((each) => (
                  <ProductCard
                    _id={each._id}
                    title={each.name}
                    subtitle={each.price}
                    qty={1}
                    isInStock={true}
                    image={each.img}></ProductCard>
                ))}
            </Pagination>
          )}
        </Grid>
      </Container>
    </>
  );
}
