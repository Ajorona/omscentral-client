import gql from 'graphql-tag';

export const INSERT_REVIEW = gql`
  mutation insertReview($review: ReviewInputType!) {
    insertReview(review: $review) {
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
