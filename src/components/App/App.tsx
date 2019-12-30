import React, { useContext, Suspense } from 'react';
import { Router } from 'react-router-dom';
import { browserHistory } from '../../constants';
import { AuthContext } from '../Auth';
import Actions from '../Actions';
import Loading from '../Loading';
import Navbar from '../Navbar';
import Routes from '../Routes';
import { useStyles } from './App.styles';

const App: React.FC = () => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  if (auth.initializing) {
    return <Loading />;
  }

  return (
    <Router history={browserHistory}>
      <Navbar />
      <div className={classes.routes}>
        <Suspense fallback={<div />}>
          <Routes />
        </Suspense>
      </div>
      <Actions />
    </Router>
  );
};

export default App;
