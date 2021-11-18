import defaultMutation from './mutations';
import { CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';

const createOrder = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const { createOrder: createOrderGql} = context.extendQuery(
    customQuery, {
      createOrder: {
        query: defaultMutation,
        variables: defaultVariables
      }
    }
  );
  const { data } = await context.client.mutate({
    mutation: gql`${createOrderGql.query}`,
    variables: createOrderGql.variables,
    fetchPolicy: 'no-cache'
  });

  return data.shop_completeOrder.order;
};

export default createOrder;
