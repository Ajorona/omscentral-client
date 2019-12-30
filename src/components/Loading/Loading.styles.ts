import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }
  },
  card: {
    textAlign: 'center'
  },
  cardContent: {
    padding: theme.spacing(3)
  }
}));
