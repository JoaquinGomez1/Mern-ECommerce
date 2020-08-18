import React, { useState } from "react";

export const mySlideshowContext = React.createContext();

export default function SlideshowContext(props) {
  const [state, setState] = useState([{ total: 0, current: 0 }]);

  return <mySlideshowContext.Provider value={[state, setState]} {...props} />;
}
