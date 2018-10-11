import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';

import UploadFile from './components/UploadFile';
import Files from './components/Files';

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        Hello There!
        <div>
          <h1>Upload file</h1>
          <UploadFile/>
        </div>
        <div>
          <h1>List of file (dowload ?)</h1>
          <Files/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
