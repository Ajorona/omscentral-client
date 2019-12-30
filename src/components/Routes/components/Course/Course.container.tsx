import React from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { GET_COURSE } from '../../../../data/queries';
import { ICourse } from '../../../../data/interfaces';
import Course from './Course';

const CourseContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<{ course: ICourse }>(GET_COURSE, {
    variables: {
      id
    }
  });

  return (
    <>
      <Helmet title={id} />
      {data?.course ? <Course course={data.course} /> : null}
    </>
  );
};

export default CourseContainer;
