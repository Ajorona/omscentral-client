import React, { useContext, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NotificationContext } from '../Notification';
import { ICourse, ISemester, IReview } from '../../data/interfaces';
import {
  GET_COURSES,
  GET_SEMESTERS,
  INSERT_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW
} from '../../data/queries';
import { AuthContext } from '../Auth';
import ReviewForm, { FormData } from './ReviewForm';

interface IProps {
  review?: IReview;
}

const ReviewFormContainer: React.FC<IProps> = ({ review }) => {
  const notification = useContext(NotificationContext)!;
  const history = useHistory();
  const auth = useContext(AuthContext);
  const mode = useMemo(
    () =>
      !review ? 'make' : auth.user?.uid === review.author_id ? 'edit' : 'view',
    [auth, review]
  );

  const [courses, semesters] = [
    useQuery<{ courses: ICourse[] }>(GET_COURSES),
    useQuery<{ semesters: ISemester[] }>(GET_SEMESTERS)
  ];

  const [
    [insert, { loading: creating }],
    [update, { loading: updating }],
    [remove, { loading: removing }]
  ] = [
    useMutation<IReview, { review: Partial<IReview> }>(INSERT_REVIEW),
    useMutation<IReview, { review: Partial<IReview> }>(UPDATE_REVIEW),
    useMutation<IReview, { id: string }>(DELETE_REVIEW)
  ];

  const handleSubmit = async (form: FormData) => {
    try {
      const author_id = auth.user!.uid;
      if (mode === 'make') {
        await insert({ variables: { review: { ...form, author_id } } });
        notification.success('Review published.');
        history.push(`/course/${form.course_id}`);
      } else if (mode === 'edit') {
        await update({ variables: { review: { ...form, author_id } } });
        notification.success('Review updated.');
      }
    } catch {
      notification.error('Something went wrong.');
    }
  };

  const handleDelete = async () => {
    try {
      await remove({ variables: { id: review!.id } });
      notification.success('Review deleted.');
      history.replace(`/course/${review!.course_id}`);
    } catch {
      notification.error('Something went wrong.');
    }
  };

  if (!courses.data?.courses || !semesters.data?.semesters) {
    return null;
  }

  return (
    <ReviewForm
      data={{ ...courses.data, ...semesters.data }}
      mode={mode}
      review={review}
      disabled={creating || updating || removing}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
};

export default ReviewFormContainer;
