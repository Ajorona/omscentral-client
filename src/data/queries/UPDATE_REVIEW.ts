import gql from 'graphql-tag';

export const UPDATE_REVIEW = gql`
  mutation updateReview($review: ReviewInputType!) {
    updateReview(review: $review) {
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
