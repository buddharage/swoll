import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import 'semantic-ui-css/semantic.min.css';
import theme from './theme';

// App specific imports
import App from './App';
import Session from './Session';
import SessionList from './SessionList';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://swoll-api.herokuapp.com/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App>
          <Route exact path="/" component={SessionList} />
          <Route path="/session/:id" component={Session} />
        </App>
      </BrowserRouter>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
