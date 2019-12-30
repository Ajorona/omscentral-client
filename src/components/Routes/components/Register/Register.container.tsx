import React, { useContext, useState } from 'react';
import Helmet from 'react-helmet';
import { FirebaseContext } from '../../../Firebase';
import { NotificationContext } from '../../../Notification';
import Register, { FormData } from './Register';

const RegisterContainer: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const notification = useContext(NotificationContext)!;

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    try {
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      notification.success(`Registered as ${user!.email}.`);
    } catch (error) {
      notification.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Register" />
      <Register disabled={loading} onSubmit={handleSubmit} />
    </>
  );
};

export default RegisterContainer;
