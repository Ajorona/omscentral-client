import gql from 'graphql-tag';

export const GET_SPECIALIZATIONS = gql`
  query getSpecializations {
    specializations(orderBy: name) {
      id
      name
      program_id
    }
  }
`;
