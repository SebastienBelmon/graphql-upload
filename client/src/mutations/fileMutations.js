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

const DELETEFILE_MUTATION = gql`
  mutation deleteFile($id: ID!, $path: String!) {
    deleteFile(id: $id, path: $path) {
      id
      path
      filename
    }
  }
`;

export { UPLOADFILE_MUTATION, DELETEFILE_MUTATION };
