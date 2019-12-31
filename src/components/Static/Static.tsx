import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { useStyles } from './Static.styles';

interface IProps {
  html: string;
}

const Static: React.FC<IProps> = ({ html }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Card>
          <CardContent className={classes.cardContent}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Static;
