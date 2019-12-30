import React from 'react';
import { GET_COURSE_REVIEWS } from '../../../../data/queries';
import { ICourse } from '../../../../data/interfaces';
import ReviewCardListConnected from '../../../ReviewCardListConnected';
import Metrics from './components/Metrics';

interface IProps {
  course: ICourse;
}

const Course: React.FC<IProps> = ({ course }) => (
  <ReviewCardListConnected
    query={GET_COURSE_REVIEWS}
    variables={{ id: course.id }}
    before={<Metrics course={course} />}
    fetchPolicy="no-cache"
  />
);

export default Course;
