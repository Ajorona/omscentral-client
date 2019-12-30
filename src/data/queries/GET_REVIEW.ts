import gql from 'graphql-tag';

export const GET_REVIEW = gql`
  query getReview($id: String!) {
    review(id: $id) {
      id
      author_id
      author {
        id
        email
      }
      course_id
      course {
        id
        name
      }
      semester_id
      semester {
        id
        name
        season
      }
      difficulty
      rating
      workload
      body
      created
      updated
    }
  }
`;
