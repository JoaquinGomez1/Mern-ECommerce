import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#474747",
    },
    white: {
      main: "#fff",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default theme;
