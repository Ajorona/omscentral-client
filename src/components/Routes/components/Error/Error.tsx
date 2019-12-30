import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '../../../Link';
import { paths } from '../../../../constants';
import { useStyles } from './Error.styles';

interface IProps {
  text: string;
}

const ErrorUI: React.FC<IProps> = ({ text }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ErrorOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
        <Link className={classes.link} to={paths.landing}>
          Home
        </Link>
      </div>
    </Container>
  );
};

export default ErrorUI;
