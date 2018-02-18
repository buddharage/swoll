import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './App.css';

const GET_SESSIONS = gql`
  query SessionsQuery {
    sessions {
      _id
      date
      activities
    }
  }
`;

function App(props) {
  console.log(props.data);
  return <pre />;
}

export default graphql(GET_SESSIONS)(App);
