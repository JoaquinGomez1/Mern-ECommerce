import React, { useContext, Children, useEffect } from "react";
import { mySlideshowContext } from "./context/SlideshowContext.js";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

export default function SlideShow(props) {
  const [state, setState] = useContext(mySlideshowContext);

  const defaultInterval = 2000;
  const INTERVAL_DURATION = props.duration ? props.duration : defaultInterval;

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
  }, [state, props.children, setState]);

  const moveNext = () => {
    if (state.current === state.total - 1) setState({ ...state, current: 0 });
    else setState({ ...state, current: state.current + 1 });
  };

  const bullets = Array(state.total).fill(<RadioButtonUncheckedIcon />);
  bullets[state.current] = (
    <FiberManualRecordIcon style={{ fontSize: "30px" }} />
  );

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
