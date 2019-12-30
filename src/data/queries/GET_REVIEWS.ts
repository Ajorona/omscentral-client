import gql from 'graphql-tag';

export const GET_REVIEWS = gql`
  query getReviews(
    $offset: [Int] = 0
    $limit: [Int] = 100
    $orderByDesc: OmscentralReviewPropertiesEnum = created
    $orderByDescToo: String = "created"
  ) {
    reviews(
      offset: $offset
      limit: $limit
      orderByDesc: $orderByDesc
      orderByDescToo: $orderByDescToo
    ) {
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
