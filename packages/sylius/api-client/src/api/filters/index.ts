import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import { getFiltersQuery } from './queries';
import { query, extendQuery } from '../helpers';

type FilterVariables = {
  taxon: string;
}

export const getFilters = async (context, variables: FilterVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, getFiltersQuery, variables, customQuery);
  const { filters } = await query(context, gql`${queryGql.query}`, queryGql.variables);
  return filters;
};
