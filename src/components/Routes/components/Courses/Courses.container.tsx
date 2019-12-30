import React from 'react';
import Helmet from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { ICourse } from '../../../../data/interfaces';
import { GET_COURSES } from '../../../../data/queries';
import Courses from './Courses';

const CoursesContainer: React.FC = () => {
  const { data } = useQuery<{ courses: ICourse[] }>(GET_COURSES);

  return (
    <>
      <Helmet title="Courses" />
      <Courses courses={data?.courses} />
    </>
  );
};

export default CoursesContainer;
