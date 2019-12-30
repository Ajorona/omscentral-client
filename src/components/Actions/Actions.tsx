import React, { useContext, useState, useMemo } from 'react';
import { useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
import BarChartIcon from '@material-ui/icons/BarChart';
import LegacyIcon from '@material-ui/icons/Launch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { AuthContext } from '../Auth';
import { paths } from '../../constants';
import { useStyles } from './Actions.styles';

enum Action {
  CreateReview = 'create-review',
  OpenTableau = 'open-tableau',
  OpenLegacy = 'open-legacy'
}

interface IAction {
  key: Action;
  auth?: boolean;
  name: string;
  icon: JSX.Element;
}

const actions: IAction[] = [
  {
    key: Action.CreateReview,
    auth: true,
    name: 'Create Review',
    icon: <EditIcon />
  },
  {
    key: Action.OpenTableau,
    name: 'Tableau Grade Reports',
    icon: <BarChartIcon />
  },
  {
    key: Action.OpenLegacy,
    name: 'Legacy Website',
    icon: <LegacyIcon />
  }
];

const Actions: React.FC = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (key: Action) => () => {
    setOpen(false);
    switch (key) {
      case Action.CreateReview:
        return history.push(paths.review.create);
      case Action.OpenTableau:
        return window.open('https://tableau.gatech.edu');
      case Action.OpenLegacy:
        return window.open('https://gt-surveyor.firebaseapp.com');
      default:
        return;
    }
  };

  const available = useMemo(
    () => actions.filter(action => !action.auth || auth.authenticated),
    [auth.authenticated]
  );

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="actions"
        icon={<SpeedDialIcon />}
        direction="up"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        {available.map(({ key, icon, name }) => (
          <SpeedDialAction
            key={key}
            icon={icon}
            tooltipTitle={name}
            onClick={handleClick(key)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Actions;
