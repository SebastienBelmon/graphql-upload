import React from 'react';
import { Query, Mutation } from 'react-apollo';

import { FILES_QUERY } from '../queries/uploads';
import { DELETEFILE_MUTATION } from '../mutations/fileMutations';

const Files = () => {
  return (
    <Query query={FILES_QUERY} pollInterval={1500}>
      {({ data: { files }, loading, error }) => {
        if (loading) {
          return <div>Loading Files...</div>;
        }

        if (error) {
          return <div>ERROR !</div>;
        }

        return (
          <table>
            <thead>
              <tr>
                <th>filename</th>
                <th>path</th>
                <th>download link</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {files.map(({ id, path, filename }) => {
                const displayPath = path.replace(/images/gi, 'static');
                return (
                  <tr key={id}>
                    <td>{filename}</td>
                    <td>
                      <a
                        href={`http://localhost:4000/${displayPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {path}
                      </a>
                    </td>
                    <td>
                      <a href={`http://localhost:4000/${path}`} download>
                        Download
                      </a>
                    </td>
                    <td>
                      <Mutation mutation={DELETEFILE_MUTATION}>
                        {deleteFile => (
                          <button
                            onClick={() =>
                              deleteFile({
                                variables: {
                                  id,
                                  path,
                                },
                              })
                            }
                          >
                            Delete
                          </button>
                        )}
                      </Mutation>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }}
    </Query>
  );
};

export default Files;
