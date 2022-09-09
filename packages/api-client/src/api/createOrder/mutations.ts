import gql from 'graphql-tag';

export default gql`
  mutation createOrder(
    $order: shop_completeOrderInput!
  ) {
    shop_completeOrder(
      input: $order
    ) {
      order {
        number
      }
    }
  }
`;
