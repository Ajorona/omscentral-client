import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  table: {
    minWidth: '100%',
    tableLayout: 'fixed'
  },
  name: {
    whiteSpace: 'nowrap'
  }
}));
