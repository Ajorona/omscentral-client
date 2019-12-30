import gql from 'graphql-tag';

export const GET_COURSE = gql`
  query getCourse($id: String!) {
    course(id: $id) {
      id
      department
      number
      name
      foundational
      deprecated
      metric {
        data {
          review_count
          difficulty {
            mean
            median
            mode
            min
            max
          }
          workload {
            mean
            median
            mode
            min
            max
          }
          rating {
            mean
            median
            mode
            min
            max
          }
        }
      }
    }
  }
`;
