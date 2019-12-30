import React from 'react';
import { IUser } from '../../../../data/interfaces';
import UserForm from '../../../UserForm';

interface IProps {
  user?: IUser;
}

const UserProfile: React.FC<IProps> = ({ user }) =>
  user ? <UserForm user={user} /> : null;

export default UserProfile;
