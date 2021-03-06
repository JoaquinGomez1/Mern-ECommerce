import React, { useContext, Children, useEffect } from "react";
import { mySlideshowContext } from "../context/SlideshowContext.js";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useTheme } from "@material-ui/core/styles";

export default function SlideShow(props) {
  const [state, setState] = useContext(mySlideshowContext);
  const childrenArray = props.children.slice(0, 4); // Allow a maximum of 4 children
  const defaultInterval = 2000;
  const intervalDuration = props.duration ? props.duration : defaultInterval;

  const theme = useTheme();
  const secondaryMainColor = theme.palette.secondary.main;

  useEffect(() => {
    const myInterval = setInterval(moveNext, intervalDuration);
    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    setState({
      total: Children.count(childrenArray),
      current: state.current,
    });
    // eslint-disable-next-line
  }, [props, setState]);

  const changeIndex = (e) => {
    // Create a new array from the html collection of children of the div that contains each child
    //and get the index of the one that was clicked
    const index = Array.from(e.currentTarget.children).indexOf(e.target);
    if (index !== -1) {
      setState({
        ...state,
        current: index,
      });
    }
  };

  const moveNext = () => {
    if (state.current >= state.total - 1) setState({ ...state, current: 0 });
    else setState({ ...state, current: state.current + 1 });
  };

  const bullets = Array(state.total).fill(
    <RadioButtonUncheckedIcon style={{ cursor: "pointer" }} />
  );
  bullets[state.current] = (
    <RadioButtonCheckedIcon
      key="current"
      style={{ color: secondaryMainColor }}
    />
  );

  return (
    <div key={state.current.name} style={{ marginTop: "20px" }}>
      {Children.toArray(childrenArray)[state.current]}
      <div onClick={changeIndex}>{bullets}</div>
      <p>
        {state.current + 1} / {state.total}
      </p>
    </div>
  );
}
