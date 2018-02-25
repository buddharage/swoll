import React, { Component } from 'react';
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
    exercises {
      _id
      name
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

class Session extends Component {
  state = {
    exerciseList: []
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { date } = this.state;
    e.preventDefault();

    date && this.props.addSession(date) && this.setState({ date: '' });
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { exercises } = nextProps.data;

    if (!nextState.exerciseList && exercises && exercises.length) {
      this.setState({
        exerciseList: exercises.map(exercise => {
          const { _id, name } = exercise;

          return {
            key: _id,
            text: name,
            value: name
          };
        })
      });
    }
  }

  render() {
    const { loading, session } = this.props.data;
    const { exerciseList } = this.state;

    return (
      <SessionStyled>
        {!loading && <SessionInfo session={session[0]} />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Select options={exerciseList} />
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
