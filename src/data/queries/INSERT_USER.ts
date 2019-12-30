import gql from 'graphql-tag';

export const INSERT_USER = gql`
  mutation insertUser($user: UserInputType!) {
    insertUser(user: $user) {
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
