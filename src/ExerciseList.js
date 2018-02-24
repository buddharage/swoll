import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { List } from 'semantic-ui-react';

import ExerciseForm from './ExerciseForm';

import { GET_EXERCISES } from './queries';

export default graphql(GET_EXERCISES)(props => {
  const { exercises = [] } = props.data;

  const items = exercises.map(session => {
    const { _id, name } = session;
    return (
      <List.Item key={_id}>
        <Link to={`/exercise/${_id}`}>{name}</Link>
      </List.Item>
    );
  });

  return (
    <div>
      <ExerciseForm />
      <List divided relaxed items={items} />
    </div>
  );
});
