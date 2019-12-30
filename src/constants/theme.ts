import { createMuiTheme } from '@material-ui/core';
// import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3B3B3',
      main: '#002F56',
      dark: '#00122B',
      contrastText: '#fff'
    },
    secondary: {
      light: '#EAAA00',
      main: '#EAAA00',
      dark: '#DB7F00',
      contrastText: '#000'
    }
  }
});
