import React, { PureComponent } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Button, Header, Form } from 'semantic-ui-react';

const GET_SESSION = gql`
  query SessionQuery($id: String!) {
    session(id: $id) {
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

const SessionStyled = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.gridGap};
`;

function SessionInfo(props) {
  const { date } = props.session;
  return (
    <div>
      <Header as="h1">{new Date(date).toLocaleDateString()}</Header>
    </div>
  );
}

class Session extends PureComponent {
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
    const { session } = this.props.data;

    console.log(this.props);

    return (
      <SessionStyled>
        {session && <SessionInfo session={session[0]} />}
        <Form onSubmit={this.handleSubmit}>
          <Button>Add Exercise</Button>
        </Form>
      </SessionStyled>
    );
  }
}

export default compose(
  graphql(GET_SESSION, {
    options: props => {
      const { id } = props.match.params;
      return {
        variables: { id }
      };
    }
  }),
  graphql(
    gql`
      mutation addExercise($name: String!) {
        addExercise(name: $name) {
          name
        }
      }
    `,
    {
      props: ({ mutate }) => ({
        addExercise: name => mutate({ variables: { name } })
      })
    }
  )
)(Session);
