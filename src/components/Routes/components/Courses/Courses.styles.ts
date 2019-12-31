import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  table: {
    minWidth: '100%',
    tableLayout: 'fixed'
  },
  name: {
    whiteSpace: 'nowrap'
  }
}));
