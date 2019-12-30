import React from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '../../../Link';
import Button from '../../../Button';
import { paths } from '../../../../constants';
import { useStyles } from './ResetPassword.styles';

export type FormData = {
  email: string;
};

interface IProps {
  disabled?: boolean;
  onSubmit: (form: FormData) => void;
}

const ResetPassword: React.FC<IProps> = ({ disabled, onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm<FormData>();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                variant="outlined"
                fullWidth
                required
                autoFocus
                disabled={disabled}
                inputRef={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address.'
                  }
                })}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth disabled={disabled}>
            Reset
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={paths.login}>Remembered? Login</Link>
            </Grid>
            <Grid item>
              <Link to={paths.register}>Need an account? Register</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;