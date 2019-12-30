import gql from 'graphql-tag';

export const GET_PROGRAMS = gql`
  query getPrograms {
    programs(orderBy: name) {
      id
      name
    }
  }
`;
