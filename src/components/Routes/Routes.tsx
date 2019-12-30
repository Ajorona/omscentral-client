import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router';
import { paths } from '../../constants';
import Route from './components/Route';

interface IRoute {
  path: string;
  auth?: boolean;
  component: React.ComponentType<any>;
}

const routes: IRoute[] = [
  {
    path: paths.error,
    component: lazy(() => import('./components/Error'))
  },
  {
    path: paths.landing,
    component: lazy(() => import('./components/Landing'))
  },
  {
    path: paths.courses,
    component: lazy(() => import('./components/Courses'))
  },
  {
    path: paths.course,
    component: lazy(() => import('./components/Course'))
  },
  {
    path: paths.review.create,
    component: lazy(() => import('./components/ReviewCreate')),
    auth: true
  },
  {
    path: paths.review.update,
    component: lazy(() => import('./components/ReviewUpdate'))
  },
  {
    path: paths.reviews,
    component: lazy(() => import('./components/Reviews'))
  },
  {
    path: paths.login,
    component: lazy(() => import('./components/Login')),
    auth: false
  },
  {
    path: paths.register,
    component: lazy(() => import('./components/Register')),
    auth: false
  },
  {
    path: paths.resetPassword,
    component: lazy(() => import('./components/ResetPassword')),
    auth: false
  },
  {
    path: paths.setPassword,
    component: lazy(() => import('./components/SetPassword')),
    auth: false
  },
  {
    path: paths.userProfile,
    component: lazy(() => import('./components/UserProfile')),
    auth: true
  },
  {
    path: paths.userReviews,
    component: lazy(() => import('./components/UserReviews')),
    auth: true
  },
  {
    path: '*',
    component: () => <Redirect to="/error/404" />
  }
];

const Routes: React.FC = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.path} exact {...route} />
    ))}
  </Switch>
);

export default Routes;
