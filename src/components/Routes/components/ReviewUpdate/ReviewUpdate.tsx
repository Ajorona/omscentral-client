import React from 'react';
import { IReview } from '../../../../data/interfaces';
import ReviewForm from '../../../ReviewForm';

interface IProps {
  review: IReview;
}

const ReviewUpdate: React.FC<IProps> = ({ review }) => (
  <ReviewForm review={review} />
);

export default ReviewUpdate;
