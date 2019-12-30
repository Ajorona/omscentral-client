import React, { useContext } from 'react';
import GitHubButton from 'react-github-btn';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { paths } from '../../constants';
import { AuthContext } from '../Auth';
import { FirebaseContext } from '../Firebase';
import Grow from '../Grow';
import UserMenu from './components/UserMenu';
import NavbarButton from './components/NavbarButton';
import { useStyles } from './Navbar.styles';

const Navbar: React.FC = () => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const auth = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            OMSCentral
          </Typography>
          <NavbarButton path={paths.courses}>Courses</NavbarButton>
          <NavbarButton path={paths.reviews}>Reviews</NavbarButton>
          <Grow />
          {auth.initializing ? null : auth.authenticated ? (
            <NavbarButton
              onClick={() => firebase.auth.signOut()}
              path={paths.login}
            >
              Logout
            </NavbarButton>
          ) : (
            <NavbarButton path={paths.login}>Login</NavbarButton>
          )}
          {auth.initializing ? null : auth.authenticated && <UserMenu />}
          <div className={classes.git}>
            <GitHubButton
              href="https://github.com/OMSCentral/omscentral-client"
              aria-label="Star OMSCentral/omscentral-client on GitHub"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
