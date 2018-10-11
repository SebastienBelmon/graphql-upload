import React from 'react';
import { Query } from 'react-apollo';

import { FILES_QUERY } from '../queries/uploads';

const Files = () => {
  return (
    <Query
      query={FILES_QUERY}
    >
    {({ data: { files }, loading, error }) => {
      if (loading) {
        return <div>Loading Files...</div>
      }

      if (error) {
        return <div>ERROR !</div>
      }

      return (
        <ul>
          {files.map(({ id, path, filename }) => (
            <li key={id}><a href={`http://localhost:4000/${path}`}>{filename}</a></li>
          ))}
        </ul>
      )
    }}
    </Query>
  )
}

export default Files;
