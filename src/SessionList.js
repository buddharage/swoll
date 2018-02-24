import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { List } from 'semantic-ui-react';

import SessionForm from './SessionForm';

const GET_SESSIONS = gql`
  query SessionsQuery {
    sessions {
      _id
      date
      activities {
        exerciseId
        sets {
          weight
          reps
          duration
        }
      }
    }
  }
`;

export default graphql(GET_SESSIONS)(props => {
  const { sessions = [] } = props.data;

  const items = sessions.map(session => {
    const { _id, date } = session;
    return (
      <List.Item key={_id}>
        <Link to={`/session/${_id}`}>
          {new Date(date).toLocaleDateString('en-US')}
        </Link>
      </List.Item>
    );
  });

  return (
    <div>
      <SessionForm />
      <List divided relaxed items={items} />
    </div>
  );
});
