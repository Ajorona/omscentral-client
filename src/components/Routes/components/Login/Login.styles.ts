import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

export const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  social: {
    margin: theme.spacing(4, 0, 0),
    padding: theme.spacing(0, 6)
  },
  facebook: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900]
  },
  github: {
    color: theme.palette.getContrastText(grey[300]),
    backgroundColor: grey[300]
  },
  google: {
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600]
  },
  twitter: {
    color: theme.palette.common.white,
    backgroundColor: lightBlue[300]
  }
}));
