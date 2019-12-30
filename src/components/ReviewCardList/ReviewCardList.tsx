import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { IReview } from '../../data/interfaces';
import { NotificationContext } from '../Notification';
import { useStyles } from './ReviewCardList.styles';
import ReviewCard from '../ReviewCard';

interface IProps {
  reviews?: IReview[];
  whenEmpty?: JSX.Element;
  before?: JSX.Element;
  after?: JSX.Element;
}

const ReviewCardList: React.FC<IProps> = ({
  reviews,
  whenEmpty = <Typography>No reviews.</Typography>,
  before,
  after
}) => {
  const classes = useStyles();
  const notification = useContext(NotificationContext)!;

  const getDeepLink = (id: string): string =>
    `${location.protocol}//${location.host}/review/${id}`; // eslint-disable-line no-restricted-globals

  const handleDeepLinkCopy = () => {
    notification.success('Link copied to clipboard.');
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        {reviews?.length ? (
          <Grid container spacing={2}>
            {before && (
              <Grid item xs={12}>
                {before}
              </Grid>
            )}

            {reviews.map(review => (
              <Grid item xs={12} key={review.id}>
                <ReviewCard
                  review={review}
                  deepLink={getDeepLink}
                  onDeepLinkCopy={handleDeepLinkCopy}
                />
              </Grid>
            ))}

            {after && (
              <Grid item xs={12}>
                {after}
              </Grid>
            )}
          </Grid>
        ) : (
          whenEmpty
        )}
      </div>
    </Container>
  );
};

export default ReviewCardList;
