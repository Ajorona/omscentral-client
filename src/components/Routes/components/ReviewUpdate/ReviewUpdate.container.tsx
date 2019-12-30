import React from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { IReview } from '../../../../data/interfaces';
import { GET_REVIEW } from '../../../../data/queries';
import ReviewUpdate from './ReviewUpdate';

const ReviewUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<{ review: IReview }>(GET_REVIEW, {
    variables: {
      id
    },
    fetchPolicy: 'no-cache'
  });

  return (
    <>
      <Helmet title="Update Review" />
      {data?.review ? <ReviewUpdate review={data.review} /> : null}
    </>
  );
};

export default ReviewUpdateContainer;
