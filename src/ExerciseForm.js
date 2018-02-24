import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Button, Form } from 'semantic-ui-react';

import { GET_EXERCISES } from './queries';

const ADD_EXERCISE = gql`
  mutation addExercise($name: String!) {
    addExercise(name: $name) {
      _id
      categories {
        _id
        name
      }
      name
    }
  }
`;

class ExerciseForm extends PureComponent {
  state = {
    name: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name } = this.state;
    e.preventDefault();

    name && this.props.addExercise(name) && this.setState({ name: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Name"
          name="name"
          placeholder="Name of exercise"
          onChange={this.handleChange}
        />
        <Button>Add Exercise</Button>
      </Form>
    );
  }
}

export default graphql(ADD_EXERCISE, {
  options: {
    update: (proxy, { data: { addExercise } }) => {
      const data = proxy.readQuery({ query: GET_EXERCISES });
      data.exercises.push(addExercise);

      proxy.writeQuery({ query: GET_EXERCISES, data });
    }
  },
  props: ({ mutate }) => ({
    addExercise: name => mutate({ variables: { name } })
  })
})(ExerciseForm);
