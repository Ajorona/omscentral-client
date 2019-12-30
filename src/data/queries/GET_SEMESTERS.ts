import gql from 'graphql-tag';

export const GET_SEMESTERS = gql`
  query getSemesters {
    semesters(orderByDesc: id, idNotIn: ["0000-0"]) {
      id
      year
      season
      name
    }
  }
`;
