import React from 'react';
import Helmet from 'react-helmet';
import { GET_REVIEWS } from '../../../../data/queries';
import ReviewCardListConnected from '../../../ReviewCardListConnected';

const ReviewsContainer: React.FC = () => (
  <>
    <Helmet title="Reviews" />
    <ReviewCardListConnected
      query={GET_REVIEWS}
      message="Showing recent reviews..."
      fetchPolicy="no-cache"
    />
  </>
);

export default ReviewsContainer;
