import gql from 'graphql-tag';

export const GET_CONFIG = gql`
  query getConfig($id: String!) {
    config(id: $id) {
      id
      value
    }
  }
`;
