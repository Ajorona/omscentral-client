import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    marginRight: theme.spacing(2)
  },
  git: {
    marginLeft: theme.spacing(1),
    marginBottom: -5
  }
}));
