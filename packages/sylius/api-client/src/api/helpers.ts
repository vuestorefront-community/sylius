import gql from 'graphql-tag';

export const extendQuery = (context, query, variables, customQuery?) => {
  const { queryGql } = context.extendQuery(
    customQuery, {
      queryGql: { query, variables }
    }
  );
  return queryGql;
};

export const query = async(context, query, variables) => {
  const { data } = await context.client.query({ query, variables });
  return data;
};

export const mutate = async(context, mutation) => {
  const { data } = await context.client.mutate({
    mutation: gql`${mutation.query}`,
    variables: mutation.variables,
    fetchPolicy: 'no-cache'
  });
  return data;
};

export const transformCartItems = (items) => {
  return items.edges.map(edge => {
    const orderItem = edge.node;
    orderItem.variant.optionValues = orderItem.variant.optionValues.edges.map(edge => edge.node);
    orderItem.variant.product.options = orderItem.variant.product.options.edges.map(edge => edge.node);
    orderItem.variant.product.images = orderItem.variant.product.images.collection.map(
      image => `https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_thumbnail/${image.path}`
    );
    return orderItem;
  });
};

export const transformCart = (cart) => {
  cart.items = transformCartItems(cart.items);
  cart.shipments = cart.shipments.edges.length
    ? cart.shipments.edges[0].node
    : [];
  cart.payments = cart.payments.edges.length
    ? cart.payments.edges[0].node
    : [];
  return cart;
};
