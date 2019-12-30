import gql from 'graphql-tag';

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: String!) {
    deleteReview(id: $id) {
      id
      author_id
      course_id
      semester_id
      difficulty
      workload
      rating
      body
      created
      updated
    }
  }
`;
