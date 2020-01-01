import React, { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance';
import { firebaseConfig } from '../../config';

const app = firebase.initializeApp(firebaseConfig);

firebase.performance(app);

interface IFirebase {
  auth: firebase.auth.Auth;
  authProviders: {
    facebook: firebase.auth.AuthProvider;
    github: firebase.auth.AuthProvider;
    google: firebase.auth.AuthProvider;
    twitter: firebase.auth.AuthProvider;
  };
}

const value: IFirebase = {
  auth: app.auth(),
  authProviders: {
    facebook: (() => {
      // https://firebase.google.com/docs/auth/web/facebook-login
      const p = new firebase.auth.FacebookAuthProvider();
      p.addScope('email');
      return p;
    })(),
    github: (() => {
      // https://firebase.google.com/docs/auth/web/github-auth
      const p = new firebase.auth.GithubAuthProvider();
      p.addScope('user');
      return p;
    })(),
    google: (() => {
      // https://firebase.google.com/docs/auth/web/google-signin
      const p = new firebase.auth.GoogleAuthProvider();
      p.addScope('profile');
      p.addScope('email');
      return p;
    })(),
    twitter: (() => {
      // https://firebase.google.com/docs/auth/web/twitter-login
      return new firebase.auth.TwitterAuthProvider();
    })()
  }
};

export const FirebaseContext = createContext<IFirebase>(value);

const Firebase: React.FC = ({ children }) => (
  <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
);

export default Firebase;
