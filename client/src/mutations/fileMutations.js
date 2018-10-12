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

const MULTIPLEUPLOADFILES_MUTATION = gql`
  mutation multipleUpload($names: [String!]!, $files: [Upload!]!) {
    multipleUpload(names: $names, files: $files) {
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

const UPDATEFILE_MUTATION = gql`
  mutation($id: ID!, $path: String!, $filename: String!) {
    updateFile(id: $id, path: $path, filename: $filename) {
      id
      path
      filename
    }
  }
`;

export {
  UPLOADFILE_MUTATION,
  MULTIPLEUPLOADFILES_MUTATION,
  DELETEFILE_MUTATION,
  UPDATEFILE_MUTATION,
};
