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

  return (
    <Router history={browserHistory}>
      <Navbar />
      {auth.initializing ? (
        <Loading />
      ) : (
        <div className={classes.routes}>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </div>
      )}
      <Actions />
    </Router>
  );
};

export default App;
