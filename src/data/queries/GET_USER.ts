import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser($id: String!) {
    user(id: $id) {
      id
      auth_provider
      email
      name
      photo_url
      program_id
      specialization_id
      last_signed_in
    }
  }
`;
