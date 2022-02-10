import { CustomQuery } from '@vue-storefront/core';
import { getFiltersQuery } from './queries';
import { query, extendQuery } from '../helpers';

export const getFilters = async (context, customQuery?: CustomQuery) => {
  const variables = {};
  const queryGql = extendQuery(context, getFiltersQuery, variables, customQuery);
  const { filters } = await query(context, queryGql, variables);
  return filters;
};
