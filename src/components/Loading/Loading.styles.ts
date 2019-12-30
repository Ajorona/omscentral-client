import { makeStyles } from '@material-ui/core/styles';

const size = 12;

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    left: `calc(100vw / 2 - ${theme.spacing(size / 2)}px)`,
    top: `calc(100vh / 2 - ${theme.spacing(8 + size / 2)}px)`
  },
  card: {
    width: theme.spacing(size),
    textAlign: 'center'
  },
  cardContent: {
    padding: theme.spacing(3)
  }
}));
