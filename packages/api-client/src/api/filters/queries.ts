import gql from 'graphql-tag';

export const getFiltersQuery = gql`
  query getFilters(
    $taxon: String
  ) {
    filters(
      mainTaxon_code: $taxon
    ) {
      name
      options
    }
  }
`;
