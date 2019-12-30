import React, { useContext, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NotificationContext } from '../Notification';
import { ISpecialization, IUser, IProgram } from '../../data/interfaces';
import {
  GET_PROGRAMS,
  GET_SPECIALIZATIONS,
  UPDATE_USER
} from '../../data/queries';
import { AuthContext } from '../Auth';
import UserForm, { FormData } from './UserForm';

interface IProps {
  user: IUser;
}

const UserFormContainer: React.FC<IProps> = ({ user }) => {
  const notification = useContext(NotificationContext)!;
  const auth = useContext(AuthContext);
  const mode = useMemo(() => (auth.user?.uid === user.id ? 'edit' : 'view'), [
    auth,
    user
  ]);

  const [programs, specializations] = [
    useQuery<{ programs: IProgram[] }>(GET_PROGRAMS),
    useQuery<{ specializations: ISpecialization[] }>(GET_SPECIALIZATIONS)
  ];

  const [update, updateResult] = useMutation<IUser>(UPDATE_USER);

  const handleSubmit = async (form: FormData) => {
    try {
      await update({ variables: { user: form } });
      notification.success('User updated.');
    } catch {
      notification.error('Something went wrong.');
    }
  };

  if (!programs.data?.programs || !specializations.data?.specializations) {
    return null;
  }

  return (
    <UserForm
      data={{ ...programs.data, ...specializations.data }}
      mode={mode}
      user={user}
      disabled={updateResult.loading}
      onSubmit={handleSubmit}
    />
  );
};

export default UserFormContainer;
