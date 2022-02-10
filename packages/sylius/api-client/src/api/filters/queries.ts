import gql from 'graphql-tag';

export const getFiltersQuery = gql`
  query getFilters {
    filters {
      name
      options
    }
  }
`;
