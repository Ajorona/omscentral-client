import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($user: UserInputType!) {
    updateUser(user: $user) {
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
