import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';

import UploadFile from './components/UploadFile';

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
          <UploadFile/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
