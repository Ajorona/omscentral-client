import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '../Button';
import Paper from '../Paper';
import White from '../White';
import { IProgram, ISpecialization, IUser } from '../../data/interfaces';
import { useStyles } from './UserForm.styles';

export type FormData = {
  id: string;
  auth_provider: string;
  email: string;
  name: string;
  program_id: string;
  specialization_id: string;
};

interface IProps {
  data: {
    programs: IProgram[];
    specializations: ISpecialization[];
  };
  mode: 'edit' | 'view';
  user?: IUser;
  disabled?: boolean;
  onSubmit: (form: FormData) => void;
}

const UserForm: React.FC<IProps> = ({
  data,
  mode,
  user,
  disabled,
  onSubmit
}) => {
  const classes = useStyles();

  const { handleSubmit, register, errors, watch, setValue } = useForm<FormData>(
    {
      defaultValues: {
        id: user?.id,
        auth_provider: user?.auth_provider,
        email: user?.email || '',
        name: user?.name || '',
        program_id: user?.program_id || '',
        specialization_id: user?.specialization_id || ''
      }
    }
  );

  const { program_id } = watch();

  const specializations = useMemo(
    () =>
      program_id
        ? (data?.specializations || []).filter(s => s.program_id === program_id)
        : [],
    [program_id, data]
  );

  const [title, action] = useMemo(
    () => (mode === 'edit' ? ['Update User', 'Update'] : ['User', null]),
    [mode]
  );

  return (
    <Container component="main" maxWidth="sm">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <AccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="id"
                name="id"
                label="ID"
                autoComplete="id"
                variant="outlined"
                fullWidth
                disabled
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="auth_provider"
                name="auth_provider"
                label="Auth Provider"
                autoComplete="auth_provider"
                variant="outlined"
                fullWidth
                disabled
                inputRef={register}
              />
            </Grid>
            {user?.email && (
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  variant="outlined"
                  fullWidth
                  disabled
                  inputRef={register}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                variant="outlined"
                autoFocus
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="program_id"
                name="program_id"
                label="Program"
                autoComplete="program_id"
                variant="outlined"
                fullWidth
                required
                disabled={
                  disabled || mode === 'view' || !data?.programs?.length
                }
                onChange={() => setValue('specialization_id', '')}
                inputRef={register({ required: true })}
                error={Boolean(errors.program_id)}
                helperText={errors.program_id && errors.program_id.message}
                SelectProps={{ native: true }}
              >
                {(data?.programs || []).map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="specialization_id"
                name="specialization_id"
                label="Specialization"
                autoComplete="specialization_id"
                variant="outlined"
                fullWidth
                required
                disabled={
                  disabled || mode === 'view' || !specializations.length
                }
                inputRef={register({ required: true })}
                error={Boolean(errors.specialization_id)}
                helperText={
                  errors.specialization_id && errors.specialization_id.message
                }
                SelectProps={{ native: true }}
              >
                {specializations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button type="submit" size="large" fullWidth disabled={disabled}>
            {action}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserForm;
