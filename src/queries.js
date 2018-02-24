import gql from 'graphql-tag';

export const GET_EXERCISES = gql`
  query exercisesQuery {
    exercises {
      _id
      categories {
        _id
        name
      }
      name
    }
  }
`;

export const GET_SESSIONS = gql`
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
