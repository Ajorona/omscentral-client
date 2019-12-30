import React from 'react';
import Helmet from 'react-helmet';
import ReviewCreate from './ReviewCreate';

const ReviewCreateContainer: React.FC = () => (
  <>
    <Helmet title="Create Review" />
    <ReviewCreate />
  </>
);

export default ReviewCreateContainer;
