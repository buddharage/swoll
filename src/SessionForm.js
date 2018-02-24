import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Button, Form } from 'semantic-ui-react';

import { GET_SESSIONS } from './queries';

const ADD_SESSION = gql`
  mutation addSession($date: String!) {
    addSession(date: $date) {
      _id
      activities {
        _id
        exerciseId
        sets {
          _id
          weight
          reps
          duration
        }
      }
      date
    }
  }
`;

class SessionForm extends PureComponent {
  state = {
    date: new Date().toLocaleDateString()
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { date } = this.state;
    e.preventDefault();

    date && this.props.addSession(date) && this.setState({ date: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <Button>Add Session</Button>
      </Form>
    );
  }
}

export default graphql(ADD_SESSION, {
  options: {
    update: (proxy, { data: { addSession } }) => {
      const data = proxy.readQuery({ query: GET_SESSIONS });
      data.sessions.push(addSession);

      proxy.writeQuery({ query: GET_SESSIONS, data });
    }
  },
  props: ({ mutate }) => ({
    addSession: date => mutate({ variables: { date } })
  })
})(SessionForm);
