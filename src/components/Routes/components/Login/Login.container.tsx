import React, { useContext, useState } from 'react';
import Helmet from 'react-helmet';
import { auth } from 'firebase/app';
import { FirebaseContext } from '../../../Firebase';
import { NotificationContext } from '../../../Notification';
import Login, { FormData } from './Login';

const LoginContainer: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const notification = useContext(NotificationContext)!;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      notification.error(error.message);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: auth.AuthProvider) => {
    setLoading(true);
    try {
      await firebase.auth.signInWithPopup(provider);
    } catch (error) {
      notification.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <Login
        disabled={loading}
        onSubmit={handleSubmit}
        onSocialLogin={handleSocialLogin}
      />
    </>
  );
};

export default LoginContainer;
