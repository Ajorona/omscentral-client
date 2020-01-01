import React, { useContext, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { FirebaseContext } from '../../../Firebase';
import { NotificationContext } from '../../../Notification';
import { Nullable } from '../../../../core';
import SetPassword, { FormData } from './SetPassword';

const SetPasswordContainer: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const notification = useContext(NotificationContext)!;
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<Nullable<string>>(null);
  const params = queryString.parse(useLocation().search);
  const oobCode = typeof params.oobCode === 'string' ? params.oobCode : null;

  useEffect(() => {
    if (!oobCode) {
      setError(true);
      return;
    }
    setLoading(true);
    firebase.auth
      .verifyPasswordResetCode(oobCode)
      .then(email => setEmail(email))
      .catch(error => {
        setError(true);
        notification.error(error.message);
      })
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async ({ password }: FormData) => {
    setLoading(true);
    try {
      await firebase.auth.confirmPasswordReset(oobCode!, password);
      notification.success(`Password set, logging in...`);
      await firebase.auth.signInWithEmailAndPassword(email!, password);
    } catch (error) {
      notification.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="Set Password" />
      <SetPassword
        email={email}
        disabled={loading || error}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SetPasswordContainer;
