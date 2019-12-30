import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    padding: '0 !important'
  },
  metric: {
    textAlign: 'center',
    padding: theme.spacing(2),
    borderRight: '1px solid #efefef',
    '&:last-child': {
      borderRight: 'none'
    }
  }
}));
