import gql from 'graphql-tag';

const FILES_QUERY = gql`
  query files {
    files {
      id
      path
      filename
    }
  }
`;

export { FILES_QUERY };