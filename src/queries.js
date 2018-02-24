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
