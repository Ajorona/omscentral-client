import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';

interface IProps {
  value?: boolean;
}

const TrueFalse: React.FC<IProps> = ({ value }) => (
  <Typography variant="body2">
    {value ? <CheckIcon fontSize="small" /> : null}
  </Typography>
);

export default TrueFalse;
