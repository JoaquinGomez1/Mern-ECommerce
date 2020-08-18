import React, { useContext, Children, useEffect } from "react";
import { mySlideshowContext } from "./context/SlideshowContext.js";

export default function SlideShow(props) {
  const [state, setState] = useContext(mySlideshowContext);

  const INTERVAL_DURATION = props.duration ? props.duration : 2000;

  useEffect(() => {
    setState({
      total: Children.count(props.children),
      current: 0,
    });
  }, []);

  useEffect(() => {
    const myInterval = setInterval(moveNext, INTERVAL_DURATION);
    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line
  }, [state]);

  const moveNext = () => {
    if (state.current === state.total - 1) setState({ ...state, current: 0 });
    else setState({ ...state, current: state.current + 1 });
  };

  const bullets = Array(state.total).fill("o");
  bullets[state.current] = "◙";

  return (
    <div style={{ marginTop: "20px" }}>
      {Children.toArray(props.children)[state.current]}
      <p>{bullets}</p>
      <p>
        {state.current + 1} / {state.total}
      </p>
    </div>
  );
}
