import gql from 'graphql-tag';

const UPLOADFILE_MUTATION = gql`
  mutation singleUpload($filename: String!, $file: Upload!) {
    singleUpload(filename: $filename, file: $file) {
      id
      path
      filename
    }
  }
`;

export { UPLOADFILE_MUTATION };
