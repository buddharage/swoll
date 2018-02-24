import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Button, Form } from 'semantic-ui-react';

const ADD_SESSION = gql`
  mutation addSession($date: String!) {
    addSession(date: $date) {
      date
    }
  }
`;

class SessionForm extends PureComponent {
  state = {
    date: ''
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
    console.log('SessionForm', this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label="Date" name="date" onChange={this.handleChange} />
        <Button>Add Session</Button>
      </Form>
    );
  }
}

export default graphql(ADD_SESSION, {
  props: ({ mutate }) => ({
    addSession: date => mutate({ variables: { date } })
  })
})(SessionForm);
